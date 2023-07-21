import { TestBed } from '@angular/core/testing';

import { PagoMasivoService } from './pago-masivo.service';

describe('PagoMasivoService', () => {
  let service: PagoMasivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoMasivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
