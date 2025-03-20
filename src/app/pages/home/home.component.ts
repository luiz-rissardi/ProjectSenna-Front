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

@Component({
  selector: 'app-home',
  imports: [ChatDataComponent, ChatComponent, UserDetailComponent, WarnigComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private chatState = inject(ChatState);
  private contactFacade = inject(ContactFacade);
  private chatArrayState = inject(ChatArrayState);
  private socketService = inject(SocketService);
  private messageFacade = inject(MessageFacade);
  private chatFacade = inject(ChatFacade);
  private offlineMessages = inject(OffLineMessagesService);
  private groupFacade = inject(GroupFacade);
  private userState = inject(UserState)
  protected isMobile = window.innerWidth < 940;
  protected showChat = !this.isMobile;

  constructor() {

    if (this.chatArrayState.chatsArrayState()?.length == undefined) {
      const userId = this.userState.userSignal()?.userId;
      if (userId) {
        this.chatFacade.getChatsOfUser(userId)
      }
    }

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

    effect(()=>{
      this.contactFacade.findContactsOfUser(this.userState.userSignal().contactId)
      this.groupFacade.getGroups(this.userState.userSignal().userId)
    })
  }

}
