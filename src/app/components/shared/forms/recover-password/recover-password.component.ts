import { AfterViewInit, Component, ElementRef, OnDestroy, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../../../../core/services/email/email.service';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-recover-password',
    imports: [ButtonStyleDirective, RouterLink, RouterModule],
    templateUrl: './recover-password.component.html',
    styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent implements AfterViewInit, OnDestroy {
  
  private modalService = inject(NgbModal);
  private emailService = inject(EmailService);
  protected email = signal("");
  private destroy = new Subject<void>();
  @ViewChild("email") private emailInput: ElementRef<any>;
  
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  
  ngAfterViewInit(): void {
    fromEvent(this.emailInput.nativeElement, "change")
      .pipe(
        map((e: any) => {
          this.email.set(e.target.value)
        }),
        takeUntil(this.destroy)
      ).subscribe();
}

  protected recoverPassword(content: TemplateRef<any>) {
  this.modalService.open(content)
  this.emailService.sendChangePasswordEmail(this.email());
}
}

