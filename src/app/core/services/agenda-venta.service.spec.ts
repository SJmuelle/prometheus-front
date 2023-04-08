import { TestBed } from '@angular/core/testing';

import { AgendaVentaService } from './agenda-venta.service';

describe('AgendaVentaService', () => {
  let service: AgendaVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
