import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaVentaService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }

  /**
* @description: Listado de agendas Cartera
*/
  public getAgendaVenta(): Observable<any> {
    return this._http.get(this._appSettings.agendaVenta.url.base);
  }

}
