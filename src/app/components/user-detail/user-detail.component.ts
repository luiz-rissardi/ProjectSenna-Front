import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserDetailState } from '../../core/states/userDetail/user-detail.state';
import { ChatFacade } from '../../facades/chat/chat.facade';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { UserState } from '../../core/states/User/user.state';

@Component({
    selector: 'app-user-detail',
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

  protected deleteMessages(){
    this.chatFacade.clearMessagesOfChat(
      this.userState.userSignal()?.userId
    )
  }
}
