import { Component, OnInit, inject } from '@angular/core';
import { DOMManipulation } from '../../../shared/DomManipulation';
import { MessageComponent } from '../message/message.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatStatesService } from '../../../core/states/chat/chat-states.service';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.service';
import { UserState } from '../../../core/states/User/userState.service';

@Component({
  selector: 'chat',
  standalone: true,
  imports: [MessageComponent, ButtonIconComponent, ButtonIconDirective],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent extends DOMManipulation implements OnInit {

  protected userDetailState: UserDetailState = inject(UserDetailState);
  protected chatStateService = inject(ChatStatesService);
  protected userState = inject(UserState);
  protected imageSrc: any = ""

  constructor() {

    super();
  }


  protected openUserDetail = (el: HTMLElement | null) => {
    if(el != null){
      el.style.display = "none"
    }
    this.userDetailState.userDetailSignal.update(data => {
      data.show = true;
      return data
    })
  }

  async ngOnInit() {

  }

  chosenFile() {
    const inputFile = document.getElementById("file");
    inputFile.click()

  }

  protected closeChat() {
    this.chatStateService.chatState.set(null)
  }

  protected toogleDroptDown(el: HTMLElement) {
    if (el.style.display != "none") {
      el.style.display = "none"
    } else {
      el.style.display = "block"
    }
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
