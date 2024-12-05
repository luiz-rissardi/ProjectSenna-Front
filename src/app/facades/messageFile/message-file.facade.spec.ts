import { TestBed } from '@angular/core/testing';

import { MessageFileFacade } from './message-file.facade';

describe('MessageFileFacade', () => {
  let service: MessageFileFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFileFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
