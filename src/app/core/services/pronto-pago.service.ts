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
   public getTransportadoras(): Observable<any> {
    return this._http.get(this._appSettings.transportadora.url.base)
  }
}
