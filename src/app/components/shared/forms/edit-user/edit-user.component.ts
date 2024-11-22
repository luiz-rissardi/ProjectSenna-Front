import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { ButtonIconDirective } from '../../../../directives/buttonIcon/button-icon.directive';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { RouterLink } from '@angular/router';
import { UserState } from '../../../../core/states/User/user.state';
import { User } from '../../../../interfaces/user';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';
import { UserFacade } from '../../../../facades/user/user.facade';
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

  @ViewChild("buttonImage") private buttonImage: ElementRef<any>

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
        if (this.userAccount?.photo?.type == "Buffer") {
          const worker = new Worker(new URL("../../../../workers/photo-process.worker", import.meta.url));
          worker.onmessage = ({ data }) => {
            this.chosenImage = data;
          };
          worker.postMessage(this.userState.userSignal().photo);
        }else{
          this.chosenImage = this.userAccount?.photo;
        }
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
    const object: any = { ...this.userAccount };
    if (this.chosenImageBlob) {
      object.arrayBuffer = this.chosenImageBlob;
    }
    this.userFacade.updateUser(object);
  }

  loadAlternativeImage() {
    this.buttonImage.nativeElement.src = "../../../../assets/icons/do-utilizador.png"
  }
}
