import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ConductoresService {

  public seleccionDatosConductores: BehaviorSubject<{ value: any; show: boolean }> = new BehaviorSubject<{ value: any; show: boolean }>({ value: '', show: false });
  public eventos$: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }


  /**
 * @description: Obtiene el listado de Conductoress por solicitud
 */
  public getConductores(codigo: string): Observable<any> {
    return this._http.get(`${this._appSettings.conductores.url.base}/${codigo}`);
  }
//   /**
//  * @description: Obtiene el detalle de la referencia
//  */
//   public getDetalleConductores(datos: any): Observable<any> {
//     const { numeroSolicitud, idReferencias, identificacion } = datos;
//     return this._http.get(`${this._appSettings.referencias.url.baseDetalle}/${numeroSolicitud}/${idReferencias}/${identificacion}`);
//   }

  /**
   * @description: Guarda una Conductores
   */
  public postConductores(datos: any): Observable<any> {
    return this._http.post(this._appSettings.conductores.url.baseConductoresCrear, datos);
  }
  /**
   * @description: Actualiza la Conductores
   */
  public putDetalleConductores(datos: any): Observable<any> {
    return this._http.post(this._appSettings.conductores.url.baseConductores, datos);
  }


}
