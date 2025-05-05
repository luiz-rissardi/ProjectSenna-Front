import { Component, inject } from '@angular/core';
import { GroupsState } from '../../../core/states/groups/groups.state';
import { GroupNotificationComponent } from '../group-notification/group-notification.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [GroupNotificationComponent,RouterLink],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  
  protected groupArrayState = inject(GroupsState)
}
