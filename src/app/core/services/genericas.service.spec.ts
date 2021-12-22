import { TestBed } from '@angular/core/testing';

import { GenericasService } from './genericas.service';

describe('GenericasService', () => {
  let service: GenericasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
