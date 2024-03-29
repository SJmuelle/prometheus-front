import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReferenciacionClienteService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }
    /**
     * @description: Obtiene la referencia del cliente
     */
    public getReferenciaCliente(numeroSolicitud: string): Observable<any> {
        return this._http.get(`${this._appSettings.referenciaCliente.url.base}/${numeroSolicitud}`);
    }

    public postReferenciacion(data: any): Observable<any> {
        return this._http.post(this._appSettings.referenciaCliente.url.baseReferecia, data);
    }

    public postReprogramarSolicitud(data: any): Observable<any> {
        return this._http.post(this._appSettings.referenciaCliente.url.baseReprogramar, data);
    }

    public putCliente(datos: any): Observable<any> {
        return this._http.post(this._appSettings.referencias.url.baseCliente, datos);
    }

    public putNegocio(datos: any): Observable<any> {
        return this._http.post(this._appSettings.referencias.url.baseNegocio, datos);
    }
}

