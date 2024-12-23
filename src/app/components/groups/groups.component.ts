import { Component, inject } from '@angular/core';
import { GroupsState } from '../../core/states/groups/groups.state';
import { GroupNotificationComponent } from '../shared/group-notification/group-notification.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [GroupNotificationComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  
  protected groupArrayState = inject(GroupsState)
}
