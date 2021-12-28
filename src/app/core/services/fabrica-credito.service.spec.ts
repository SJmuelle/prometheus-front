import { TestBed } from '@angular/core/testing';

import { FabricaCreditoService } from './fabrica-credito.service';

describe('FabricaCreditoService', () => {
  let service: FabricaCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricaCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
