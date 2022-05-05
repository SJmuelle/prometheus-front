import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgendaReferenciacionService {
  public refrescarListado$: Subject<{ estado: boolean }> = new Subject();
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
  /**
   * @description: totales de agendas de completacion
   */
  public getTotalesAgendaReferenciacion(): Observable<any> {
    return this._http.get(this._appSettings.agendaReferenciacion.url.totales);
  }
}
