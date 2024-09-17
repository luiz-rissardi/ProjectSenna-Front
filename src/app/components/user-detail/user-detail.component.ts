import { Component, effect, WritableSignal } from '@angular/core';
import { UserDetail, UserDetailState } from '../../core/states/userDetail/user-detail.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  protected userDetailSignal: WritableSignal<UserDetail>;
  constructor(private userDetailState:UserDetailState){
    this.userDetailSignal = this.userDetailState.userDetailSignal
  }
}
