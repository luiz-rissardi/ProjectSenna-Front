import { TestBed } from '@angular/core/testing';

import { ChatImageZoomState } from './chat-image-zoom';

describe('ChatImageZoomState', () => {
  let service: ChatImageZoomState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatImageZoomState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
