import { TestBed } from '@angular/core/testing';

import { ConductoresService } from './conductores.service';

describe('ConductoresService', () => {
  let service: ConductoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
