import { TestBed } from '@angular/core/testing';

import { ChatFacade } from './chat.service';

describe('ChatFacade', () => {
  let service: ChatFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
