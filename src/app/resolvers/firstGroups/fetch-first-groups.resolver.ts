import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserState } from '../../core/states/User/user.state';
import { GroupFacade } from '../../facades/group/group.facade';

let isFisrt = true;

export const fetchFirstGroupsResolver: ResolveFn<null> = (route, state) => {
  const userId = inject(UserState).userSignal()?.userId;
  const groupFacade = inject(GroupFacade);
  
  if(userId && isFisrt){
    groupFacade.getGroups(userId)
    isFisrt = false;
  }

  return null;
};
