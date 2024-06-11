import { Component } from '@angular/core';
import { ButtonIconComponent } from '../../components/button-icon/button-icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
