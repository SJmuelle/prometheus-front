import { TestBed } from '@angular/core/testing';

import { ConsultaNegociacionesCarteraService } from './consulta-negociaciones-cartera.service';

describe('ConsultaNegociacionesCarteraService', () => {
  let service: ConsultaNegociacionesCarteraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaNegociacionesCarteraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
