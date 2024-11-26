import { TestBed } from '@angular/core/testing';

import { MessagesState } from './messages.state';

describe('MessagesState', () => {
  let service: MessagesState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
