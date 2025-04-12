import { TestBed } from '@angular/core/testing';

import { ChatImageZoomService } from './chat-image-zoom.service';

describe('ChatImageZoomService', () => {
  let service: ChatImageZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatImageZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
