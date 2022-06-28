import { TestBed } from '@angular/core/testing';

import { PagaduriaService } from './pagaduria.service';

describe('PagaduriaService', () => {
  let service: PagaduriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagaduriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
