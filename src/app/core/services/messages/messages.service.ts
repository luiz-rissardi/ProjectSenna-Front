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

  getMessagesOfChat(chatId: string, userId: string, skipMessages: number = 0) {
    return this.http.get(this.uri + `/user/${userId}/chat/${chatId}/messages/${skipMessages}`)
  }

  sendMessageToChat(message: Partial<Message>) {
    return this.http.post(this.uri + `/chat/${message.chatId}/message/send`, { ...message, messageText: message.message })
  }

  editMessage(message: Message) {
    return this.http.post(this.uri + `/chat/message/${message.messageId}`, {
      messageText: message.message,
      language: message.language
    })
  }

  removeMessage(messageId: string) {
    return this.http.delete(this.uri + `/chat/message/${messageId}`)
  }

  markReadInMessages(messagesId: string[]) {
    const body = { messagesId }
    return this.http.post(this.uri + `/chat/messages/read`, body);
  }

}
