import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserState } from '../../core/states/User/user.state';
import { ContactFacade } from '../../facades/contact/contact.facade';
import { ResolutionState } from '../../core/states/resolution/resolution.state';

export const fetchFirstContactsResolver: ResolveFn<null> = (route, state) => {
  const user = inject(UserState).userSignal();
  const contactFacade = inject(ContactFacade);
  const resolutionState = inject(ResolutionState);

  const contactId = user?.contactId;

  if (contactId && !resolutionState.contactsLoaded()) {
    contactFacade.findContactsOfUser(contactId);
    resolutionState.markContactsLoaded();
  }

  return null;
};
