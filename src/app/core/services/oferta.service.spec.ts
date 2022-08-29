/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfertaService } from './oferta.service';

describe('Service: Oferta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfertaService]
    });
  });

  it('should ...', inject([OfertaService], (service: OfertaService) => {
    expect(service).toBeTruthy();
  }));
});
