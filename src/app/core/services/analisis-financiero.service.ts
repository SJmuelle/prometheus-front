import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AnalisisFinancieroService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }
  /**
   * @description:
   */
  public getAnalisis(numeroSolicitud: string): Observable<any> {
    return this._http.get(`${this._appSettings.analisisFinanciero.url.base}/${numeroSolicitud}`);
  }
  /**
   * @description: Guarda el análisis financiero
   */
    public postAnalisisFinanciero(datos: any): Observable<any> {
      return this._http.post(this._appSettings.analisisFinanciero.url.guardado, datos);
    }
}