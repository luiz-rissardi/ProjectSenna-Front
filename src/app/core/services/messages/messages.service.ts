import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { Message } from '../../../shared/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends Service {

  constructor() {
    super();
  }

  getMessagesOfChat(chatId: string, skipMessages: number = 0) {
    return this.http.get(this.uri + `/chat/${chatId}/messages/${skipMessages}`)
  }

  sendMessageToChat(message: Partial<Message>) {
    const body = this.toFormData({
      messageText:message.message,
      userId:message.userId,
      chatI:message.chatId,
      language:message.language, 
      messageType:"text"
    })
    return this.http.post(this.uri + `/chat/${message.chatId}/message/send`, body)
  }

}
