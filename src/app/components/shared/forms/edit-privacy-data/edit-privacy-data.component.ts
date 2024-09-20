import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonIconDirective } from '../../../../directives/buttonIcon/button-icon.directive';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';

@Component({
  selector: 'app-edit-privacy-data',
  standalone: true,
  imports: [RouterLink,ButtonIconDirective,ButtonStyleDirective],
  templateUrl: './edit-privacy-data.component.html',
  styleUrl: './edit-privacy-data.component.scss'
})
export class EditPrivacyDataComponent {

}
