import { Component, inject, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonIconDirective } from '../../directives/buttonIcon/button-icon.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-account',
  imports: [ButtonIconDirective, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  private modalService = inject(NgbModal);

  protected openModal(templateRef: TemplateRef<any>) {
    this.modalService.open(templateRef);
  }
}
