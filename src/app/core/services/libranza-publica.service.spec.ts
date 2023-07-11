import { TestBed } from '@angular/core/testing';

import { LibranzaPublicaService } from './libranza-publica.service';

describe('LibranzaPublicaService', () => {
  let service: LibranzaPublicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibranzaPublicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
