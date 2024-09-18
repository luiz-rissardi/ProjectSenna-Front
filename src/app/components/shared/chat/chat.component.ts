import { Component, OnInit, inject } from '@angular/core';
import { DOMManipulation } from '../../../shared/DomManipulation';
import { MessageComponent } from '../message/message.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatStatesService } from '../../../core/states/chat/chat-states.service';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.service';

@Component({
  selector: 'chat',
  standalone: true,
  imports: [MessageComponent,ButtonIconComponent, ButtonIconDirective],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent extends DOMManipulation implements OnInit {

  private chatState = inject(ChatStatesService);
  private userDetailState: UserDetailState = inject(UserDetailState);

  protected openUserDetail = ()=> {
    console.log("object");
    this.userDetailState.userDetailSignal.set({
      show:true,
      data:{
        userName:"fabio",
        description:"uma breve descrição",
        photo:"https://imgs.search.brave.com/ahZhx2klnGxFg24V5yC9nemnvdbslYDQoVF3AUGrWjw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/bHVjaWRwaWMuY29t/LzY1YWFjMjRiNzg5/MGUucG5n"
      }
    })
  }

  async ngOnInit() {
    setTimeout(() => {
      const chatBox = this.findElement("chat") as HTMLElement
      chatBox.scrollTop = chatBox.scrollHeight
    }, 0);

    const inputFile = document.getElementById("file");
    const i = document.getElementById("img") as HTMLImageElement;


    // const data = await fetch("http://localhost:8729/chat/message/6c7bf14d-eef6-442a-acaf-a2eb50e8eef0")
    // // const result = await data.json();

    // data.body
    //   .pipeThrough(new TextDecoderStream())
    //   .pipeTo(new WritableStream({
    //     write(chunk, controller) {
    //       const dados = JSON.parse(chunk);
    //       const t = dados.data.data
    //       const lol = Buffer.from(t)
    //       i.src = URL.createObjectURL(new Blob([lol]))
    //     }
    //   }))



    inputFile.addEventListener('change', function (event: any) {
      const file = event.target.files[0];

      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      console.log(`Tamanho do arquivo: ${fileSizeInMB.toFixed(2)} MB`);

      const fileReader = new FileReader();

      fileReader.onload = async (e) => {

        const imageData = e.target.result
        console.log(imageData);
        // const blob = new Blob([imageData]);
        // console.log(blob);
        // // const t  = Buffer.from(await blob.arrayBuffer());
        // // console.log(blob);
        // i.src = URL.createObjectURL(blob)



        // const formData = new FormData();
        // formData.append("messageText", "ola a todos aqui sou eu de novo ola mundo");
        // formData.append("userId", "2fc0b1a3-37be-4dd4-aed7-bcad3e89dbb2");
        // formData.append("language", "pt-br");
        // formData.append("messageArrayBuffer", blob, file.name);
        // try {
        //   await fetch("http://localhost:3000/chat/95171413-c9f0-42f9-9a83-81913a4c4dfc/message/image", {
        //     method: "POST",
        //     body: formData
        //   })
        // } catch (error) {
        //   console.log(error);
        // }

      }

      fileReader.readAsDataURL(file)

    });
  }

  chosenFile() {
    const inputFile = document.getElementById("file");
    inputFile.click()

  }

  protected closeChat() {
    this.chatState.state.set(null)
  }

  protected toogleDroptDown(el: HTMLElement) {
    if (el.style.display != "none") {
      el.style.display = "none"
    } else {
      el.style.display = "block"
    }
  }

  teste() {
    console.log("tescla enter acionada");
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
