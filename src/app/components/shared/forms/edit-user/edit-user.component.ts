import { Component, effect, ElementRef, inject } from '@angular/core';
import { ButtonIconDirective } from '../../../../directives/buttonIcon/button-icon.directive';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { RouterLink } from '@angular/router';
import { UserState } from '../../../../core/states/User/userState.service';
import { User } from '../../../../core/entity/user';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';
import { UserFacade } from '../../../../facades/User/user-facade.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ButtonIconDirective, ButtonStyleDirective, RouterLink, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  private userState = inject(UserState);
  private elRef = inject(ElementRef);
  private userFacade = inject(UserFacade);

  private inputPhoto: HTMLInputElement;
  private detroy = new Subject<void>();
  protected chosenImage: any;
  private chosenImageBlob: any;
  protected formUserUpdate: FormGroup;
  protected userAccount!: User;

  constructor(formBuilder: FormBuilder) {
    this.formUserUpdate = formBuilder.group({
      userName: [],
      userDescription: [],
      photo: [],
      languages: []

    })
    effect(() => {
      this.userAccount = this.userState.userSignal()
      if (this.userAccount != undefined) {
        this.chosenImage = this.userAccount?.photo;
        this.formUserUpdate.get("languages").setValue(this.userAccount?.languages);
        this.formUserUpdate.get("userName").setValue(this.userAccount?.userName);
        this.formUserUpdate.get("userDescription").setValue(this.userAccount?.userDescription);
      }
    })
  }

  ngOnDestroy(): void {
    this.detroy.next();
    this.detroy.complete()
  }

  protected async changePhoto() {
    this.inputPhoto = this.elRef.nativeElement.querySelector('#inputFoto') as HTMLInputElement;
    this.inputPhoto.click();

    if (this.userAccount != undefined && this.userAccount != null) {
      fromEvent(this.inputPhoto, "change").pipe(
        map(e => {
          const file = this.inputPhoto.files[0];
          if (file) {
            this.chosenImageBlob = new Blob([file])
            this.chosenImage = URL.createObjectURL(this.chosenImageBlob);
          }
        }),
        takeUntil(this.detroy)
      ).subscribe()
    }
  }

  save() {
    ["userName", "photo", "languages", "userDescription"].map((key, index) => {
      const value = this.formUserUpdate.get(key).value
      this.userAccount[key] = value;
    });
    this.userAccount.photo = this.chosenImage
    const object:any   = { ...this.userAccount };
    object.arrayBuffer = this.chosenImageBlob;
    this.userFacade.updateUser(object);
  }
}
