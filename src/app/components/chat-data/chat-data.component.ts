import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { UserAreaComponent } from "../user-area/user-area.component";
import { UserDetailComponent } from "../user-detail/user-detail.component";

@Component({
  selector: 'chat-data',
  standalone: true,
  imports: [RouterOutlet, ButtonIconComponent, RouterLink, UserAreaComponent, UserDetailComponent],
  templateUrl: './chat-data.component.html',
  styleUrl: './chat-data.component.scss'
})
export class ChatDataComponent {

}
