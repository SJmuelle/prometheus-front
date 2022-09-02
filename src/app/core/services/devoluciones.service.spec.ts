import { TestBed } from '@angular/core/testing';

import { DevolucionesService } from './devoluciones.service';

describe('DevolucionesService', () => {
  let service: DevolucionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevolucionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
