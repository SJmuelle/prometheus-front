import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReferenciasService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }

  /**
   * @description: Obtiene el listado de referencias por solicitud
   */
  public getReferencias(codigo: string): Observable<any> {
      return this._http.get(`${this._appSettings.referencias.url.base}/${codigo}`);
  }
}
