import { TestBed } from '@angular/core/testing';

import { CajaVirtualService } from './caja-virtual.service';

describe('CajaVirtualService', () => {
  let service: CajaVirtualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaVirtualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
