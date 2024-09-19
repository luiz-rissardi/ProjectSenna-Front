import { Component } from '@angular/core';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ButtonStyleDirective, ButtonIconComponent,RouterLink],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

}
