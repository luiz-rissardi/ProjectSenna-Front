import { TestBed } from '@angular/core/testing';

import { UserDetailState } from './user-detail.state';

describe('UserDetailState', () => {
  let service: UserDetailState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
