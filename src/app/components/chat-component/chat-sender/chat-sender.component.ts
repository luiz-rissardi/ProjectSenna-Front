import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ChatState } from '../../../core/states/chat/chat.state';
import { MessageFacade } from '../../../facades/message/message.facade';
import { DatePipe } from '@angular/common';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { DOMManipulation } from '../../../shared/operators/DomManipulation';
import { FileSenderChatComponent } from "../../shared/file-sender-chat/file-sender-chat.component";

@Component({
  selector: 'app-chat-sender',
  imports: [ButtonIconDirective, DatePipe, FileSenderChatComponent],
  templateUrl: './chat-sender.component.html',
  styleUrl: './chat-sender.component.scss'
})
export class ChatSenderComponent extends DOMManipulation {
  protected chatState = inject(ChatState);
  private messageFacade = inject(MessageFacade);
  protected source = signal(null);
  protected sourceName = signal(null);
  protected sourceType = signal(null);
  protected sourceBlob = signal(null);
  protected isRecording = false;
  protected isStoped = false;
  protected timeAudio = 0;
  private audioChunks = [];
  private mediaRecorder!: MediaRecorder;
  private recordingInterval: any = null;

  @ViewChild('inputText') private inputText: ElementRef;
  @ViewChild('chat', { static: false }) private chatContainer: ElementRef;

  protected chosenFile() {
    const inputFile = this.getElementsByClass('file-sender')[0];
    inputFile.click();
    const subescriber = fromEvent(inputFile, "input")
      .subscribe((data: any) => {
        const inputFile = data?.target as HTMLInputElement;
        const file = inputFile.files[0];
        const blob = new Blob([file], { type: file.type });
        const url = URL.createObjectURL(blob)
        this.source.set(url);
        this.sourceBlob.set(blob);
        this.sourceName.set(file.name);
        this.sourceType.set(file.type);
        inputFile.value = null;
        subescriber.unsubscribe()
      })
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chat = this.chatContainer?.nativeElement as HTMLElement;
      if (chat) {
        chat.scrollTop = chat.scrollHeight + 10000;
      }
    }, 50);
  }


  protected sendMessage() {
    const messageText = this.inputText.nativeElement.value;

    if (messageText.trim() === '') return;
    this.scrollToBottom();
    this.messageFacade.sendMessage(messageText);
    this.inputText.nativeElement.value = ''; // Limpa o campo após enviar
  }

  protected startRecording() {
    try {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.isRecording = true;
          this.startMediaRecording(stream);
        });
    } catch (err) {
      console.error('Erro ao acessar o microfone:', err);
    }
  }

  private async startMediaRecording(stream: any) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    // Inicia o contador de tempo
    this.recordingInterval = setInterval(() => {
      if (this.isRecording && !this.isStoped) {
        this.timeAudio++;
      }
    }, 1000);

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data); // Armazena os pedaços de áudio
    };

    this.mediaRecorder.start();
  }

  protected pauseAudio() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.isStoped = true;
    }
  }

  protected resumeAudio() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.isStoped = false;
    }
  }

  protected stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = false;
  }

  protected cancelAudio() {
    this.mediaRecorder.stop();
    this.timeAudio = 0;  // Resetando o contador ao parar a gravação
    this.isRecording = false;
    this.isStoped = false
  }

  protected sendAudio() {
    this.mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(this.audioChunks, { type: "audio/mp3" });

      this.messageFacade.sendMessageFile(audioBlob, "audio", "", "audio");
    };
    clearInterval(this.recordingInterval);
    this.stopRecording()
    this.timeAudio = 0;  // Resetando o contador ao parar a gravação
    this.isStoped = false;
  }
}
