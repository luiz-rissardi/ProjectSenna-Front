import { TestBed } from '@angular/core/testing';

import { WarningState } from './warning.state';

describe('WarningService', () => {
  let service: WarningState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarningState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
