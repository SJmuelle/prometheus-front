import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ListadoCarteraService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }
  /**
   * @description:
   */
  public getListadoCartera(numeroSolicitud: number): Observable<any> {
    return this._http.get(`${this._appSettings.listadoCartera.url.base}/${numeroSolicitud}`);
  }

  /**
 * @description:
 */
  public getListadoCarteraNegociacion(numeroSolicitud: number): Observable<any> {
    return this._http.get(`${this._appSettings.listadoCartera.url.obtenerObligacion}/${numeroSolicitud}`);
  }

  /**
   * @description:
   */
  public updateCartera(data: any): Observable<any> {
    return this._http.post(this._appSettings.listadoCartera.url.update, data);

    // return this._http.post(`${this._appSettings.listadoCartera.url.update}/${numeroSolicitud}`);
  }

  
  /**
   * @description:
   */
   public validadorTotalLibranza(data: any): Observable<any> {
    return this._http.post(this._appSettings.listadoCartera.url.validadorTotalLibranza, data);
  }

  /**
  * @description:
  */
  public pasarAgenda(data: any): Observable<any> {
    return this._http.post(this._appSettings.listadoCartera.url.pasarAgenda, data);

    // return this._http.post(`${this._appSettings.listadoCartera.url.update}/${numeroSolicitud}`);
  }

  /**
   * @description:
   */
  public createCartera(data: any): Observable<any> {
    return this._http.post(this._appSettings.listadoCartera.url.create, data);
  }

    /**
   * @description:
   */
     public editarCartera(data: any): Observable<any> {
      return this._http.post(this._appSettings.listadoCartera.url.editar, data);
    }
  

  /**
 * @description:
 */
  public gestionCartera(data: any): Observable<any> {
    return this._http.post(this._appSettings.listadoCartera.url.gestionCartera, data);
  }



}
