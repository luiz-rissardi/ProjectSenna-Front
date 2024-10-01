import { Component, effect, inject } from '@angular/core';
import { ButtonIconComponent } from '../../button-icon/button-icon.component';
import { Router, RouterLink } from '@angular/router';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { UserFacade } from '../../../../facades/User/user-facade.service';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { UserState } from '../../../../core/states/User/userState.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonIconComponent, RouterLink, ButtonStyleDirective,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  private userFacade = inject(UserFacade);
  private userState = inject(UserState);
  private router = inject(Router)
  protected formGroupLogin:FormGroup;

  constructor(formBuilder:FormBuilder){
    this.formGroupLogin = formBuilder.group({
      email:[],
      password:[]
    })

    effect(()=>{
      // user is valid for use
      if(this.userState.userSignal()?.userId != undefined){
        this.router.navigate(["/home/conversation"])
      }
    })
  }
  
  login(){
    const [email, password] = ["email", "password"].map(el => this.formGroupLogin.get(el).value);
    this.userFacade.login(email,password);
  }

  exec = () => {

  }
}
