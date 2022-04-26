import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PagaduriaService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   * @description: Obtiene listado de solicitudes
   */
  public getSolicitudes(): Observable<any> {
    return this._http.get(this._appSettings.pagaduria.url.base)
  }

  /**
   * @description: Obtiene listado de solicitudes segun el tipo
   */
  public getSolicitudesFilter(tipo:any, estado:any): Observable<any> {
    return this._http.get(`${this._appSettings.pagaduria.url.baseSoli}/${tipo}/${estado}`)
  }

  /**
   * @description: Obtiene listado de obligaciones
   */
  public getObligaciones(numero:any): Observable<any> {
    return this._http.get(`${this._appSettings.pagaduria.url.baseObli}/${numero}`)
  }

  public UpdateSolicitud(datos: any): Observable<any> {
    return this._http.post(this._appSettings.pagaduria.url.baseUpdate, datos);
  }

  public descargarArchivos(data: any): Observable<any> {
    console.log(data)
    // debugger;
    return this._http.get(`${this._appSettings.pagaduria.url.baseArchivo}/${data}`)
    // return this._http.post(this._appSettings.pagaduria.url.baseArchivo, data);
}



}
