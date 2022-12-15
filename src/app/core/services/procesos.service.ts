import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
) { }
/**
 * @description: clonar perido
 */
public metasClonarPeriodo(data: any): Observable<any> {
    return this._http.post(`${this._appSettings.procesos.url.metasClonarPeriodo}`,data);
}
/**
 * @description:
 */
public metasListaIndicadores(data: any): Observable<any> {
  return this._http.post(`${this._appSettings.procesos.url.metasListaIndicadores}`,data);
}
/**
 * @description:
 */
public metasListaIndicadoresAgencia(data: any): Observable<any> {
  return this._http.post(`${this._appSettings.procesos.url.metasListaIndicadoresAgencia}`,data);
}

/**
 * @description:
 */
public metasSgtePaso(data: any): Observable<any> {
  return this._http.post(`${this._appSettings.procesos.url.metasSgtePaso}`,data);
}

/**
 * @description:
 */
public metasAnularAsesor(data: any): Observable<any> {
  return this._http.post(`${this._appSettings.procesos.url.metasAnularAsesor}`,data);
}

/**
 * @description:
 */
public metasUpdateMetaColocacion(data: any): Observable<any> {
  return this._http.post(`${this._appSettings.procesos.url.metasUpdateMetaColocacion}`,data);
}

/**
 * @description:
 */
public obtenerInformacionUsuarios(data: any): Observable<any> {
  return this._http.get(`${this._appSettings.procesos.url.obtenerInformacionUsuarios}/${data}`);
}
/**
 * @description:
 */
public metasAgregarAsesor(data: any): Observable<any> {
  return this._http.post(`${this._appSettings.procesos.url.metasAgregarAsesor}`,data);
}

}
