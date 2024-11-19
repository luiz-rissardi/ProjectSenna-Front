import { AfterViewInit, Component, inject, input, InputSignal, signal } from '@angular/core';
import { LimitTextPipe } from '../../../pipes/limit-text.pipe';
import { UserState } from '../../../core/states/User/userState.service';
import { ChatFacade } from '../../../facades/Chat/chat.service';
import { User } from '../../../core/entity/user';


@Component({
  selector: 'app-contact-search',
  standalone: true,
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
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));
      worker.onmessage = ({ data }) => {
        this.photoImage.set(data)
      };
      worker.postMessage(this.user().photo);
    }
  }

  AddNewChat() {
    const currentUserId = this.userStateService.userSignal()?.userId;

    this.chatFacade.createNewChat(currentUserId, {
      // memberType: "conversation",
      // lastClear: Date,
      isActive: this.user().isActive,
      userId: this.user().userId,
      // chatId: this.,
      // dateOfBlocking: Date,
      // otherUserId: string,
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
