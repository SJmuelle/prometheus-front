import { TestBed } from '@angular/core/testing';

import { CarteraClientesService } from './cartera-clientes.service';

describe('CarteraClientesService', () => {
  let service: CarteraClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteraClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
