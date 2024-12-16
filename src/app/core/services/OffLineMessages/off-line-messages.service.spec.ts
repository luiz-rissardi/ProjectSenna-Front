import { TestBed } from '@angular/core/testing';

import { OffLineMessagesService } from './off-line-messages.service';

describe('OffLineMessagesService', () => {
  let service: OffLineMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffLineMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
