import { TestBed } from '@angular/core/testing';

import { EnergyStorageService } from './energy-storage.service';

describe('EnergyStorageService', () => {
  let service: EnergyStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
