import { inject, Injectable } from '@angular/core';
import { MessagesService } from '../../core/services/messages/messages.service';
import { MessagesState } from '../../core/states/messages/messages.state';
import { WarningState } from '../../core/states/warning/warning.state';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';
import { Message } from '../../shared/interfaces/message';
import { SocketService } from '../../core/services/socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageFacade {
  private messageService = inject(MessagesService);
  private messagesState = inject(MessagesState);
  private socketService = inject(SocketService);
  private warningState = inject(WarningState);

  getMessagesByChatId(chatId: string, skipMessages: number) {
    try {
      this.messageService.getMessagesOfChat(chatId, skipMessages)
        .subscribe((result: ResponseHttp<Message[]>) => {
          this.messagesState.messageSignal.update(messages => {
            messages.push(...result.value)
            return [...messages]
          })
        })
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "its not possible get messages" }
      })
    }
  }

  sendMessage(message: Partial<Message>) {
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

  markReadInMessageStatus(messagesId: string[],chatId:string,userId:string) {
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
