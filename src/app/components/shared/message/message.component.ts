import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, effect, inject, Injector, input, InputSignal, OnDestroy, output, runInInjectionContext, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { Message, MessageFile } from '../../../shared/interfaces/message';
import { DatePipe, SlicePipe } from '@angular/common';
import { LimitTextPipe } from '../../../shared/pipes/limitText/limit-text.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MessageFacade } from '../../../facades/message/message.facade';
import { ResponseHttp } from '../../../shared/interfaces/ResponseType';
import { concatMap, from, fromEvent, Subject, takeUntil, timeInterval, timer } from 'rxjs';
import { Buffer } from 'buffer';
import { SwitchTranslationState } from '../../../core/states/switchTranslation/switch-translation.state';

@Component({
  selector: 'message',
  imports: [DatePipe, LimitTextPipe, SlicePipe, NgxSkeletonLoaderModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements AfterViewInit {

  isYourMessage = input<boolean>();
  isGroup = input<boolean>();
  message: InputSignal<Message> = input(null);

  protected messageFileSignal: WritableSignal<MessageFile> = signal(null);
  protected switchTranslation = inject(SwitchTranslationState);
  private injector = inject(Injector);
  protected isExtend = true;
  private destroy = new Subject();

  private messageFacade = inject(MessageFacade);
  protected showOptions = false;
  protected showEditMessage = output<any>();

  protected currentAudio = signal(0);
  protected totalAudio: number = 0;
  protected audio: HTMLAudioElement;
  protected audioPlayed = false;
  protected waves = new Array(6);


  ngOnDestroy(): void {
    this.audio?.pause();
    this.destroy.complete();
    this.destroy.next(null);
  }

  ngAfterViewInit() {

    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.message().messageType == "image" || this.message().messageType == "file") {
          this.messageFacade.getFileOfMesage(this.message().messageId)
            .pipe(takeUntil(this.destroy))
            .subscribe((result: ResponseHttp<MessageFile>) => {

              if (result.isSuccess) {
                this.messageFileSignal.set(result.value)
                const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));

                const processResult = ({ data }) => {
                  this.messageFileSignal?.set({ ...this.messageFileSignal(), data });
                  worker.removeEventListener("message",processResult);
                };

                worker.onmessage = processResult
                worker.postMessage(result.value.data);
                // const photoBuffer = Buffer.from(result.value.data as ArrayBuffer);
                // const url = URL.createObjectURL(new Blob([photoBuffer]))
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

  protected getSound() {
    if (this.audio?.paused) {
      this.audio?.play();
      this.audioPlayed = true;
      return;
    }
    this.messageFacade.getFileOfMesage(this.message().messageId)
      .subscribe((result: ResponseHttp<MessageFile>) => {
        const photoBuffer = Buffer.from(result.value.data as ArrayBuffer);
        const url = URL.createObjectURL(new Blob([photoBuffer]))

        this.audio = new Audio(url)
        this.messageFileSignal.set({ ...this.messageFileSignal(), data: url });
        this.audioPlayed = true;

        fromEvent(this.audio, 'timeupdate')
          .pipe(takeUntil(this.destroy))
          .subscribe(() => {
            this.currentAudio.set(this.audio.currentTime);
          });

        fromEvent(this.audio, "ended")
          .pipe(takeUntil(this.destroy))
          .subscribe(() => {
            this.currentAudio.set(0);
          })
        this.audio.play()
      })
  }

  protected pauseSound() {
    this.audio.pause();
    this.audioPlayed = false;
  }

  protected deleteMessage() {
    this.messageFacade.deleteMessage(this.message())
    this.showOptions = false;
  }

  protected toggleExtend(): void {
    this.isExtend = !this.isExtend;
  }

}
