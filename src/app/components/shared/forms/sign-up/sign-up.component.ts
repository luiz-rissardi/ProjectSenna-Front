import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fromEvent, map } from "rxjs"
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFacade } from '../../../../facades/User/user-facade.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ButtonStyleDirective, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  private elRef = inject(ElementRef)
  private userFacade = inject(UserFacade)
  private inputPhoto: HTMLInputElement;
  private chosenImage: HTMLImageElement;
  private UserData: any = { arrayBuffer: null };
  protected spans = [false, false, false, false, false];
  protected level: number = 1;
  protected passwordIsVisible = false;
  protected formGroupCreate: FormGroup;

  @ViewChild("passwordInput") private passwordInput!: ElementRef;
  @ViewChild("confirmedPassword") private confirmedPassword!: ElementRef;

  constructor(formBuilder: FormBuilder) {
    this.formGroupCreate = formBuilder.group({
      email: [""],
      password: [""],
      confirmedPassword: [""],
      userName: [""],
      description: [""],
      lang: [""],
    })
  }


  protected toggleVisiblePassword() {
    this.passwordIsVisible = !this.passwordIsVisible;

    // show
    if (this.passwordIsVisible) {
      this.passwordInput.nativeElement.type = "text"
      this.confirmedPassword.nativeElement.type = "text"
    } else {
      this.passwordInput.nativeElement.type = "password"
      this.confirmedPassword.nativeElement.type = "password"
    }
  }

  protected next() {
    const [userName, email, password, confirmedPassword] = ["userName", "email", "password", "confirmedPassword"].map((el, index) => {
      const value = this.formGroupCreate.get(el).value;

      if (value == "") {
        this.spans[index] = true;
      } else {
        this.spans[index] = false;
      }
      return value
    });

    if (this.validateEmail(email) == false) {
      this.spans[1] = true
    }
    
    if (this.validatePassword(password) == false) {
      this.spans[2] = true
    }

    if (password != confirmedPassword) {
      this.spans[3] = true;
    }

    this.UserData.email = email
    this.UserData.password = password
    this.UserData.userName = userName

    if (this.spans.includes(true) == false) {
      this.level = 2;
    }
  }

  protected createUser() {
    const [description, lang] = ["description", "lang"].map((el) => {
      const value = this.formGroupCreate.get(el).value
      return value
    });

    this.UserData.description = description;
    this.UserData.lang = lang;

    if (lang == "") {
      this.spans[4] = true
    } else {
      this.spans[4] = false
    }

    if (this.spans.includes(true) == false) {
      this.userFacade.createUser(
        this.UserData.userName,
        this.UserData.description,
        this.UserData.email,
        this.UserData.arrayBuffer,
        this.UserData.lang,
        this.UserData.password,
      )
    }

  }

  protected async changePhoto() {
    this.inputPhoto = this.elRef.nativeElement.querySelector('#inputFoto') as HTMLInputElement;
    this.chosenImage = this.elRef.nativeElement.querySelector('#chosenImage') as HTMLImageElement;
    this.inputPhoto.click();

    fromEvent(this.inputPhoto, "change").pipe(
      map(e => {
        const file = this.inputPhoto.files[0];
        if (file) {
          const blob = new Blob([file])
          const urlImage = URL.createObjectURL(blob);
          this.UserData.arrayBuffer = blob;
          this.chosenImage.src = urlImage;
        }
      })
    ).subscribe()
  }

  private validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  private validatePassword(password: string): boolean {
    const regexPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regexPasswordPattern.test(password)
  }

}


