import { Component, input } from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatStatesService } from '../../../core/states/chat-states.service';


@Component({
  selector: 'notification-chat',
  standalone: true,
  imports: [ButtonIconComponent],
  templateUrl: './notification-chat.component.html',
  styleUrl: './notification-chat.component.scss'
})
export class NotificationChatComponent {
  
  userName = input<string>();
  userPhoto = input<string | undefined>();

  constructor(private chatState:ChatStatesService) {
  }

  openChat(){
    this.chatState.setState("2")
  }
}
