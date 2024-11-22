import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DOMManipulation } from '../../../shared/DomManipulation';
import { MessageComponent } from '../message/message.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatState } from '../../../core/states/chat/chat.state';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { UserState } from '../../../core/states/User/user.state';
import { ChatFacade } from '../../../facades/chat/chat.facade';
import { ContactFacade } from '../../../facades/contact/contact.facade';

@Component({
  selector: 'chat',
  standalone: true,
  imports: [MessageComponent, ButtonIconComponent, ButtonIconDirective],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent extends DOMManipulation {

  protected userDetailState: UserDetailState = inject(UserDetailState);
  protected chatStateService = inject(ChatState);
  protected imageSrc: any = ""
  @ViewChild("dropdown") private dropdown: ElementRef
  private userState = inject(UserState);
  private chatFacade = inject(ChatFacade);
  private contactFacade = inject(ContactFacade);

  constructor() {
    super();
  }


  protected openUserDetail = () => {
    if (this.dropdown.nativeElement != null) {
      this.dropdown.nativeElement.style.display = "none"
    }

    this.userDetailState.userDetailSignal.update(data => {
      data.show = true;
      return data
    })
  }

  protected chosenFile() {
    const inputFile = document.getElementById("file");
    inputFile.click()

  }

  protected closeChat() {
    this.chatStateService.chatState.set(null)
  }

  protected toogleDroptDown() {
    if (this.dropdown.nativeElement.style.display != "none") {
      this.dropdown.nativeElement.style.display = "none"
    } else {
      this.dropdown.nativeElement.style.display = "block"
    }
  }

  protected blockChat() {
    this.toogleDroptDown();
    //Chama o método para bloquear o chat
    this.chatFacade.blockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected unlockedChat() {
    this.toogleDroptDown();
    // Chama o método para desbloquear o chat
    this.chatFacade.deblockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected addContact() {
    const { userName, userId, photo } = this.userDetailState.userDetailSignal().data;
    const user = this.userState.userSignal()
    this.contactFacade.addContact(user.contactId, userId, photo, userName);
  }


  messages = [
    {
      message: "ola tudo beasdasdasdasd adasdasdasdasd as d asd as d as d as dasm ?",
      username: "Luiz",
      sendAt: "primeira"
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "eduardo",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "eduardo",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "eduardo",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "eduardo",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "eduardo",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: "ultima"
    },
  ]

}
