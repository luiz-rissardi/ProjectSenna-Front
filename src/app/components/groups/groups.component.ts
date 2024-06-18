import { Component } from '@angular/core';
import { NotificationChatComponent } from '../shared/notification-chat/notification-chat.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [NotificationChatComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
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
