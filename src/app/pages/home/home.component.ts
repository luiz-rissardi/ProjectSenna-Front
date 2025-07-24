import { Component, inject, effect } from '@angular/core';
import { ChatDataComponent } from '../../components/chat-data/chat-data.component';
import { ChatComponent } from '../../components/chat-component/chat/chat.component';
import { ChatState } from '../../core/states/chat/chat.state';
import { UserDetailComponent } from "../../components/user-detail/user-detail.component";
import { WarnigComponent } from "../../components/shared/warnig/warnig.component";
import { ContactFacade } from '../../facades/contact/contact.facade';
import { UserState } from '../../core/states/User/user.state';
import { ChatArrayState } from '../../core/states/chats/chats.state';
import { SocketService } from '../../core/services/socket/socket.service';
import { OffLineMessagesService } from '../../core/services/OffLineMessages/off-line-messages.service';
import { MessageFacade } from '../../facades/message/message.facade';
import { ChatFacade } from '../../facades/chat/chat.facade';
import { GroupFacade } from '../../facades/group/group.facade';
import { ShareGroupComponent } from "../../components/share-group/share-group.component";

@Component({
  selector: 'app-home',
  imports: [ChatDataComponent, ChatComponent, UserDetailComponent, WarnigComponent, ShareGroupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private chatState = inject(ChatState);
  private chatArrayState = inject(ChatArrayState);
  private socketService = inject(SocketService);
  private messageFacade = inject(MessageFacade);
  private offlineMessages = inject(OffLineMessagesService);
  protected isMobile = window.innerWidth < 940;
  protected showChat = !this.isMobile;

  constructor() {

    effect(() => {
      const chats = this.chatArrayState.chatsArrayState()?.map(el => el.chatId)
      if (chats != null) {
        this.socketService.emit("enter-rooms-chat", chats)

        if(navigator.onLine == true){
          this.offlineMessages.getLocalMesages()
          .forEach((message,i,array) => {
            this.messageFacade.sendMessage(message.message,message.messageType)
            if(i+1 >= array.length){
              this.offlineMessages.removeAll()
            }
          })
          
        }
      }
    })

    effect(() => {
      if (this.isMobile) {
        if (this.chatState.chatState()?.chatId != null) {
          this.showChat = true
        } else {
          this.showChat = false
        }
      }
    })

  }

}
