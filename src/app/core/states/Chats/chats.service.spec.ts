import { TestBed } from '@angular/core/testing';

import { ChatArrayState } from './chats.service';

describe('ChatArrayState', () => {
  let service: ChatArrayState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatArrayState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
