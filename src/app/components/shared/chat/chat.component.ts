import { Component, ElementRef, ViewChild, effect, inject, signal, untracked } from '@angular/core';
import { DOMManipulation } from '../../../shared/operators/DomManipulation';
import { MessageComponent } from '../message/message.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatState } from '../../../core/states/chat/chat.state';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { UserState } from '../../../core/states/User/user.state';
import { ChatFacade } from '../../../facades/chat/chat.facade';
import { ContactFacade } from '../../../facades/contact/contact.facade';
import { MessageFacade } from '../../../facades/message/message.facade';
import { MessagesState } from '../../../core/states/messages/messages.state';
import { SocketService } from '../../../core/services/socket/socket.service';
import { fromEvent } from 'rxjs';
import { FileSenderChatComponent } from '../file-sender-chat/file-sender-chat.component';

@Component({
  selector: 'chat',
  imports: [MessageComponent, FileSenderChatComponent, ButtonIconComponent, ButtonIconDirective],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends DOMManipulation {
  protected userDetailState: UserDetailState = inject(UserDetailState);
  protected messagesState = inject(MessagesState);
  protected chatState = inject(ChatState);
  private userState = inject(UserState);
  private chatFacade = inject(ChatFacade);
  private messageFacade = inject(MessageFacade);
  private contactFacade = inject(ContactFacade);
  private socketService = inject(SocketService);
  private skipMessages = 0;
  protected source = signal(null);
  protected sourceName = signal(null);
  protected sourceType = signal(null);
  protected sourceBlob = signal(null);

  @ViewChild('dropdown') private dropdown: ElementRef;
  @ViewChild('inputText') private inputText: ElementRef;
  @ViewChild('chat') private chatContainer: ElementRef;

  constructor() {
    super();

    // Atualizar mensagens quando o `chatId` mudar
    effect(() => {
      const currentChatId = this.chatState.chatState()?.chatId;
      this.messageFacade.getMessagesByChatId(currentChatId, this.skipMessages);
    });

    // Atualizar mensagens no chat e marcar como lidas
    effect(() => {
      const messages = this.messagesState.messageSignal();
      if (messages.length > 0) {
        this.scrollToBottom();
        
        const unreadMessages = messages
        .filter((msg) => msg.userId !== this.userState.userSignal().userId)
        .filter(msg => msg.status == "unread")
        .map((msg) => msg.messageId);
        
        if (unreadMessages.length > 0) {
          this.markRead(unreadMessages);
        }
      }
    });

    // Configuração de WebSockets para mensagens em tempo real
    this.initializeSocketListeners();
  }

  private initializeSocketListeners() {
    this.socketService.on('message', (data: any) => {
      const chatId = this.chatState.chatState()?.chatId;

      if (chatId && chatId === data.chatId) {
        this.messagesState.messageSignal.update((messages) => {
          if (!messages.some((msg) => msg.messageId === data.messageId)) {
            return [...messages, data];
          }
          return messages;
        });
      }
    });

    this.socketService.on("read-messages", (chatId: any) => {
      if (this.chatState.chatState()?.chatId == chatId) {
        this.messagesState.messageSignal.update(messages => {
          return [...messages.map(message => {
            if (message.userId == this.userState.userSignal().userId) {
              message.status = "read";
            }
            return message
          })]
        })
      }
    })
  }

  private markRead(messagesId: string[]) {
    const chatId = untracked(() => this.chatState.chatState().chatId);
    const otherUserId = untracked(() => this.chatState.chatState()?.otherUserId);

    if (chatId && otherUserId) {
      this.messageFacade.markReadInMessageStatus(messagesId, chatId, otherUserId);
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chat = this.chatContainer?.nativeElement as HTMLElement;
      if (chat) {
        chat.scrollTop = chat.scrollHeight + 10000;
      }
    }, 50);
  }

  protected openUserDetail = () => {
    if (this.dropdown.nativeElement) {
      this.dropdown.nativeElement.style.display = 'none';
    }

    this.userDetailState.userDetailSignal.update((data) => {
      data.show = true;
      return data;
    });
  };

  protected chosenFile() {
    const inputFile = this.getElementsByClass('file-sender')[0];
    inputFile.click();
    const subescriber = fromEvent(inputFile, "input")
      .subscribe((data: any) => {
        const inputFile = data?.target as HTMLInputElement;
        const file = inputFile.files[0];
        const blob = new Blob([file], { type: file.type });
        const url = URL.createObjectURL(blob)
        this.source.set(url);
        this.sourceBlob.set(blob);
        this.sourceName.set(file.name);
        this.sourceType.set(file.type);
        inputFile.value = null;
        subescriber.unsubscribe()
      })

  }

  protected closeChat() {
    this.chatState.chatState.set(null);
  }

  protected toggleDropdown() {
    const dropdownStyle = this.dropdown.nativeElement.style;
    dropdownStyle.display = dropdownStyle.display === 'block' ? 'none' : 'block';
  }

  protected blockChat() {
    this.toggleDropdown();
    this.chatFacade.blockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected unlockedChat() {
    this.toggleDropdown();
    this.chatFacade.deblockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected addContact() {
    const { userName, userId, photo } = this.userDetailState.userDetailSignal().data;
    const user = this.userState.userSignal();
    this.contactFacade.addContact(user.contactId, userId, photo, userName);
  }

  protected sendMessage() {
    const messageText = this.inputText.nativeElement.value;

    if (messageText.trim() === '') return;
    this.scrollToBottom();
    this.messageFacade.sendMessage(messageText);
    this.inputText.nativeElement.value = ''; // Limpa o campo após enviar
  }
}
