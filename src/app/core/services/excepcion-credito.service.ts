import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExcepcionCreditoService {

  constructor(private _http: HttpClient,
    private _appSettings: AppSettingsService) { }


  /**
   * @description: Obtiene listado de buscar por
   */
  public getBuscarPorSelect(): Observable<any> {
    return this._http.get(this._appSettings.excepcionCredito.url.buscarPorSellect);
  }
}
