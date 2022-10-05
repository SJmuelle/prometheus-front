/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListadoCarteraService } from './listadoCartera.service';

describe('Service: ListadoCartera', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListadoCarteraService]
    });
  });

  it('should ...', inject([ListadoCarteraService], (service: ListadoCarteraService) => {
    expect(service).toBeTruthy();
  }));
});
