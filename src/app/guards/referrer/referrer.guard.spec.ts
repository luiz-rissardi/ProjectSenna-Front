import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { referrerGuard } from './referrer.guard';

describe('referrerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => referrerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
