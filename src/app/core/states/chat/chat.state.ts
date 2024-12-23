import { Injectable, WritableSignal, signal } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ChatState {
  chatState: WritableSignal<any> = signal(null);

}
