import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DOMManipulation } from '../../shared/operators/DomManipulation';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { UserState } from '../../core/states/User/user.state';

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
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker(new URL("../../workers/photo-process.worker", import.meta.url));
        worker.onmessage = ({ data }) => {
          this.userState.userSignal.update(user => {
            user.photo = data
            return user;
          })
        };
        worker.postMessage(this.userState.userSignal().photo);
      }
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
