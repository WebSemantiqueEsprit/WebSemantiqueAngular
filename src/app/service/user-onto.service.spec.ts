import { TestBed } from '@angular/core/testing';

import { UserOntoService } from './user-onto.service';

describe('UserOntoService', () => {
  let service: UserOntoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOntoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
