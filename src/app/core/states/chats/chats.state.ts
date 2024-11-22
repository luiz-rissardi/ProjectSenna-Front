import { Injectable, signal, WritableSignal } from '@angular/core';
import { ChatData } from '../../../interfaces/chatData';

@Injectable({
  providedIn: 'root'
})
export class ChatArrayState {

  chatsArrayState: WritableSignal<ChatData[]> = signal(null);

}
