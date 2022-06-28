import { TestBed } from '@angular/core/testing';

import { ReferenciacionClienteService } from './referenciacion-cliente.service';

describe('ReferenciacionClienteService', () => {
  let service: ReferenciacionClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenciacionClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
