import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Service {

  constructor(){
    super();
  }

  createNewChat(){
    return this.http.post(this.uri + `/chat`,{});
  }

  addUsersInChat(chatId:string,userId:string,memberType:string = "member"){
    return this.http.post(this.uri + `/chat/${chatId}/participant/${userId}`,{
      memberType
    });
  }

  getChats(userId: string) {
    return this.http.post(this.uri + `/user/${userId}/chats`,{});
  }

  blockChat(chatId: string, userId: string) {
    const body = this.toFormData({ isActive: false });
    return this.http.post(this.uri + `/user/${userId}/chat/${chatId}/state`, body);
  }

  clearMessages(chatId:string,userId:string){
    return this.http.post(this.uri + `/chat/${chatId}/user/${userId}/messages/clear`,{})
  }

  desblockChat(chatId: string, userId: string) {
    const body = this.toFormData({ isActive: true });
    return this.http.post(this.uri + `/user/${userId}/chat/${chatId}/state`, body);
  }
}
