import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchTranslationState {

  translationState: WritableSignal<boolean> = signal(false);


}
