import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { ButtonIconDirective } from '../../directives/buttonIcon/button-icon.directive';

@Component({
  selector: 'chat-data',
  standalone: true,
  imports: [RouterOutlet,ButtonIconComponent,RouterLink,ButtonIconDirective],
  templateUrl: './chat-data.component.html',
  styleUrl: './chat-data.component.scss'
})
export class ChatDataComponent {

}
