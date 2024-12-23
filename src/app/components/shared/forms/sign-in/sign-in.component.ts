import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { UserFacade } from '../../../../facades/user/user.facade';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { UserState } from '../../../../core/states/User/user.state';


@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, ButtonStyleDirective, ReactiveFormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent{

  private userFacade = inject(UserFacade);
  private userState = inject(UserState);
  private router = inject(Router)
  protected formGroupLogin: FormGroup;

  protected spans = [false, false];
  protected passwordIsVisible = false;
  
  @ViewChild("passwordInput") private passwordInput!: ElementRef;

  constructor(formBuilder: FormBuilder) {

    this.formGroupLogin = formBuilder.group({
      email: [""],
      password: [""]
    })


    effect(() => {
      // user is valid for use
      if (this.userState.userSignal()?.userId != undefined) {
        this.router.navigate(["/home/conversation"])
      }
    })
  }

  protected login() {
    const [email, password] = ["email", "password"].map((el, index) => {
      const value = this.formGroupLogin.get(el).value
      if (value == "") {
        this.spans[index] = true;
      }else{
        this.spans[index] = false;
      }
      return value
    });

    if (this.spans.includes(true) == false) {
      this.userFacade.login(email, password);
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
}
