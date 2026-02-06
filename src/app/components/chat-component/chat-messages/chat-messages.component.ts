import { Component, effect, ElementRef, inject, OnDestroy, untracked, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { ChatState } from '../../../core/states/chat/chat.state';
import { MessagesState } from '../../../core/states/messages/messages.state';
import { SwitchTranslationState } from '../../../core/states/switchTranslation/switch-translation.state';
import { UserState } from '../../../core/states/User/user.state';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { MessageFacade } from '../../../facades/message/message.facade';
import { Message } from '../../../shared/interfaces/message';
import { MessageComponent } from '../../shared/message/message.component';
import { SocketService } from '../../../core/services/socket/socket.service';
import { TranslateService } from '../../../core/services/translate/translate.service';

@Component({
  selector: 'app-chat-messages',
  imports: [MessageComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent implements OnDestroy {

  protected userDetailState: UserDetailState = inject(UserDetailState);
  protected messagesState = inject(MessagesState);
  protected chatState = inject(ChatState);
  private userState = inject(UserState);
  protected switchTranslation = inject(SwitchTranslationState);
  private socketService = inject(SocketService);
  private translatorService = inject(TranslateService);
  private messageFacade = inject(MessageFacade);
  private skipMessages = 0;
  private destroy = new Subject();
  protected showEditMessage = false;
  protected messageTextOrigin = "";
  private MessageToEdit!: Message;
  private prevChatId = "";

  @ViewChild('chat', { static: false }) private chatContainer: ElementRef;
  @ViewChild("editMessage", { static: false }) private editMessageBox: ElementRef;
  @ViewChild("newMessageText", { static: false }) private newMessageText: ElementRef;

  ngOnDestroy(): void {
    this.destroy.complete()
    this.destroy.next(null)
  }

  constructor() {
    this.initializeSocketListeners();

    fromEvent(document, "click")
      .pipe(takeUntil(this.destroy))
      .subscribe((event: Event) => {
        const el = event.target as HTMLElement
        if (
          this.editMessageBox?.nativeElement.contains(el) == false &&
          this.showEditMessage == true &&
          el.id != "showEditModal") {
          this.showEditMessage = false
        }
      })

    effect(() => {
      if (this.prevChatId != this.chatState.chatState()?.chatId) {
        this.scrollToBottom();
        this.messagesState.messageSignal.set([])
        this.skipMessages = 0;
        this.prevChatId = this.chatState.chatState()?.chatId
        const currentChatId = this.chatState.chatState()?.chatId;
        this.messageFacade.getMessagesByChatId(currentChatId, this.userState.userSignal().userId, this.skipMessages)
      }
    });

    // Atualizar mensagens no chat e marcar como lidas
    effect(() => {
      const messages = this.messagesState.messageSignal();
      if (messages.length > 0) {

        if (this.skipMessages < 0) {
          this.scrollToBottom();
        }

        const unreadMessages = messages
          .filter((msg) => msg.userId !== this.userState.userSignal().userId)
          .filter(msg => msg.status == "unread")
          .map((msg) => {
            return msg.messageId
          });

        if (unreadMessages.length > 0) {
          this.markRead(unreadMessages);
        }
      }
    });
  }

  private initializeSocketListeners() {

    this.socketService.on('message', (data: any) => {
      const chatId = this.chatState.chatState()?.chatId;
      if (chatId && chatId === data.chatId) {
        // Adiciona mensagem e faz scroll automático
        this.messagesState.messageSignal.update((messages) => {
          if (!messages.some((msg) => msg.messageId === data.messageId)) {
            return [data, ...messages];
          }
          return messages;
        });
        this.scrollToBottom();
      }
    });

    this.socketService.on("read-messages", ({ chatId }) => {
      if (this.chatState.chatState()?.chatId == chatId) {
        this.messagesState.messageSignal.update(messages => {
          return [...messages.map(message => {
            message.status = "read";
            return message
          })]
        })
      }
    })

    this.socketService.on("update-message", (messageEdit: Message) => {
      this.messagesState.messageSignal.update(messages => {
        return messages.map((message) => {
          if (messageEdit.messageId == message.messageId) {
            // Limpa tradução antiga quando mensagem é editada
            messageEdit.translatedMessageText = undefined;
            return messageEdit;
          }
          return message;
        });
      });
    });

    this.socketService.on("delete-message", (messageEdit: Message) => {
      this.messagesState.messageSignal.update((messages) => {
        return messages.filter((message) => {
          return messageEdit.messageId != message.messageId
        })
      })
    })
  }

  private markRead(messagesId: string[]) {
    const chatId = untracked(() => this.chatState.chatState().chatId);
    const otherUserId = untracked(() => this.chatState.chatState()?.otherUserId);

    let newMessages = this.messagesState.messageSignal()

    newMessages = newMessages.map(message => {
      if (message.userId != this.userState.userSignal().userId) {
        message.status = "read";
      }
      return message;
    })
    // this.messagesState.messageSignal.set(newMessages)

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

  protected onScroll() {
    const el = this.chatContainer?.nativeElement as HTMLElement;
    const totalScroll = el.scrollHeight;
    const currentScroll = el.scrollTop;

    if (totalScroll - (currentScroll * -1) <= 800) {
      this.skipMessages += 50
      if (this.messagesState.messageSignal().length % 50 == 0) {
        this.messageFacade.getMessagesByChatId(
          this.chatState.chatState().chatId,
          this.userState.userSignal().userId,
          this.skipMessages)
      }
    }
  }

  protected editMessage() {
    const text = this.newMessageText?.nativeElement.value;
    this.MessageToEdit.message = text;
    this.MessageToEdit.status = "unread";
    this.messageFacade.editMessage(this.MessageToEdit);
    this.showEditMessage = false;
  }

  protected changeShowEdit(data: any) {
    this.showEditMessage = data.show
    this.messageTextOrigin = data.message.message;
    this.MessageToEdit = data.message;
  }

}
