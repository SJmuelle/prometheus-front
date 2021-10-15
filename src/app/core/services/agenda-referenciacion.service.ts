import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgendaReferenciacionService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }
    /**
     * @description: Listado de agendas de referenciacion
     */
    public getAgendaReferenciacion(): Observable<any> {
        return this._http.get(this._appSettings.agendaReferenciacion.url.base);
    }
}
