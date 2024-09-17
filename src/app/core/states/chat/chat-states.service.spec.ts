import { TestBed } from '@angular/core/testing';

import { ChatStatesService } from './chat-states.service';

describe('ChatStatesService', () => {
  let service: ChatStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
