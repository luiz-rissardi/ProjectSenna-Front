import { ChangeDetectionStrategy, Component, inject, WritableSignal } from '@angular/core';
import { UserDetail, UserDetailState } from '../../core/states/userDetail/user-detail.service';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { ChatFacade } from '../../facades/Chat/chat.service';
import { ChatStatesService } from '../../core/states/chat/chat-states.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ ButtonStyleDirective ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {

  protected userDetailSignal: WritableSignal<UserDetail>;
  private chatStateService = inject(ChatStatesService)
  private chatFacade = inject(ChatFacade)

  constructor(userDetailState:UserDetailState){
    this.userDetailSignal = userDetailState.userDetailSignal
  }

  protected closeDetails(){
    this.userDetailSignal.update(current => {
      current.data = undefined;
      return current;
    })

    const idtime = setTimeout(() => {
      this.userDetailSignal.set(null);
      clearTimeout(idtime);
    }, 100);
  }

  protected blockChat(){
    this.userDetailSignal.update(current => {
      current.data.isActive = false;
      current.data.dateOfBlocking = new Date();
      return current
    })

    this.chatStateService.chatState.update(el => {
      el.isActive = false;
      return el
    })

    this.chatFacade.blockChat(this.userDetailSignal().data.userId,this.userDetailSignal().data.chatId);
  }

  protected unlockedChat(){
    this.userDetailSignal.update(current => {
      current.data.isActive = true;
      current.data.dateOfBlocking = null
      return current
    })

    this.chatStateService.chatState.update(el => {
      el.isActive = true;
      return el
    })

    this.chatFacade.deblockChat(this.userDetailSignal().data.userId,this.userDetailSignal().data.chatId);
  }

}
