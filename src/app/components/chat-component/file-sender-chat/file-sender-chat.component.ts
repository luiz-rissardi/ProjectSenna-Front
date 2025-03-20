import { Component, effect, ElementRef, inject, input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageFacade } from '../../../facades/message/message.facade';

@Component({
  selector: 'app-file-sender-chat',
  imports: [],
  templateUrl: './file-sender-chat.component.html',
  styleUrl: './file-sender-chat.component.scss'
})
export class FileSenderChatComponent {
  source = input("");
  nameSource = input("");
  sourceType = input("");
  sourceBlob = input(null);

  protected text = "Visualização prévia";
  protected show = true;
  protected safeResource = inject(DomSanitizer);
  @ViewChild("inputTextFile") private inputTextFile: ElementRef
  private messageFacade = inject(MessageFacade);

  constructor() {
    effect(() => {
      if (this.source() != "") {
        this.show = true;
      }
    })
  }

  loadAlternativeImage() {
    this.text = "Visualização prévia indisponivel!"
  }

  sendMessageFile() {
    const messageText = this.inputTextFile.nativeElement.value;
    const messageType = this.sourceType().includes("image") ? "image" : "file"
    this.messageFacade.sendMessageFile(this.sourceBlob(),this.nameSource(),messageText,messageType);
    this.show = false;
  }

}
