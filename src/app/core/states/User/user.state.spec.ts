import { TestBed } from '@angular/core/testing';

import { UserState } from './user.state';

describe('UserState', () => {
  let service: UserState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
