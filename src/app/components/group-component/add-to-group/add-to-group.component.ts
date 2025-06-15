import { Component, inject } from '@angular/core';
import { GroupFacade } from '../../../facades/group/group.facade';
import { RouterLink } from '@angular/router';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { GroupNotificationComponent } from "../group-notification/group-notification.component";
import { GroupsState } from '../../../core/states/groups/groups.state';

@Component({
  selector: 'app-add-to-group',
  imports: [RouterLink, ButtonIconDirective, GroupNotificationComponent],
  templateUrl: './add-to-group.component.html',
  styleUrl: './add-to-group.component.scss'
})
export class AddToGroupComponent {
  private groupFacade = inject(GroupFacade);
  protected groupArrayState = inject(GroupsState);

  addUserToGroup() {
    
  }
}