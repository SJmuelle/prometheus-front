import { TestBed } from '@angular/core/testing';

import { PoliticasService } from './politicas.service';

describe('PoliticasService', () => {
  let service: PoliticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
