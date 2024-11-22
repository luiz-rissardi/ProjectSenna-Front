import { TestBed } from '@angular/core/testing';

import { ContactFacade } from './contact.facade';

describe('ContactFacade', () => {
  let service: ContactFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
