import { Component, effect, inject, OnInit, TemplateRef } from '@angular/core';
import { NotificationChatComponent } from '../shared/notification-chat/notification-chat.component';
import { ChatArrayState } from '../../core/states/chats/chats.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conversartions',
  imports: [NotificationChatComponent],
  templateUrl: './conversartions.component.html',
  styleUrl: './conversartions.component.scss',
})
export class ConversartionsComponent {

  private modalService = inject(NgbModal);
  protected chatsArrayState = inject(ChatArrayState);
  protected cache = [];
  protected query = "";

  constructor() {
    effect(()=>{
      if(this.cache.length == 0 && this.chatsArrayState.chatsArrayState() != undefined ){
        this.cache = this.chatsArrayState.chatsArrayState()
      }
    })
  }

  protected inviteFriends(el: TemplateRef<any>) {
    this.modalService.open(el);
  }

  protected filterConversations() {
    this.query = (event.target as HTMLInputElement).value;

    if (this.query == "") {
      this.chatsArrayState.chatsArrayState.set(this.cache);
      return;
    }

    this.chatsArrayState.chatsArrayState.update(() => {
      return this.cache.filter(chat => chat.otherUserName.toLowerCase().includes(this.query.toLowerCase()));
    })

  }

}
