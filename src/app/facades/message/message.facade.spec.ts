import { TestBed } from '@angular/core/testing';

import { MessageFacade } from './message.facade';

describe('MessageFacade', () => {
  let service: MessageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
