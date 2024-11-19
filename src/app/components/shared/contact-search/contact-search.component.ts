import { AfterViewInit, Component, inject, input, InputSignal, signal } from '@angular/core';
import { LimitTextPipe } from '../../../pipes/limit-text.pipe';
import { UserState } from '../../../core/states/User/userState.service';
import { ChatFacade } from '../../../facades/Chat/chat.service';


@Component({
  selector: 'app-contact-search',
  standalone: true,
  imports: [LimitTextPipe],
  templateUrl: './contact-search.component.html',
  styleUrl: './contact-search.component.scss'
})
export class ContactSearchComponent implements AfterViewInit {

  userName: InputSignal<string> = input("");
  userId: InputSignal<string> = input("");
  photo: InputSignal<any> = input(null);
  description: InputSignal<string> = input("");
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
      worker.postMessage(this.photo());
    }
  }

  AddNewChat(){
    const currentUserId = this.userStateService.userSignal()?.userId;
    const targetUserId = this.userId();

    this.chatFacade.createNewChat(currentUserId,targetUserId);
    
  }

  loadAlternativeImage() {
    this.photoImage.set("../../../../assets/icons/do-utilizador.png")
  }
}
