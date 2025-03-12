import { Component, ElementRef, OnDestroy, ViewChild, effect, inject, signal, untracked } from '@angular/core';
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
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { FileSenderChatComponent } from '../file-sender-chat/file-sender-chat.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Message } from '../../../shared/interfaces/message';
import { SwitchTranslationState } from '../../../core/states/switchTranslation/switch-translation.state';
import { TranslateService } from '../../../core/services/translate/translate.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'chat',
  imports: [CommonModule,MessageComponent, FileSenderChatComponent, ButtonIconComponent, ButtonIconDirective, DatePipe,RouterLink],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent extends DOMManipulation implements OnDestroy {

  protected userDetailState: UserDetailState = inject(UserDetailState);
  protected messagesState = inject(MessagesState);
  protected chatState = inject(ChatState);
  private userState = inject(UserState);
  protected switchTranslation = inject(SwitchTranslationState);
  private translatorService = inject(TranslateService)
  private chatFacade = inject(ChatFacade);
  private messageFacade = inject(MessageFacade);
  private contactFacade = inject(ContactFacade);
  private socketService = inject(SocketService);
  private prevChatId = "";
  private skipMessages = 0;
  protected source = signal(null);
  protected sourceName = signal(null);
  protected sourceType = signal(null);
  protected sourceBlob = signal(null);
  protected isRecording = false;
  protected isStoped = false;
  protected timeAudio = 0;
  private audioChunks = [];
  private mediaRecorder!: MediaRecorder;
  private destroy = new Subject();
  private recordingInterval: any = null;
  protected showEditMessage = false;
  protected messageTextOrigin = "";
  private MessageToEdit!: Message;

  @ViewChild('dropdown', { static: false }) private dropdown: ElementRef;
  @ViewChild('inputText') private inputText: ElementRef;
  @ViewChild('chat', { static: false }) private chatContainer: ElementRef;
  @ViewChild("editMessage", { static: false }) private editMessageBox: ElementRef;
  @ViewChild("newMessageText", { static: false }) private newMessageText: ElementRef;

  constructor() {
    super();

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

        if (this.dropdown?.nativeElement.contains(el) == false && el.classList.contains("dropdownBtn") == false) {
          this.dropdown.nativeElement.style.display = "none";
        }
      })

    // Atualizar mensagens quando o `chatId` mudar
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

    // Configuração de WebSockets para mensagens em tempo real
    this.initializeSocketListeners();
  }

  ngOnDestroy(): void {
    this.destroy.complete()
    this.destroy.next(null)
  }

  protected deleteMessages() {
    this.toggleDropdown()
    this.chatFacade.clearMessagesOfChat(this.userState.userSignal()?.userId)
  }

  protected onScroll() {
    const el = this.chatContainer?.nativeElement as HTMLElement;
    const totalScroll = el.scrollHeight;
    const currentScroll = el.scrollTop
    if (totalScroll - (currentScroll * -1) <= 800 && this.messagesState.messageSignal().length % 50 == 0 ) {
      this.skipMessages += 50
      this.messageFacade.getMessagesByChatId(
        this.chatState.chatState().chatId,
        this.userState.userSignal().userId,
        this.skipMessages)
    }
  }

  protected changeShowEdit(data: any) {
    this.showEditMessage = data.show
    this.messageTextOrigin = data.message.message;
    this.MessageToEdit = data.message;
  }

  private initializeSocketListeners() {
    this.socketService.on('message', (data: any) => {
      const chatId = this.chatState.chatState()?.chatId;
      if (chatId && chatId === data.chatId) {
        this.scrollToBottom();

        if (data.message != "") {
          this.translatorService.translateText(
            [data.message],
            this.userState.userSignal().languages
          ).subscribe((result: any) => {
            data.translatedMessageText = result.translates[0].translate
          })
        }

        this.messagesState.messageSignal.update((messages) => {
          if (!messages.some((msg) => msg.messageId === data.messageId)) {
            return [data, ...messages];
          }
          return messages;
        });
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

            this.translatorService.translateText(
              [messageEdit.message],
              this.userState.userSignal().languages
            ).subscribe((result: any) => {
              messageEdit.translatedMessageText = result.translates[0].translate
            })
            return messageEdit
          }
          return message
        })
      })
    })

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
    this.toggleDropdown()
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

  protected startRecording() {
    try {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.isRecording = true;
          this.startMediaRecording(stream);
        });
    } catch (err) {
      console.error('Erro ao acessar o microfone:', err);
    }
  }

  private async startMediaRecording(stream: any) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    // Inicia o contador de tempo
    this.recordingInterval = setInterval(() => {
      if (this.isRecording && !this.isStoped) {
        this.timeAudio++;
      }
    }, 1000);

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data); // Armazena os pedaços de áudio
    };

    this.mediaRecorder.start();
  }

  protected pauseAudio() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.isStoped = true;
    }
  }

  protected resumeAudio() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.isStoped = false;
    }
  }

  protected stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = false;
  }

  protected cancelAudio() {
    this.mediaRecorder.stop();
    this.timeAudio = 0;  // Resetando o contador ao parar a gravação
    this.isRecording = false;
    this.isStoped = false
  }

  protected sendAudio() {
    this.mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(this.audioChunks, { type: "audio/mp3" });

      this.messageFacade.sendMessageFile(audioBlob, "audio", "", "audio");
    };
    clearInterval(this.recordingInterval);
    this.stopRecording()
    this.timeAudio = 0;  // Resetando o contador ao parar a gravação
    this.isStoped = false;
  }

  protected editMessage() {
    const text = this.newMessageText?.nativeElement.value;
    this.MessageToEdit.message = text;
    this.MessageToEdit.status = "unread";
    this.messageFacade.editMessage(this.MessageToEdit);
    this.showEditMessage = false;
  }
}
