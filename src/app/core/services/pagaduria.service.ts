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

}
