import { Component, inject } from '@angular/core';
import { UserDetail, UserDetailState } from '../../core/states/userDetail/user-detail.service';
import { ChatFacade } from '../../facades/Chat/chat.service';
import { ChatState } from '../../core/states/chat/chat-states.service';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { ChatArrayState } from '../../core/states/Chats/chats.service';
import { UserState } from '../../core/states/User/userState.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ButtonStyleDirective],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {

  private chatFacade = inject(ChatFacade);
  private userState = inject(UserState)
  protected userDetailState = inject(UserDetailState);

  protected closeDetails() {
    this.userDetailState.userDetailSignal.update(el => {
      el.show = false;
      return el
    })
  }

  protected blockChat() {
    //Chama o método para bloquear o chat
    this.chatFacade.blockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected unlockedChat() {
    // Chama o método para desbloquear o chat
    this.chatFacade.deblockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }
}
