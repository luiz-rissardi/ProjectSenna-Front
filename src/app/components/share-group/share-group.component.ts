import { Component, inject, effect, viewChild, ElementRef, ViewChild } from '@angular/core';
import { ShareGroupsModalState } from '../../core/states/shareGroupModal/share-groups-modal.service';
import { ContactsState } from '../../core/states/contacts/contacts.state';
import { ButtonIconComponent } from "../shared/button-icon/button-icon.component";
import { ButtonStyleDirective } from '../../directives/buttonStyle/button-style.directive';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-share-group',
  imports: [ButtonIconComponent, ButtonStyleDirective],
  templateUrl: './share-group.component.html',
  styleUrl: './share-group.component.scss'
})
export class ShareGroupComponent {
  protected shareGroupState = inject(ShareGroupsModalState);
  protected contactsState = inject(ContactsState);
  @ViewChild('modalShareGroup', { static: false }) private modalShareGroup: ElementRef;

  constructor() {

    fromEvent(document, "click")
      .subscribe((event: Event) => {
        const el = event.target as HTMLElement;
        if (
          this.modalShareGroup?.nativeElement.contains(el) == false) {
          this.shareGroupState.shareGroupState.set(false);
        }
      })

    effect(() => {

      if (this.contactsState.contactSignal() != null) {
        for (let contact of this.contactsState.contactSignal()) {
          const worker = new Worker(new URL("../../workers/photo-process.worker", import.meta.url));
          worker.onmessage = ({ data }) => {
            contact.photo = data
          };
          worker.postMessage(contact.photo);
        }
      }
    })
  }

  protected invite() {

  }

}
