import { TestBed } from '@angular/core/testing';

import { AnalisisFinancieroService } from './analisis-financiero.service';

describe('AnalisisFinancieroService', () => {
  let service: AnalisisFinancieroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisFinancieroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
