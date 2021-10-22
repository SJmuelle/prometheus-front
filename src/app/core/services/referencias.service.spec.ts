import { TestBed } from '@angular/core/testing';

import { ReferenciasService } from './referencias.service';

describe('ReferenciasService', () => {
  let service: ReferenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
