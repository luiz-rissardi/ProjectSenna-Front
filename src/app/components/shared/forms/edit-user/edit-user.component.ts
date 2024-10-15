import { Component, effect, ElementRef, inject } from '@angular/core';
import { ButtonIconDirective } from '../../../../directives/buttonIcon/button-icon.directive';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { RouterLink } from '@angular/router';
import { UserState } from '../../../../core/states/User/userState.service';
import { User } from '../../../../core/entity/user';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ButtonIconDirective, ButtonStyleDirective, RouterLink],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  private userState = inject(UserState);
  private elRef = inject(ElementRef);
  protected userAccount!: User
  private inputPhoto: HTMLInputElement;
  private chosenImage: HTMLImageElement;
  private detroy = new Subject<void>();

  constructor() {
    effect(() => {
      this.userAccount = this.userState.userSignal()
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
            const blob = new Blob([file])
            const urlImage = URL.createObjectURL(blob);
            this.userAccount.photo = urlImage;
          }
        }),
        takeUntil(this.detroy)
      ).subscribe()
    }
  }
}
