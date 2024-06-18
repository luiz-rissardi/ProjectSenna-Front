import { Component } from '@angular/core';
import { NotificationChatComponent } from '../shared/notification-chat/notification-chat.component';

@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [NotificationChatComponent],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.scss'
})
export class ForumsComponent {

  protected users = [
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
    {
      userName: "luiz gustavo rissardi",
      photo: "../../../assets/icons/do-utilizador.png",
    },
  ]
}
