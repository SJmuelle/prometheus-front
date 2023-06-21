import { TestBed } from '@angular/core/testing';

import { Sweetalert2Service } from './sweetalert2.service';

describe('Sweetalert2Service', () => {
  let service: Sweetalert2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sweetalert2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
