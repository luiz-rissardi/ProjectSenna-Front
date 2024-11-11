import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { UserFacade } from '../../facades/User/user-facade.service';
import { WarnigComponent } from "../../components/shared/warnig/warnig.component";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [WarnigComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  private userFacade = inject(UserFacade);

  public email = input("");
  protected passwordIsVisible = false;
  @ViewChild("passwordInput") private passwordInput!: ElementRef;
  

  protected changePassword(password:string){
    this.userFacade.changePassword(this.email(),password);
  }

  protected toggleVisiblePassword() {
    this.passwordIsVisible = !this.passwordIsVisible;
    // show
    if(this.passwordIsVisible){
      this.passwordInput.nativeElement.type = "text"
    }else{
      this.passwordInput.nativeElement.type = "password"
    }
  }
}
