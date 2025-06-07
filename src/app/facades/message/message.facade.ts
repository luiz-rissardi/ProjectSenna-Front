import { inject, Injectable } from '@angular/core';
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
          from(result.value)
            .subscribe((message: Message) => {
              if (message.message != "" && message.userId != this.userState.userSignal().userId) {

                this.translatorService.translateText(
                  [message.message],
                  this.userState.userSignal().languages
                ).subscribe((result: any) => {
                  message.translatedMessageText = result.value.translation
                })
              }
            })

          this.messagesState.messageSignal.update(messages => {
            return [...messages, ...localMessages, ...result.value]
          })
        })
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible get messages" }
      })
    }
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
      messageId: Math.floor(Math.random() * 1000).toString(), // random id
      status: ''
    };

    // sem internet salvar localmente
    if (navigator.onLine == false) {
      this.offlineMessages.saveLocalMessages(message);
      this.messagesState.messageSignal.update((messages: Message[]) => {
        messages.unshift(message)
        return messages
      })
      return;
    }

    try {
      this.messageService.sendMessageToChat(message)
        .subscribe((result: ResponseHttp<Message>) => {
          this.socketService.emit("send-message", {
            message: result.value
          })
          this.messagesState.messageSignal.update((messages: Message[]) => {
            messages.unshift(result.value)
            return messages
          })
        })

    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible send the message" }
      })
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
