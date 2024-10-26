import { Component, inject } from '@angular/core';
import { NotificationChatComponent } from '../shared/notification-chat/notification-chat.component';
import { ChatFacade } from '../../facades/Chat/chat.service';
import { UserState } from '../../core/states/User/userState.service';
import { ChatArrayState } from '../../core/states/Chats/chats.service';

@Component({
  selector: 'app-conversartions',
  standalone: true,
  imports: [NotificationChatComponent],
  templateUrl: './conversartions.component.html',
  styleUrl: './conversartions.component.scss'
})
export class ConversartionsComponent {


  private chatFacade = inject(ChatFacade)
  private userState = inject(UserState);
  protected chatsArrayState = inject(ChatArrayState);

  constructor(){
    const userId = this.userState.userSignal()?.userId;
    if(userId){
      this.chatFacade.getChatsOfUser(userId)
    }
  }

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
