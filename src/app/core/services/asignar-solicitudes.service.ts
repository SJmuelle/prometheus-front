import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettingsService} from '../app-configs/app-settings.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsignarSolicitudesService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   * @description: Obtiene listado de solicitudes
   */
   public getSolicitudes(datos: any): Observable<any> {
    return this._http.post(this._appSettings.asignacion.url.base, datos);
  }

  /**
   * @description: Obtiene listado de asesores
   */
   public getAsesores(): Observable<any> {
    return this._http.get(this._appSettings.asignacion.url.baseAsesor);
  }
 
  /**
   * @description: Agrega asesores a las solicitudes
   */
   public postAsesores(data:any): Observable<any> {
    return this._http.post(this._appSettings.asignacion.url.guardarAsesor, data);
  }

  /**
   * @description: Actualiza asesores a las solicitudes
   */
   public updateAsesores(data:any): Observable<any> {
    return this._http.post(this._appSettings.asignacion.url.actualizarAsesor, data);
  }
}
