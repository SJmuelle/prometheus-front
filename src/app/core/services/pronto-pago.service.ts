import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProntoPagoService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   * @description: Obtiene listado de transportadoras
   */
   public getTransportadoras(dato:any): Observable<any> {
    return this._http.get(`${this._appSettings.transportadora.url.base}/${dato}`)
  }

  /**
   * @description: Obtiene listado de propietarios
   */
   public getPropietario(): Observable<any> {
    return this._http.get(this._appSettings.transportadora.url.basePropietario)
  }

  /**
   * @description: Obtiene listado de propietarios
   */
   public getTransportadorasPropietario(): Observable<any> {
    return this._http.get(this._appSettings.transportadora.url.basePropietario)
  }

  /**
   * @description: Aceptar el o los pronto pago
   */
  public postAceptar(data: any): Observable<any> {
    return this._http.post(this._appSettings.transportadora.url.baseAceptar, data);
  }

  /**
   * @description: Rechazar el o los pronto pago
   */
   public postRechazar(data: any): Observable<any> {
    return this._http.post(this._appSettings.transportadora.url.baseRechazar, data);
  }
}
