import { Component } from '@angular/core';
import { ButtonIconDirective } from '../../../../directives/buttonIcon/button-icon.directive';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ButtonIconDirective,ButtonStyleDirective],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

}
