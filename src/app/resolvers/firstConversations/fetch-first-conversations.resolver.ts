import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserState } from '../../core/states/User/user.state';
import { ChatFacade } from '../../facades/chat/chat.facade';

let isFisrt = true;

export const fetchFirstConversationsResolver: ResolveFn<null> = (route, state) => {
  const chatFacade = inject(ChatFacade);
  const userState = inject(UserState).userSignal();

  const userId = userState?.userId;
  if (userId && isFisrt) {
    chatFacade.getChatsOfUser(userId)
    isFisrt = false;
  }

  return null

};
