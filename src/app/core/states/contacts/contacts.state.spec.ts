import { TestBed } from '@angular/core/testing';

import { ContactsState } from './contacts.state';

describe('ContactsState', () => {
  let service: ContactsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
