import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserState } from '../../core/states/User/user.state';
import { ChatFacade } from '../../facades/chat/chat.facade';
import { ResolutionState } from '../../core/states/resolution/resolution.state';

export const fetchFirstConversationsResolver: ResolveFn<null> = (route, state) => {
  const chatFacade = inject(ChatFacade);
  const userState = inject(UserState);
  const resolutionState = inject(ResolutionState);

  const userId = userState.userSignal()?.userId;

  if (userId && !resolutionState.conversationsLoaded()) {
    chatFacade.getChatsOfUser(userId);
    resolutionState.markConversationsLoaded();
  }

  return null;
};
