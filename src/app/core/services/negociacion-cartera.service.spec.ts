import { TestBed } from '@angular/core/testing';

import { NegociacionCarteraService } from './negociacion-cartera.service';

describe('NegociacionCarteraService', () => {
  let service: NegociacionCarteraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegociacionCarteraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
