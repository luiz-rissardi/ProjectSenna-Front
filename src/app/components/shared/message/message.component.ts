import { AfterViewInit, Component, effect, ElementRef, HostListener, inject, Injector, input, InputSignal, LOCALE_ID, output, runInInjectionContext, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { Message, MessageFile } from '../../../shared/interfaces/message';
import { DatePipe, SlicePipe } from '@angular/common';
import { LimitTextPipe } from '../../../shared/pipes/limitText/limit-text.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MessageFacade } from '../../../facades/message/message.facade';
import { ResponseHttp } from '../../../shared/interfaces/ResponseType';
import { fromEvent, Subject, takeUntil } from 'rxjs';

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
  private destroy = new Subject();
  private injector = inject(Injector);
  protected showOptions = false;
  protected showEditMessage = output<any>();

  @ViewChild("messageCard") private messageCard: ElementRef;

  constructor() {
    fromEvent(document, "click")
      .pipe(takeUntil(this.destroy))
      .subscribe((event: Event) => {
        const clickedInside = this.messageCard?.nativeElement.contains(event.target);
        if (!clickedInside) {
          this.showOptions = false; // Fecha o menu se o clique for fora do componente
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy.complete();
    this.destroy.next(null);
  }

  ngAfterViewInit() {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.message().messageType != "text") {
          this.messageFacade.getFileOfMesage(this.message().messageId)
            .pipe(takeUntil(this.destroy))
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
