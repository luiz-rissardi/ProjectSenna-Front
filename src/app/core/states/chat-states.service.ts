import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatStatesService {
  state: WritableSignal<string | null> = signal(null);

  setState(value: string): void {
    this.state.set(value);
  }

}
