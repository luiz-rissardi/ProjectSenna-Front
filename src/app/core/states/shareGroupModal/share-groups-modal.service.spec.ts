import { TestBed } from '@angular/core/testing';

import { ShareGroupsModalState } from './share-groups-modal.service';

describe('ShareGroupsModalState', () => {
  let service: ShareGroupsModalState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareGroupsModalState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
