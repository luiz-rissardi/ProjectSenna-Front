import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonIconDirective } from '../../directives/buttonIcon/button-icon.directive';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ButtonIconDirective,RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

}
