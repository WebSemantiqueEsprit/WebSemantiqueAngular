import { TestBed } from '@angular/core/testing';

import { ConnsamationEnergieService } from './connsamation-energie.service';

describe('ConnsamationEnergieService', () => {
  let service: ConnsamationEnergieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnsamationEnergieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
