import { Injectable } from '@angular/core';
import { Message } from '../../../shared/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class OffLineMessagesService {

  
  saveLocalMessages(message:Message | Partial<Message>){
    const messagesLocal = JSON.parse(localStorage.getItem("messages")) || [];
    messagesLocal?.push(message)
    localStorage.setItem("messages",JSON.stringify(messagesLocal));
  }

  getLocalMesages(): Message[]{
    const messages = localStorage.getItem("messages")
    return JSON.parse(messages) || []
  }

  removeAll(){
    localStorage.removeItem("messages")
  }
}
