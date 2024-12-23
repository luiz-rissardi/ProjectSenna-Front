import { TestBed } from '@angular/core/testing';

import { GroupFacade } from './group.facade';

describe('GroupFacade', () => {
  let service: GroupFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
