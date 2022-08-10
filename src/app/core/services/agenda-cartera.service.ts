import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaCarteraService {
  // public refrescarListado$: Subject<{ estado: boolean }> = new Subject();
  public seleccionAgenda: Subject<{ selected: any; show: boolean }> = new Subject<{ selected: any; show: boolean }>();
 
  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }

  /**
   * @description: Listado de agendas Cartera
   */
  public getAgendaCartera(): Observable<any> {
    return this._http.get(this._appSettings.agendaCartera.url.base);
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
  public getTotalesAgendaCartera(): Observable<any> {
    return this._http.get(this._appSettings.agendaCartera.url.totales);
  }
}
