import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFacade } from '../../facades/User/user-facade.service';
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
