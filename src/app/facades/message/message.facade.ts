import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MessagesService } from '../../core/services/messages/messages.service';
import { MessagesState } from '../../core/states/messages/messages.state';
import { WarningState } from '../../core/states/warning/warning.state';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';
import { Message } from '../../shared/interfaces/message';
import { SocketService } from '../../core/services/socket/socket.service';
import { UserState } from '../../core/states/User/user.state';
import { ChatState } from '../../core/states/chat/chat.state';
import { MessageFileService } from '../../core/services/messageFile/message-file.service';
import { from, Observable } from 'rxjs';
import { TranslateService } from '../../core/services/translate/translate.service';
import { OffLineMessagesService } from '../../core/services/OffLineMessages/off-line-messages.service';


@Injectable({
  providedIn: 'root'
})
export class MessageFacade {
  private platformId = inject(PLATFORM_ID);
  private messageService = inject(MessagesService);
  private messageFileService = inject(MessageFileService);
  private translatorService = inject(TranslateService);
  private offlineMessages = inject(OffLineMessagesService);
  private socketService = inject(SocketService);
  private messagesState = inject(MessagesState);
  private userState = inject(UserState);
  private chatState = inject(ChatState);
  private warningState = inject(WarningState);

  getMessagesByChatId(chatId: string, userId: string, skipMessages: number) {
    try {

      const localMessages = this.offlineMessages.getLocalMesages().filter(el => el.chatId == chatId);

      if (skipMessages == 0) {
        this.messagesState.messageSignal.set([]);
      }

      this.messageService.getMessagesOfChat(chatId, userId, skipMessages)
        .subscribe((result: ResponseHttp<Message[]>) => {
          // Mensagens carregadas sem tradução automática
          // Tradução será feita on-demand quando usuário clicar no botão
          this.messagesState.messageSignal.update(messages => {
            return [...messages, ...localMessages, ...result.value];
          });
        });
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible get messages" }
      });
    }
  }

  /**
   * Traduz uma mensagem específica on-demand (quando usuário clica no botão)
   */
  translateMessage(messageId: string): void {
    const messages = this.messagesState.messageSignal();
    const message = messages.find(msg => msg.messageId === messageId);

    if (!message || !message.message || message.translatedMessageText) {
      return; // Já traduzida ou sem conteúdo
    }

    this.translatorService.translateText(
      [message.message],
      this.userState.userSignal().languages
    ).subscribe((result: any) => {
      this.messagesState.messageSignal.update(msgs => {
        return msgs.map(msg => {
          if (msg.messageId === messageId) {
            return { ...msg, translatedMessageText: result.value.translation };
          }
          return msg;
        });
      });
    });
  }

  sendMessage(messageText: string, messageType: string = "text") {
    const message: Message = {
      message: messageText,
      userId: this.userState.userSignal().userId,
      chatId: this.chatState.chatState()?.chatId,
      dateSender: new Date(),
      languages: this.userState.userSignal()?.languages,
      messageType,
      userName: '',
      messageId: Math.floor(Math.random() * 1000).toString(), // random id temporário
      status: 'sending' // status de envio
    };

    // SSR-safe: sem internet salvar localmente
    if (isPlatformBrowser(this.platformId) && !navigator.onLine) {
      this.offlineMessages.saveLocalMessages(message);
      this.messagesState.messageSignal.update((messages: Message[]) => {
        return [message, ...messages];
      });
      return;
    }

    // Optimistic Update: mostra a mensagem imediatamente na UI
    this.messagesState.messageSignal.update((messages: Message[]) => {
      return [message, ...messages];
    });

    try {
      this.messageService.sendMessageToChat(message)
        .subscribe((result: ResponseHttp<Message>) => {
          // Atualiza com os dados do servidor (id real, status confirmado)
          this.messagesState.messageSignal.update((messages: Message[]) => {
            return messages.map(msg =>
              msg.messageId === message.messageId
                ? { ...result.value, status: 'sent' }
                : msg
            );
          });

          this.socketService.emit("send-message", {
            message: result.value
          });
        });

    } catch (error) {
      // Remove a mensagem em caso de erro
      this.messagesState.messageSignal.update((messages: Message[]) => {
        return messages.filter(msg => msg.messageId !== message.messageId);
      });

      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible send the message" }
      });
    }
  }

  sendMessageFile(messageBlob: Blob, fileName: string, messageText: string, messageType: string) {
    const message: Partial<Message> = {
      message: messageText,
      userId: this.userState.userSignal().userId,
      chatId: this.chatState.chatState()?.chatId,
      dateSender: new Date(),
      languages: this.userState.userSignal().languages,
      messageType,
    };

    try {
      this.messageService.sendMessageToChat(message)
        .subscribe((messageResult: ResponseHttp<Message>) => {

          const messageFile: Partial<Message> = {
            data: messageBlob,
            fileName,
            messageId: messageResult.value.messageId
          }

          this.messageFileService.sendMessageFile(messageFile as any)
            .subscribe((messageFileResult: ResponseHttp<Message>) => {
              if (messageFileResult.isSuccess) {

                this.socketService.emit("send-message", {
                  message: messageResult.value,
                })

                this.messagesState.messageSignal.update((messages: Message[]) => {
                  return [{ ...messageResult.value, data: messageBlob }, ...messages];
                });
              }
            })
        })

    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible send the message" }
      })
    }
  }

  getFileOfMesage(messageId: string): Observable<any> | null {
    try {
      return this.messageFileService.getFileOfMessage(messageId)
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible get file of the message" }
      })
      return null;
    }
  }

  markReadInMessageStatus(messagesId: string[], chatId: string, userId: string) {
    try {
      if (this.userState.userSignal().readMessages) {
        this.socketService.emit("read-messages", {
          chatId, userId, readMessages: this.userState.userSignal().readMessages
        });

        this.messageService.markReadInMessages(messagesId)
          .subscribe((result: ResponseHttp<any>) => {
            if (result.isSuccess) {
            }
          })
      }
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "it´s not possible read the messages" }
      })
    }
  }

  editMessage(message: Message) {
    try {
      this.messageService.editMessage(message)
        .subscribe((result: ResponseHttp<any>) => {
          if (result.isSuccess) {
            this.socketService.emit("update-message", {
              message
            });
          } else {
            this.warningState.warnigSignal.set({
              IsSucess: false,
              data: { message: "it´s not possible edit the message" }
            })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "it´s not possible edit the message" }
      })
    }
  }

  deleteMessage(message: Message) {
    try {

      const fn = () => {
        this.messageService.removeMessage(message.messageId)
          .subscribe((result: ResponseHttp<any>) => {
            if (result.isSuccess) {
              this.socketService.emit("delete-message", {
                message
              });

            } else {
              this.warningState.warnigSignal.set({
                IsSucess: false,
                data: { message: "it´s not possible delete the message" }
              })
            }
          })
      }

      if (message.messageType != "text") {
        this.messageFileService.deleteFileOfMessage(message.messageId)
          .subscribe((result: ResponseHttp<any>) => {
            if (result.isSuccess) {
              fn()
            }
          })
      } else {
        fn()
      }


    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "it´s not possible delete the message" }
      })
    }
  }
}
