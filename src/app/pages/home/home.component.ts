import { Component, inject,computed,signal,effect } from '@angular/core';
import { ChatDataComponent } from '../../components/chat-data/chat-data.component';
import { ChatComponent } from '../../components/shared/chat/chat.component';
import { ChatStatesService } from '../../core/states/chat-states.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatDataComponent,ChatComponent],
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
        }
      }
    })
  }
  
}
