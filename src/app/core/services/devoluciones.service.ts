import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService) { }

  /**
 * @description: Obtiene las devoluciones
 */
  public getDevoluciones(agenda: string,numeroSolucitud: String): Observable<any> {
    return this._http.get(`${this._appSettings.devoluciones.url.baseDevolucion}/${agenda}/${numeroSolucitud}`);
  }
  /**
   * @description: Crea una devolucion
   */
  public postDevoluciones(datos: any): Observable<any> {
    return this._http.post(this._appSettings.devoluciones.url.baseDevolucionCrear, datos);
  }
  /**
   * @description: Causales de devoluciones
   */
     public getCausalesDevoluciones(agenda: String,numeroSolucitud: String): Observable<any> {
      return this._http.get(`${this._appSettings.devoluciones.url.baseDevolucionCausal}/${agenda}/${numeroSolucitud}`);
    }
}
