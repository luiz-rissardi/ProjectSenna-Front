import { TestBed } from '@angular/core/testing';

import { MessageFileService } from './message-file.service';

describe('MessageFileService', () => {
  let service: MessageFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
