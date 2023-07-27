import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockAppSettingsService {
  formulario = {
    url: {
      latitudLongitud: 'mock/latitudLongitud',
      validarOTP: 'mock/validarOTP',
      solicitarGenerarOTP: 'mock/solicitarGenerarOTP',
      microcredito: 'mock/microcredito',
      gurdadoPreSolicitud: 'mock/gurdadoPreSolicitud',
      cargueInicial: 'mock/cargueInicial',
      cargueActividadEconomica: 'mock/cargueActividadEconomica',
      cargueSolicitudesFormularioSimulaciones: 'mock/cargueSolicitudesFormularioSimulaciones',
      listarCiudadesMicro: 'mock/listarCiudadesMicro',
      listarBarriosMicro: 'mock/listarBarriosMicro',
      nombreAsesorMicro: 'mock/nombreAsesorMicro',
      validationPlazoMicro: 'mock/validationPlazoMicro',
    },
  };

  getSalarioBasico(data){
    const mockedResponse = {
        data: {
          // Add your desired mocked data here
          salarioMinimo: 1100000
        }
      };

       // Return an observable that emits the mocked response
       return of(mockedResponse);
  }

  // Add other mock configurations as needed
}
