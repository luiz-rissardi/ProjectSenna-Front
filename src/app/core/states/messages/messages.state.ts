import { Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '../../../shared/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesState {

  public messageSignal: WritableSignal<Message[]> = signal([]);

}
