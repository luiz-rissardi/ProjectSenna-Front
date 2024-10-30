import { Component, OnInit, effect, inject } from '@angular/core';
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

  private userDetailState: UserDetailState = inject(UserDetailState);
  protected chatStateService = inject(ChatStatesService);
  protected userState = inject(UserState);
  protected imageSrc: any = ""

  constructor() {

    effect(()=>{
      console.log(this.chatStateService.chatState());
    })
    super();
  }

  
  protected openUserDetail = () => {
    this.userDetailState.userDetailSignal.set({
      show: true,
      data: {
        isActive:true,
        userName: "fabio",
        description: "uma breve descrição",
        dateOfBlocking: null,
        photo: "https://imgs.search.brave.com/ahZhx2klnGxFg24V5yC9nemnvdbslYDQoVF3AUGrWjw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/bHVjaWRwaWMuY29t/LzY1YWFjMjRiNzg5/MGUucG5n",
        userId: '',
        chatId: ''
      }
    })
  }

  async ngOnInit() {
    // setTimeout(() => {
    //   const chatBox = this.findElement("chat") as HTMLElement
    //   chatBox.scrollTop = chatBox.scrollHeight
    // }, 0);

    // const inputFile = document.getElementById("file");
    // // const i = document.getElementById("img") as HTMLImageElement;

    // // const data = await fetch("http://localhost:8729/chat/message/6c7bf14d-eef6-442a-acaf-a2eb50e8eef0")
    // // // const result = await data.json();

    // // data.body
    // //   .pipeThrough(new TextDecoderStream())
    // //   .pipeTo(new WritableStream({
    // //     write(chunk, controller) {
    // //       const dados = JSON.parse(chunk);
    // //       const t = dados.data.data
    // //       const lol = Buffer.from(t)
    // //       i.src = URL.createObjectURL(new Blob([lol]))
    // //     }
    // //   }))



    // inputFile.addEventListener('change', (event: any) => {
    //   const file = event.target.files[0];

    //   const fileReader = new FileReader();

    //   fileReader.onload = async (e) => {
    //     const imageData = e.target?.result; // O resultado da leitura
    //     if (imageData) {
    //       // Criando um blob a partir dos dados da imagem
    //       const blob = new Blob([imageData]);
    //       // Gerando uma URL de objeto para o blob
    //       this.imageSrc = URL.createObjectURL(blob); // Atualiza o src da imagem
    //     }

    //   }
    //   fileReader.readAsArrayBuffer(file)

    // });
    // // const formData = new FormData();
    // // formData.append("email", "devon@gmail.com");
    // // formData.append("password", "Luiz2006@");
    // // try {
    // //   const data = await fetch("http://localhost:3000/user/login", {
    // //     method: "POST",
    // //     body: formData
    // //   })
    // //   const photo = (await data.json()).value.photo;
    // //   const lol = Buffer.from(photo)
    // //   this.imageSrc = URL.createObjectURL(new Blob([lol]))
    // // } catch (error) {
    // //   console.log(error);
    // // }
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
