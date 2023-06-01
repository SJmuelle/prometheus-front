import { TestBed } from '@angular/core/testing';

import { ProntoPagoService } from './pronto-pago.service';

describe('ProntoPagoService', () => {
  let service: ProntoPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProntoPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
