import { AfterRenderRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DOMManipulation } from '../../../shared/DomManipulation';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'chat',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends DOMManipulation implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      const chatBox = this.findElement("chat") as HTMLElement
      chatBox.scrollTop = chatBox.scrollHeight
    }, 0);
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
      username: "nathalia",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "nathalia",
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
      username: "nathalia",
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
      username: "nathalia",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "Luiz",
      sendAt: new Date()
    },
    {
      message: "ola tudo bem ?",
      username: "nathalia",
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
