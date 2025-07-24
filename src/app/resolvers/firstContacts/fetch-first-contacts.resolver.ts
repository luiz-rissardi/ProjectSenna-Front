import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserState } from '../../core/states/User/user.state';
import { ContactFacade } from '../../facades/contact/contact.facade';

let isFisrt = true;

export const fetchFirstContactsResolver: ResolveFn<null> = async (route, state) => {

  const user = inject(UserState).userSignal();
  const contactFacade = inject(ContactFacade);

  const contactId = user?.contactId;
  if (contactId && isFisrt) {
    contactFacade.findContactsOfUser(contactId)
    isFisrt = false
  }
  return null;
};
