import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatImageZoomState {

  public zoomImageSignal: WritableSignal<Blob | null | string> = signal(null);

}
