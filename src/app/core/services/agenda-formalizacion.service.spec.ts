import { TestBed } from '@angular/core/testing';

import { AgendaFormalizacionService } from './agenda-formalizacion.service';

describe('AgendaCompletacionService', () => {
  let service: AgendaFormalizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaFormalizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
