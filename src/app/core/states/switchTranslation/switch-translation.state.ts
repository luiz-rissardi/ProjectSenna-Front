import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchTranslationState {

  chatsArrayState: WritableSignal<boolean> = signal(false);


}
