import { TestBed } from '@angular/core/testing';

import { EnergySourceService } from './energy-source.service';

describe('EnergySourceService', () => {
  let service: EnergySourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergySourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
