import { Component, effect, inject, WritableSignal } from '@angular/core';
import { UserDetail, UserDetailState } from '../../core/states/userDetail/user-detail.service';
import { ChatFacade } from '../../facades/Chat/chat.service';
import { ChatState } from '../../core/states/chat/chat-states.service';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ButtonStyleDirective],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {

  protected userDetailSignal: WritableSignal<UserDetail>;
  private chatStateService = inject(ChatState)
  private chatFacade = inject(ChatFacade)

  constructor(userDetailState: UserDetailState) {
    this.userDetailSignal = userDetailState.userDetailSignal
  }

  protected closeDetails() {
    this.userDetailSignal.update(el => {
      el.show = false;
      return el;
    })
  }

  protected blockChat() {
    this.userDetailSignal.update(current => {
      return {
        ...current, // Gera uma nova referência
        data: {
          ...current.data,
          isActive: false,
          dateOfBlocking: new Date()
        }
      };
    })

    this.chatStateService.chatState.update(el => {
      if (el !== undefined) {
        return {
          ...el, // Copia o objeto atual
          isActive: false // Atualiza o valor de 'isActive'
        };
      } else {
        return {
          isActive: false
        };
      }
    })

    this.chatFacade.blockChat(this.userDetailSignal().data.userId, this.userDetailSignal().data.chatId);
  }

  protected unlockedChat() {
    this.userDetailSignal.update(current => {
      return {
        ...current, // Gera uma nova referência
        data: {
          ...current.data,
          isActive: true,
          dateOfBlocking: null
        }
      };
    })

    this.chatStateService.chatState.update(el => {
      if (el !== undefined) {
        return {
          ...el, // Copia o objeto atual
          isActive: true // Atualiza o valor de 'isActive'
        };
      } else {
        return {
          isActive: true
        };
      }
    })

    this.chatFacade.deblockChat(this.userDetailSignal().data.userId, this.userDetailSignal().data.chatId);
  }

}
