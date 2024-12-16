import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonIconDirective } from '../../directives/buttonIcon/button-icon.directive';
import { UserState } from '../../core/states/User/user.state';
import { UserFacade } from '../../facades/user/user.facade';

@Component({
    selector: 'app-privacy',
    imports: [RouterLink, ButtonIconDirective],
    templateUrl: './privacy.component.html',
    styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

  protected userState = inject(UserState);
  private userFacade = inject(UserFacade);

  changeMarkReadConfirmation(){
    const readMessages = !this.userState.userSignal().readMessages;
    this.userState.userSignal.update(user => {
      user.readMessages = readMessages;
      return user;
    })
    this.userFacade.updateUser(this.userState.userSignal())
  }
}
