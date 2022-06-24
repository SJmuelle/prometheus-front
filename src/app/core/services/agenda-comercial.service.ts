import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaComercialService {
  public refrescarListado$: Subject<{ estado: boolean }> = new Subject();
  public seleccionAgenda: Subject<{ selected: any; show: boolean }> = new Subject<{ selected: any; show: boolean }>();

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }

  /**
   * @description: Listado de agendas comercial
   */
  public getAgendaComercial(): Observable<any> {
    return this._http.get(this._appSettings.agendaComercial.url.base);
  }

  /**
 * @description: Listado de agendas comercial
 */
  public getAgendaDecision(): Observable<any> {
    return this._http.get(this._appSettings.agendaDecision.url.base);
  }

  /**
   * @description: Establece por defecto el observable behaviorSubject
   */
  public resetSeleccionAgenda(): void {
    this.seleccionAgenda.next({ selected: '', show: false });
  }

  /**
   * @description: totales de agendas de completacion
   */
  public getTotalesAgendaComercial(): Observable<any> {
    return this._http.get(this._appSettings.agendaComercial.url.totales);
  }

    /**
   * @description: totales de agendas de completacion
   */
     public getTotalesAgendaDecision(): Observable<any> {
      return this._http.get(this._appSettings.agendaDecision.url.totales);
    }
}
