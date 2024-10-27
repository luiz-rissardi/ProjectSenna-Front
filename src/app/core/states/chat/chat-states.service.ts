import { Injectable, WritableSignal, signal } from '@angular/core';
import { ChatData } from '../../entity/chatData';




@Injectable({
  providedIn: 'root'
})
export class ChatStatesService {
  chatState: WritableSignal<Partial<ChatData> | null> = signal(null);

}
