import { TestBed } from '@angular/core/testing';

import { ExcepcionCreditoService } from './excepcion-credito.service';

describe('ExcepcionCreditoService', () => {
  let service: ExcepcionCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcepcionCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
