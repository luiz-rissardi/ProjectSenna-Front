import { Component, ElementRef, ViewChild, effect, inject, input } from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatStatesService } from '../../../core/states/chat/chat-states.service';
import { DOMManipulation } from '../../../shared/DomManipulation';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.service';
// import { fromEvent } from 'rxjs';

@Component({
  selector: 'notification-chat',
  standalone: true,
  imports: [ButtonIconComponent],
  templateUrl: './notification-chat.component.html',
  styleUrl: './notification-chat.component.scss'
})
export class NotificationChatComponent extends DOMManipulation {

  @ViewChild('notification') notificationElement!: ElementRef;

  userName = input<string>();
  userPhoto = input<string | undefined>();
  chatId = input<number | undefined>(Math.floor(Math.random() * 900));
  private chatState = inject(ChatStatesService);
  private isSetted = false

  constructor(private userDetailState: UserDetailState) {
    super();
    effect(() => {
      if (this.chatState.state() != null && this.isSetted == false) {
        this.removeClassToElement(this.notificationElement.nativeElement, "active")
      } else {
        this.isSetted = false;
      }
    })
  }

  protected stopPropagation(event: Event){
    event.stopPropagation();
  }

  protected openChat(el: HTMLElement) {
    this.isSetted = true
    this.chatState.setState(this.chatId())
    this.addClassToElement(el, "active")
  }

  protected openUserDetail = ()=> {
    this.userDetailState.userDetailSignal.set({
      show:true,
      data:{
        userName:"fabio",
        description:"uma breve descrição",
        photo:"../../../assets/fabio.png"
      }
    })
  }
}
