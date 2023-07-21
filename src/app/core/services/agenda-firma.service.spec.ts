import { TestBed } from '@angular/core/testing';

import { AgendaFirmaService } from './agenda-firma.service';

describe('AgendaFirmaService', () => {
  let service: AgendaFirmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaFirmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
