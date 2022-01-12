import { TestBed } from '@angular/core/testing';

import { CuentasxcobrarService } from './cuentasxcobrar.service';

describe('CuentasxcobrarService', () => {
  let service: CuentasxcobrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasxcobrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
