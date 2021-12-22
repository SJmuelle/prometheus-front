import { TestBed } from '@angular/core/testing';

import { DocumentosAdjuntosService } from './documentos-adjuntos.service';

describe('DocumentosAdjuntosService', () => {
  let service: DocumentosAdjuntosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosAdjuntosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
