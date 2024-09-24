import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { UserDetail, UserDetailState } from '../../core/states/userDetail/user-detail.service';
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ ButtonStyleDirective ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {

  protected userDetailSignal: WritableSignal<UserDetail>;
  constructor(private userDetailState:UserDetailState){
    this.userDetailSignal = this.userDetailState.userDetailSignal
  }

  closeDetails(){
    this.userDetailSignal.update(current => {
      current.data = undefined;
      return current;
    })

    const idtime = setTimeout(() => {
      this.userDetailSignal.set(null);
      clearTimeout(idtime);
    }, 100);
  }
}
