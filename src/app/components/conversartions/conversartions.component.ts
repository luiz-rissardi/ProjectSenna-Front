import { Component, inject, TemplateRef } from '@angular/core';
import { NotificationChatComponent } from '../shared/notification-chat/notification-chat.component';
import { ChatFacade } from '../../facades/chat/chat.facade';
import { UserState } from '../../core/states/User/user.state';
import { ChatArrayState } from '../../core/states/chats/chats.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  private modalService = inject(NgbModal);
  protected chatsArrayState = inject(ChatArrayState);


  constructor() {
    if (this.chatsArrayState.chatsArrayState()?.length == undefined) {
      const userId = this.userState.userSignal()?.userId;
      if (userId) {
        this.chatFacade.getChatsOfUser(userId)
      }
    }
  }

  protected inviteFriends(el: TemplateRef<any>) {
    this.modalService.open(el);
  }

}
