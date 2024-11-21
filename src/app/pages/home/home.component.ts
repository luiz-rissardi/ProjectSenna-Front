import { Component, inject,effect } from '@angular/core';
import { ChatDataComponent } from '../../components/chat-data/chat-data.component';
import { ChatComponent } from '../../components/shared/chat/chat.component';
import { ChatState } from '../../core/states/chat/chat-states.service';
import { UserDetailComponent } from "../../components/user-detail/user-detail.component";
import { WarnigComponent } from "../../components/shared/warnig/warnig.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatDataComponent, ChatComponent, UserDetailComponent, WarnigComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private ChatState = inject(ChatState);
  protected isMobile = window.innerWidth < 940;
  protected showChat = !this.isMobile;

  constructor() {
    effect(()=>{
      if(this.isMobile){
        if(this.ChatState.chatState()?.chatId != null){
          this.showChat = true
        }else{
          this.showChat = false
        }
      }
    })
  }
  
}
