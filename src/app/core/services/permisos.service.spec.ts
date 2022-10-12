/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermisosService } from './permisos.service';

describe('Service: Permisos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermisosService]
    });
  });

  it('should ...', inject([PermisosService], (service: PermisosService) => {
    expect(service).toBeTruthy();
  }));
});
