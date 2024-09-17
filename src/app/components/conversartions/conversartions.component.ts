import { Component } from '@angular/core';
import { NotificationChatComponent } from '../shared/notification-chat/notification-chat.component';

@Component({
  selector: 'app-conversartions',
  standalone: true,
  imports: [NotificationChatComponent],
  templateUrl: './conversartions.component.html',
  styleUrl: './conversartions.component.scss'
})
export class ConversartionsComponent {

  protected users = [
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/fabio.png",
    },
  ]
}
