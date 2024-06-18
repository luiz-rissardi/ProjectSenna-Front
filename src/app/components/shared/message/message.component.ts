import { Component, input } from '@angular/core';

@Component({
  selector: 'message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  isYourMessage = input<boolean>();
  message = input<string>();
  sendAt = input();
  userName = input<string>();
}
