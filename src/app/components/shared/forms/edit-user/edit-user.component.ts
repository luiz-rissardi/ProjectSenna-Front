import { Component } from '@angular/core';
import { ButtonIconDirective } from '../../../../directives/buttonIcon/button-icon.directive';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ButtonIconDirective,ButtonStyleDirective,RouterLink],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

}
