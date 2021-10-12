import { TestBed } from '@angular/core/testing';

import { AgendaCompletacionService } from './agenda-completacion.service';

describe('AgendaCompletacionService', () => {
  let service: AgendaCompletacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaCompletacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
