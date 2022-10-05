import { TestBed } from '@angular/core/testing';

import { AgendaComercialService } from './agenda-comercial.service';

describe('AgendaComercialService', () => {
  let service: AgendaComercialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaComercialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
