import { TestBed } from '@angular/core/testing';

import { DepartamentosCiudadesService } from './departamentos-ciudades.service';

describe('DepartamentosCiudadesService', () => {
  let service: DepartamentosCiudadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentosCiudadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
