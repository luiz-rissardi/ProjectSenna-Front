import { Component, computed, effect, inject, OnDestroy, OnInit, untracked, } from '@angular/core';
import { ChatImageZoomState } from '../../../core/states/chatImageZoom/chat-image-zoom';
import { fromEvent, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-image-zoom',
  imports: [],
  templateUrl: './chat-image-zoom.component.html',
  styleUrl: './chat-image-zoom.component.scss'
})
export class ChatImageZoomComponent implements OnDestroy {

  protected messageZoomImagetate = inject(ChatImageZoomState);
  private onDestroy$ = new Subject<void>();
  private clickSubscription: any;

  constructor() {
    effect(() => {
      const zoomValue = this.messageZoomImagetate.zoomImageSignal();

      // Cancela listeners anteriores
      this.clearClickSubscription();

      if (zoomValue != null) {
        this.listenToClickOutside();
      }
    });
  }

  private listenToClickOutside() {
    this.clickSubscription = fromEvent(document, 'click')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event) => {
        const el = event.target as HTMLElement;
        if (!el.classList.contains('img-message')) {
          this.closeZoomImage();
        }
      });
  }

  private clearClickSubscription() {
    if (this.clickSubscription) {
      this.clickSubscription = null;
    }
  }

  ngOnDestroy(): void {
    this.clearClickSubscription();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  closeZoomImage() {
    this.messageZoomImagetate.zoomImageSignal.set(null)
  }

}
