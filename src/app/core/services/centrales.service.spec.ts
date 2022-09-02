import { TestBed } from '@angular/core/testing';

import { CentralesService } from './centrales.service';

describe('CentralesService', () => {
  let service: CentralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
