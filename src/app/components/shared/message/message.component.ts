import { Component, input } from '@angular/core';

@Component({
    selector: 'message',
    imports: [],
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss'
})
export class MessageComponent {

  isYourMessage = input<boolean>();
  isGroup = input<boolean>(true);
  message = input<string>();
  sendAt = input();
  userName = input<string>();
}
