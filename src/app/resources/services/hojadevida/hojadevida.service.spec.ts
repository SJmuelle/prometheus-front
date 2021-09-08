import { TestBed } from '@angular/core/testing';

import { HojadevidaService } from './hojadevida.service';

describe('HojadevidaService', () => {
  let service: HojadevidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HojadevidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
