import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserState } from '../../core/states/User/user.state';
import { GroupFacade } from '../../facades/group/group.facade';
import { ResolutionState } from '../../core/states/resolution/resolution.state';

export const fetchFirstGroupsResolver: ResolveFn<null> = (route, state) => {
  const userId = inject(UserState).userSignal()?.userId;
  const groupFacade = inject(GroupFacade);
  const resolutionState = inject(ResolutionState);

  if (userId && !resolutionState.groupsLoaded()) {
    groupFacade.getGroups(userId);
    resolutionState.markGroupsLoaded();
  }

  return null;
};
