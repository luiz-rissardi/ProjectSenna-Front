import { inject, Injectable } from '@angular/core';
import { MessagesService } from '../../core/services/messages/messages.service';
import { MessagesState } from '../../core/states/messages/messages.state';
import { WarningState } from '../../core/states/warning/warning.state';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';
import { Message, MessageFile } from '../../shared/interfaces/message';
import { SocketService } from '../../core/services/socket/socket.service';
import { UserState } from '../../core/states/User/user.state';
import { ChatState } from '../../core/states/chat/chat.state';
import { MessageFileService } from '../../core/services/messageFile/message-file.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageFacade {
  private messageService = inject(MessagesService);
  private messageFileService = inject(MessageFileService);
  private socketService = inject(SocketService);
  private messagesState = inject(MessagesState);
  private userState = inject(UserState);
  private chatState = inject(ChatState);
  private warningState = inject(WarningState);

  getMessagesByChatId(chatId: string, skipMessages: number) {
    try {
      this.messageService.getMessagesOfChat(chatId, skipMessages)
        .subscribe((result: ResponseHttp<Message[]>) => {
          if (skipMessages == 0) {
            this.messagesState.messageSignal.set([]);
          }
          this.messagesState.messageSignal.set(result.value)
        })
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible get messages" }
      })
    }
  }

  sendMessage(messageText: string, messageType: string = "text") {
    const message: Partial<Message> = {
      message: messageText,
      userId: this.userState.userSignal().userId,
      chatId: this.chatState.chatState()?.chatId,
      dateSender: new Date(),
      language: this.userState.userSignal().languages,
      messageType,
    };
    try {
      this.messageService.sendMessageToChat(message)
        .subscribe((result: ResponseHttp<Message>) => {
          this.messagesState.messageSignal.update((messages: Message[]) => {
            this.socketService.emit("send-message", {
              message: result.value
            })
            messages.push(result.value)
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
      language: this.userState.userSignal().languages,
      messageType,
    };
    try {
      this.messageService.sendMessageToChat(message)
        .subscribe((messageResult: ResponseHttp<Message>) => {
          const messageFile: MessageFile = {
            data: messageBlob,
            fileName,
            messageId: messageResult.value.messageId
          }
          this.messageFileService.sendMessageFile(messageFile)
            .subscribe((messageFileResult: ResponseHttp<MessageFile>) => {
              if (messageFileResult.isSuccess) {
                this.messagesState.messageSignal.update((messages: Message[]) => {
                  // this.socketService.emit("send-message", {
                  //   message: messageFileResult.value
                  // })
                  messages.push(messageResult.value)
                  return messages
                })
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
  
  getFileOfMesage(messageId:string):Observable<any> | null{
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
      this.messageService.markReadInMessages(messagesId)
        .subscribe((result: ResponseHttp<any>) => {
          if (result.isSuccess) {
            this.socketService.emit("read-messages", {
              chatId, userId
            });
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "it´s not possible read the messages" }
      })
    }
  }
}
