import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { UserFacade } from '../../facades/user/user.facade';
import { WarnigComponent } from "../../components/shared/warnig/warnig.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-change-password',
    imports: [WarnigComponent, RouterLink],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  private userFacade = inject(UserFacade);

  public email = input("");
  protected passwordIsVisible = false;
  protected showWarning = false;
  @ViewChild("passwordInput") private passwordInput!: ElementRef;
  

  protected changePassword(password:string){
    if(this.validatePassword(password)){
      this.showWarning = false;
      this.userFacade.changePassword(this.email(),password);
    }else{
      this.showWarning = true;
    }
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

  private validatePassword(password: string): boolean {
    const regexPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regexPasswordPattern.test(password)
  }

}
