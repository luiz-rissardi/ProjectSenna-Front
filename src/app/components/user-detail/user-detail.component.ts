import { Component, inject } from '@angular/core';
import { UserDetail, UserDetailState } from '../../core/states/userDetail/user-detail.service';
import { ChatFacade } from '../../facades/Chat/chat.service';
import { ChatState } from '../../core/states/chat/chat-states.service';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { ChatArrayState } from '../../core/states/Chats/chats.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ButtonStyleDirective],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {

  private chatFacade = inject(ChatFacade);
  private chatStateService = inject(ChatState);
  private chatsArrayState = inject(ChatArrayState)
  protected userDetailState = inject(UserDetailState);

  protected closeDetails() {
    this.userDetailState.userDetailSignal.update(el => {
      el.show = false;
      return el
    })
  }

  protected blockChat() {
    // Atualiza o estado do usuário
    const currentUserDetail = this.userDetailState.userDetailSignal();
    this.userDetailState.userDetailSignal.set({
      show:true,
      data: {
        ...currentUserDetail.data,
        isActive: false,
        dateOfBlocking: new Date(),
      },
    });

    // Atualiza o estado do chat
    const currentChatState = this.chatStateService.chatState();
    this.chatStateService.chatState.set({
      ...currentChatState,
      isActive: false,
    });

    this.chatsArrayState.chatsArrayState.update(chats => {
      chats = chats.map(el => {
        if(el.otherUserId == this.userDetailState.userDetailSignal().data.userId){
          el.isActive = false;
          el.dateOfBlocking = new Date();
        }
        return el
      })
      return chats
    })

    // Chama o método para bloquear o chat
    this.chatFacade.blockChat(
      currentChatState?.userId,
      currentUserDetail.data.chatId
    );
  }

  protected unlockedChat() {
    // Atualiza o estado do usuário
    const currentUserDetail = this.userDetailState.userDetailSignal();
    this.userDetailState.userDetailSignal.set({
      show:true,
      data: {
        ...currentUserDetail.data,
        isActive: true,
        dateOfBlocking: null,
      },
    });

    // Atualiza o estado do chat
    const currentChatState = this.chatStateService.chatState();
    this.chatStateService.chatState.set({
      ...currentChatState,
      isActive: true,
    });

    this.chatsArrayState.chatsArrayState.update(chats => {
      chats = chats.map(el => {
        if (el.otherUserId == this.userDetailState.userDetailSignal().data.userId) {
          el.isActive = true;
          el.dateOfBlocking = null;
        }
        return el
      })
      return chats
    })

    // Chama o método para desbloquear o chat
    this.chatFacade.deblockChat(
      currentChatState?.userId,
      currentUserDetail.data.chatId
    );
  }
}
