import { TestBed } from '@angular/core/testing';

import { GestionPagaduriaService } from './gestion-pagaduria.service';

describe('GestionPagaduriaService', () => {
  let service: GestionPagaduriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPagaduriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
