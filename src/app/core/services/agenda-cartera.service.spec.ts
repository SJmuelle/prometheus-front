/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgendaCarteraService } from './agenda-cartera.service';

describe('Service: AgendaCartera', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendaCarteraService]
    });
  });

  it('should ...', inject([AgendaCarteraService], (service: AgendaCarteraService) => {
    expect(service).toBeTruthy();
  }));
});
