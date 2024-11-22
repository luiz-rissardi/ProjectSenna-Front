import { Injectable, WritableSignal, signal } from '@angular/core';
import { ChatData } from '../../../interfaces/chatData';




@Injectable({
  providedIn: 'root'
})
export class ChatState {
  chatState: WritableSignal<Partial<ChatData> | null> = signal(null);

}
