import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';

@Component({
  selector: 'chat-data',
  standalone: true,
  imports: [RouterOutlet,ButtonIconComponent],
  templateUrl: './chat-data.component.html',
  styleUrl: './chat-data.component.scss'
})
export class ChatDataComponent {

}
