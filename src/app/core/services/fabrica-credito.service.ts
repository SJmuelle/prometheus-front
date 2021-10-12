import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettingsService} from '../app-configs/app-settings.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FabricaCreditoService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }

    /**
     * @description: Get datos fabrica Agenda
     */
    public getDatosFabricaAgenda(datos): Observable<any> {
        const {numeroSolicitud, identificacion} = datos;
        return this._http.get(`${this._appSettings.fabricaDatos.url.base}/${numeroSolicitud}/${identificacion}/T`);
    }
}
