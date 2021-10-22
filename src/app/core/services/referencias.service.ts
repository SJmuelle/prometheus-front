import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReferenciasService {
  public seleccionDatosReferencia: BehaviorSubject<{value: any}> = new BehaviorSubject<{value: any}>({value: ''});
  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }

  /**
   * @description: Obtiene el listado de referencias por solicitud
   */
  public getReferencias(codigo: string): Observable<any> {
      return this._http.get(`${this._appSettings.referencias.url.base}/${codigo}`);
  }
  /**
   * @description: Obtiene el detalle de la referencia
   */
  public getDetalleReferencia(datos: any): Observable<any> {
      const {numeroSolicitud, idReferencias, identificacion} = datos;
      return this._http.get(`${this._appSettings.referencias.url.baseDetalle}/${numeroSolicitud}/${idReferencias}/${identificacion}`);
  }
}
