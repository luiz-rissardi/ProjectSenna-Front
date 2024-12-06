import { AfterViewInit, Component, effect, ElementRef, inject, Injector, input, InputSignal, LOCALE_ID, runInInjectionContext, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { Message, MessageFile } from '../../../shared/interfaces/message';
import { DatePipe, SlicePipe } from '@angular/common';
import { LimitTextPipe } from '../../../shared/pipes/limitText/limit-text.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MessageFacade } from '../../../facades/message/message.facade';
import { ResponseHttp } from '../../../shared/interfaces/ResponseType';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'message',
  imports: [DatePipe, LimitTextPipe, SlicePipe, NgxSkeletonLoaderModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements AfterViewInit {

  isYourMessage = input<boolean>();
  isGroup = input<boolean>();
  message: InputSignal<Message> = input(null);
  protected messageFileSignal: WritableSignal<MessageFile> = signal(null);
  protected isExtend = true;
  protected locale = inject(LOCALE_ID);
  private messageFacade = inject(MessageFacade);
  private destroyRef = new Subject();
  private injector = inject(Injector);
  protected teste = signal(false);
  @ViewChild("audioPlayer") private audioPlayer:ElementRef;

  ngOnDestroy(): void {
    this.destroyRef.complete();
    this.destroyRef.next(null);
  }



  ngAfterViewInit() {
    runInInjectionContext(this.injector,() => {
      effect(() => {
        if (this.message().messageType != "text") {
          this.messageFacade.getFileOfMesage(this.message().messageId)
            .pipe(takeUntil(this.destroyRef))
            .subscribe((result: ResponseHttp<MessageFile>) => {
              if (result.isSuccess) {
                this.messageFileSignal.set(result.value)
                const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));

                function processBlob({ data }) {
                  // avoid memory leaks 
                  this.messageFileSignal.set({ ...this.messageFileSignal(), data });
                  worker.removeEventListener("message", processBlob.bind(this));
                  // worker.terminate()
                }
                worker.onmessage = processBlob.bind(this)
                worker.postMessage(result.value?.data);
              }
            })
        }

        setTimeout(() => {
          if (this.message()?.message.length >= 300) {
            this.isExtend = false;
          }
        });
      })
    })
  }


  toggleExtend(): void {
    this.isExtend = !this.isExtend;
  }

}
