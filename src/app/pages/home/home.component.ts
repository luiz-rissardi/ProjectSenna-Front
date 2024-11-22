import { Component, inject, effect } from '@angular/core';
import { ChatDataComponent } from '../../components/chat-data/chat-data.component';
import { ChatComponent } from '../../components/shared/chat/chat.component';
import { ChatState } from '../../core/states/chat/chat.state';
import { UserDetailComponent } from "../../components/user-detail/user-detail.component";
import { WarnigComponent } from "../../components/shared/warnig/warnig.component";
import { ContactFacade } from '../../facades/contact/contact.facade';
import { UserState } from '../../core/states/User/user.state';

@Component({
    selector: 'app-home',
    imports: [ChatDataComponent, ChatComponent, UserDetailComponent, WarnigComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

  private ChatState = inject(ChatState);
  private contactFacade = inject(ContactFacade);
  private userState = inject(UserState)
  protected isMobile = window.innerWidth < 940;
  protected showChat = !this.isMobile;

  constructor() {
    effect(() => {
      if (this.isMobile) {
        if (this.ChatState.chatState()?.chatId != null) {
          this.showChat = true
        } else {
          this.showChat = false
        }
      }
    })

    this.contactFacade.findContactsOfUser(this.userState.userSignal().contactId)
    
  }

}
