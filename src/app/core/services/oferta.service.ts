import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }

  /**
   * @description:
   */
  public getListadoOferta(numeroSolicitud: number): Observable<any> {
    let data={
      numeroSolicitud:numeroSolicitud
    }
    return this._http.post(this._appSettings.oferta.url.base, data);
  }

    /**
   * @description:
   */
     public getCapacidadPago(numeroSolicitud: number): Observable<any> {
        let data={
          numeroSolicitud:numeroSolicitud
        }
        return this._http.post(this._appSettings.capacidad.url.base, data);
      }
}
