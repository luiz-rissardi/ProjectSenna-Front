import { Component, inject,effect } from '@angular/core';
import { ChatDataComponent } from '../../components/chat-data/chat-data.component';
import { ChatComponent } from '../../components/shared/chat/chat.component';
import { ChatStatesService } from '../../core/states/chat/chat-states.service';
import { UserDetailComponent } from "../../components/user-detail/user-detail.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatDataComponent, ChatComponent, UserDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private ChatState = inject(ChatStatesService);
  protected isMobile = window.innerWidth < 940;
  protected showChat = !this.isMobile;

  constructor() {
    effect(()=>{
      if(this.isMobile){
        if(this.ChatState.state() != null){
          this.showChat = true
        }else{
          this.showChat = false
        }
      }
    })
  }
  
}
