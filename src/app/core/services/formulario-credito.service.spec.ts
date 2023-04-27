import { TestBed } from '@angular/core/testing';

import { FormularioCreditoService } from './formulario-credito.service';

describe('FormularioCreditoService', () => {
  let service: FormularioCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
