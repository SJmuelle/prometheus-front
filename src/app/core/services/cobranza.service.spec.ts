import { TestBed } from '@angular/core/testing';

import { CobranzaService } from './cobranza.service';

describe('CobranzaService', () => {
  let service: CobranzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobranzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
