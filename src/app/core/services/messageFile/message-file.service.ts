import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { MessageFile } from '../../../shared/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageFileService extends Service {

  constructor() {
    super("http://localhost:8729")
  }

  sendMessageFile(message: MessageFile) {
    const body = this.toFormData(message)
    return this.http.post(`http://localhost:8729/chat/message/${message.messageId}/file`, body)
  }

  getFileOfMessage(messageId:string){
    return this.http.get(this.uri + `/chat/message/${messageId}`);
  }

  // deleteMessage

}
