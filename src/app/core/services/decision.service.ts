import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DecisionService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }
  /**
   *@description: Obtiene el listado de opciones
   */
  public getOpciones(): Observable<any> {
    return this._http.get(this._appSettings.decision.url.base);
  }
  /**
   * @description: Guarda la decision
   */
  public postDecision(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.baseDecision, data);
  }
  /**
 * @description:post de cmabio de estado
 */
  public postCambioEstado(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.cambioEstado, data);
  }

  /**
  * @description:post de validacion Datos
  */
  public postValidacionDatos(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.validaCampos, data);
  }

  /**
   * @description: Obtiene el listado de causales
   */
  public getCausales(): Observable<any> {
    return this._http.get(this._appSettings.decision.url.baseCausal);
  }

}
