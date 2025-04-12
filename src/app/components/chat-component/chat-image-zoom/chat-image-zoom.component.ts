import { Component, inject } from '@angular/core';
import { ChatImageZoomState } from '../../../core/states/chatImageZoom/chat-image-zoom';

@Component({
  selector: 'app-chat-image-zoom',
  imports: [],
  templateUrl: './chat-image-zoom.component.html',
  styleUrl: './chat-image-zoom.component.scss'
})
export class ChatImageZoomComponent {

  protected messageZoomImagetate = inject(ChatImageZoomState);

  closeZoomImage(){
    this.messageZoomImagetate.zoomImageSignal.set(null)
  }

}
