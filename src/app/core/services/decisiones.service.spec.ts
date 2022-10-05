import { TestBed } from '@angular/core/testing';

import { DecisionesService } from './decisiones.service';

describe('DecisionesService', () => {
  let service: DecisionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
