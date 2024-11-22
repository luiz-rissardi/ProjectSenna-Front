import { TestBed } from '@angular/core/testing';

import { ChatState } from './chat.state';

describe('ChatState', () => {
  let service: ChatState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
