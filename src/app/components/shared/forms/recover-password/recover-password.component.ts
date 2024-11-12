import { Component, TemplateRef, inject } from '@angular/core';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ButtonStyleDirective, RouterLink,RouterModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent {

  private modalService = inject(NgbModal);

  protected recoverPassword(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
