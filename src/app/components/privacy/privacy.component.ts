import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonIconDirective } from '../../directives/buttonIcon/button-icon.directive';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink,ButtonIconDirective],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {


  changeMarkReadConfirmation(){
    console.log("mundando");
  }
}
