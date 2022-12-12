import { TestBed } from '@angular/core/testing';

import { TrasladoService } from './traslado.service';

describe('TrasladoService', () => {
  let service: TrasladoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrasladoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
