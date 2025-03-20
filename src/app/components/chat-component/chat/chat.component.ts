import { Component, inject } from '@angular/core';
import { ChatState } from '../../../core/states/chat/chat.state';
import { CommonModule } from '@angular/common';
import { ChatUserDataComponent } from '../chat-user-data/chat-user-data.component';
import { ChatMessagesComponent } from "../chat-messages/chat-messages.component";
import { ChatSenderComponent } from "../chat-sender/chat-sender.component";
import { ChatImageZoomComponent } from "../chat-image-zoom/chat-image-zoom.component";

@Component({
  selector: 'chat',
  imports: [ChatUserDataComponent, CommonModule, ChatMessagesComponent, ChatMessagesComponent, ChatSenderComponent, ChatImageZoomComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  protected chatState = inject(ChatState);
  
}
