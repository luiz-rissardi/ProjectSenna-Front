import { Component, effect, inject } from '@angular/core';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { RouterLink } from '@angular/router';
import { UserState } from '../../core/states/User/userState.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ButtonStyleDirective, ButtonIconComponent, RouterLink],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  protected userState = inject(UserState);
  protected photoState: any;

  constructor() {

    effect(() => {
      const user = this.userState.userSignal();
      const photo = user?.photo;
      if (photo != undefined) {
        this.photoState = photo
      } else {
        // pattern photo to load
        this.photoState = "../../../assets/icons/do-utilizador.png"
      }
    })
  }
}
