import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DOMManipulation } from '../../shared/operators/DomManipulation';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { UserState } from '../../core/states/User/user.state';
import { BufferToUrl } from '../../workers/teste';

@Component({
  selector: 'app-user-area',
  imports: [RouterLink, NgbTooltipModule, ButtonIconComponent],
  templateUrl: './user-area.component.html',
  styleUrl: './user-area.component.scss'
})
export class UserAreaComponent extends DOMManipulation {

  protected userState = inject(UserState);



  constructor() {
    super();

    effect(() => {
      const urlImage = BufferToUrl(this.userState.userSignal().photo)
      this.userState.userSignal.update(user => {
        user.photo = urlImage
        return user;
      })
    })
  }

  selectSection(elementRef: Event) {
    const element = elementRef.currentTarget as HTMLElement
    const buttons = this.getElementsByClass("session")
    buttons.forEach((el: HTMLButtonElement) => {
      this.removeClassToElement(el, "active")
    })
    this.addClassToElement(element, "active");
  }
}