import { AfterViewInit, Component, inject, input, InputSignal, signal } from '@angular/core';
import { Contact } from '../../../interfaces/contact';
import { ChatData } from '../../../interfaces/chatData';
import { ChatState } from '../../../core/states/chat/chat.state';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {

  contact: InputSignal<Contact> = input({photo:"../../../../assets/icons/do-utilizador.png",userId:"",userName:""});
  chatData: InputSignal<ChatData> = input();

  private chatState = inject(ChatState);
  private userDetailState = inject(UserDetailState)

  protected loadAlternativeImage() {
    this.contact().photo = "../../../../assets/icons/do-utilizador.png"
  }

  ngAfterViewInit(): void {
    if (typeof Worker !== 'undefined') {
      if (typeof this.contact().photo != "string") {
        const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));
        worker.onmessage = ({ data }) => {
          this.contact().photo = data
        };
        worker.postMessage(this.contact().photo);
      }
    }
  }

  protected openChat() {

    this.chatState.chatState.set({
     ...this.chatData()
    })

    this.userDetailState.userDetailSignal.set({
      show: false,
      data: {
        chatId: this.chatData().chatId,
        dateOfBlocking: this.chatData().dateOfBlocking,
        description: this.chatData().otherUserDescription,
        photo: this.chatData().otherUserPhoto,
        userId: this.chatData().otherUserId,
        userName: this.chatData().otherUserName,
        isActive: this.chatData().isActive
      }
    })
  }

}

