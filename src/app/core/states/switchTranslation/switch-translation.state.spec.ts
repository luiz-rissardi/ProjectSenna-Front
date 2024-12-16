import { TestBed } from '@angular/core/testing';

import { SwitchTranslationState } from './switch-translation.state';

describe('SwitchTranslationState', () => {
  let service: SwitchTranslationState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchTranslationState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
