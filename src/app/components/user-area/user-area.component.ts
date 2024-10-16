import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DOMManipulation } from '../../shared/DomManipulation';
import { ButtonIconDirective } from '../../directives/buttonIcon/button-icon.directive';
import { ButtonIconComponent } from '../shared/button-icon/button-icon.component';
import { UserState } from '../../core/states/User/userState.service';

@Component({
  selector: 'app-user-area',
  standalone: true,
  imports: [RouterLink, NgbTooltipModule, ButtonIconDirective, ButtonIconComponent],
  templateUrl: './user-area.component.html',
  styleUrl: './user-area.component.scss',
})
export class UserAreaComponent extends DOMManipulation {

  protected userState = inject(UserState);

  constructor() {
    super();
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
