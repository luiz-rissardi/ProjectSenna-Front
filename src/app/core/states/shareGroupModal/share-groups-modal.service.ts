import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareGroupsModalState {

  shareGroupState: WritableSignal<boolean> = signal(false);
}
