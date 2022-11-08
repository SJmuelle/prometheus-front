/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsignarSolicitudesService } from './asignar-solicitudes.service';

describe('Service: AsignarSolicitudes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignarSolicitudesService]
    });
  });

  it('should ...', inject([AsignarSolicitudesService], (service: AsignarSolicitudesService) => {
    expect(service).toBeTruthy();
  }));
});
