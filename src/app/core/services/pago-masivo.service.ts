import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PagoMasivoService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   * @description: Envia el array del JSON de excel.
   */
   public postPagoMasivo(datos: any): Observable<any> {
    return this._http.post(this._appSettings.pago.url.base, datos);
  }
}
