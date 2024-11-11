import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Service {

  getChats(userId: string) {
    return this.http.post(this.uri + `/user/${userId}/chats`,{});
  }

  blockChat(chatId: string, userId: string) {
    const body = this.toFormData({ isActive: false });
    return this.http.post(this.uri + `/user/${userId}/chat/${chatId}/state`, body);
  }

  desblockChat(chatId: string, userId: string) {
    const body = this.toFormData({ isActive: true });
    return this.http.post(this.uri + `/user/${userId}/chat/${chatId}/state`, body);
  }
}
