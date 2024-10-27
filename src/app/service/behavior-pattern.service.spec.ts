import { TestBed } from '@angular/core/testing';

import { BehaviorPatternService } from './behavior-pattern.service';

describe('BehaviorPatternService', () => {
  let service: BehaviorPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviorPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
