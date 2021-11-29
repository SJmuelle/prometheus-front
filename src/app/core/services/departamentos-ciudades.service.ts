import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartamentosCiudadesService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }
  /**
   * @description: Obtiene los departamentos
   */
  public getDepartamentos(): Observable<any> {
      return this._http.get(`${this._appSettings.departamentos.url.base}/CO`);
  }
  /**
   * @description: Obtiene las ciudades
   */
  public getCiudades(codigo: string): Observable<any> {
      return this._http.get(`${this._appSettings.ciudades.url.base}/CO/${codigo}`);
  }
  /**
   * @description: Obtiene los barrios
   */
  public getBarrios(codigo: string): Observable<any> {
      return this._http.get(`${this._appSettings.barrios.url.base}/${codigo}`);
  }
}
