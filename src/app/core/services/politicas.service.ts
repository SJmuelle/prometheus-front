import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PoliticasService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }
  /**
   * @description:
   */
  public getPoliticas(numeroSolicitud: string): Observable<any> {
      return this._http.get(`${this._appSettings.politicas.url.base}/${numeroSolicitud}`);
  }

  public guardarExcepcionCredito(datos: any){
    return this._http.post(this._appSettings.politicas.url.guardarExcepcion,datos);
  }

  /**
   * @description:
   * Corre el motor de excepciones en la vista de politicas luego de entrar a "Excepción de créditos"
   */

  public correrMotorlExcepcionPolitica(datos: any){
    return this._http.post(this._appSettings.politicas.url.correrMotorExcepciones,datos);
  }

}
