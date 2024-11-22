import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { fromEvent, map, Subject, takeUntil } from "rxjs"
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFacade } from '../../../../facades/user/user.facade';
import { UserState } from '../../../../core/states/User/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink, ButtonStyleDirective, ReactiveFormsModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnDestroy {
  private elRef = inject(ElementRef);
  private userFacade = inject(UserFacade);
  private modalService = inject(NgbModal);
  private userState = inject(UserState);
  private router = inject(Router);
  private inputPhoto: HTMLInputElement;
  private chosenImage: HTMLImageElement;
  private UserData: any = { };
  protected spans = [false, false, false, false, false];
  protected level: number = 1;
  private detroy = new Subject<void>();
  protected passwordIsVisible = false;
  protected formGroupCreate: FormGroup;

  @ViewChild("passwordInput") private passwordInput!: ElementRef;
  @ViewChild("content") private contentModal!: ElementRef;
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

    effect(() => {
      if( this.userState.userSignal() != null){
        this.router.navigate(["/home/conversation"])
      }
    })
  }

  ngOnDestroy(): void {
    this.detroy.next();
    this.detroy.complete()
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
      this.modalService.open(this.contentModal)
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
      }),
      takeUntil(this.detroy)
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


