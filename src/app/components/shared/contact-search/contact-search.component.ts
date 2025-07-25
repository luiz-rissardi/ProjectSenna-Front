import { AfterViewInit, Component, inject, input, InputSignal, signal } from '@angular/core';
import { LimitTextPipe } from '../../../shared/pipes/limitText/limit-text.pipe';
import { UserState } from '../../../core/states/User/user.state';
import { ChatFacade } from '../../../facades/chat/chat.facade';
import { User } from '../../../shared/interfaces/user';
import { BufferToUrl } from '../../../workers/teste';


@Component({
  selector: 'app-contact-search',
  imports: [LimitTextPipe],
  templateUrl: './contact-search.component.html',
  styleUrl: './contact-search.component.scss'
})
export class ContactSearchComponent implements AfterViewInit {

  user: InputSignal<User> = input(null);

  protected photoImage = signal(null);
  protected clicked: boolean = false;
  private userStateService = inject(UserState);
  private chatFacade = inject(ChatFacade);



  ngAfterViewInit(): void {
    const urlImage = BufferToUrl(this.user().photo)
    this.photoImage.set(urlImage)
  }

  AddNewChat() {
    const currentUserId = this.userStateService.userSignal()?.userId;
    this.chatFacade.createNewChat(currentUserId, {
      isActive: this.user().isActive,
      userId: this.user().userId,
      userName: this.user().userName,
      userDescription: this.user().userDescription,
      photo: this.user().photo,
      lastOnline: this.user().lastOnline
    });

  }

  loadAlternativeImage() {
    this.photoImage.set("../../../../assets/icons/do-utilizador.png")
  }
}
