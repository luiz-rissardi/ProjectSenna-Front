import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFacade } from '../../facades/user/user.facade';
import { WarnigComponent } from "../../components/shared/warnig/warnig.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, WarnigComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  

}
