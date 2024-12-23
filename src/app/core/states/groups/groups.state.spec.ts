import { TestBed } from '@angular/core/testing';

import { GroupsState } from './groups.state';

describe('GroupsState', () => {
  let service: GroupsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
