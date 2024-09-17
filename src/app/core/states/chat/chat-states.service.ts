import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatStatesService {
  state: WritableSignal<string | number | null> = signal(null);

  setState(value: number | string): void {
    this.state.set(value);
  }

}
