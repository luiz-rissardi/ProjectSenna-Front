import { Component, effect, inject } from '@angular/core';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { RouterLink } from '@angular/router';
import { UserState } from '../../core/states/User/userState.service';
import { Buffer } from 'buffer';
import { User } from '../../core/entity/user';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ButtonStyleDirective, ButtonIconComponent, RouterLink],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  private userState = inject(UserState);
  protected photoState: string;

  constructor() {

    effect(() => {
      const photoArrayBlob = this.userState.userSignal()?.photo;
      if (photoArrayBlob != undefined) {
        this.photoState = photoArrayBlob
      } else {
        // pattern photo to load
        this.photoState = "../../../assets/icons/do-utilizador.png"
      }
    })
  }
}
