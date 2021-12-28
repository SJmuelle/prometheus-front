import { TestBed } from '@angular/core/testing';

import { AgendaReferenciacionService } from './agenda-referenciacion.service';

describe('AgendaReferenciacionService', () => {
  let service: AgendaReferenciacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaReferenciacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
