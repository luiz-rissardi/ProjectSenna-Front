import { Component } from '@angular/core';
import { ButtonIconComponent } from '../../button-icon/button-icon.component';
import { RouterLink } from '@angular/router';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonIconComponent, RouterLink, ButtonStyleDirective],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  data = "luiz"

  exec = () => {
    console.log(this.data);
  }
}
