import { AfterViewInit, Component, input, InputSignal } from '@angular/core';
import { Message } from '../../../shared/interfaces/message';
import { DatePipe } from '@angular/common';
import { LimitTextPipe } from '../../../shared/pipes/limitText/limit-text.pipe';

@Component({
  selector: 'message',
  imports: [DatePipe, LimitTextPipe],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements AfterViewInit {
  
  isYourMessage = input<boolean>();
  isGroup = input<boolean>();
  message: InputSignal<Message> = input(null);
  protected isExtend = true;

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.message()?.message.length >= 300) {
        this.isExtend = false;
      }
    });
  }

  toggleExtend(): void {
    this.isExtend = !this.isExtend;
  }
}
