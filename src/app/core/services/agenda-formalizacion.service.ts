import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettingsService} from '../app-configs/app-settings.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaFormalizacionService {
  // public seleccionAgenda: BehaviorSubject<{selected: any; show: boolean}> = new BehaviorSubject<{ selected: any; show: boolean }>({selected: '', show: false});
  public seleccionAgenda: Subject<{selected: any; show: boolean}> = new Subject<{ selected: any; show: boolean }>();
  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }
  /**
   * @description: Listado de agendas de Formalizacion
   */
  public getAgendaFormalizacion(): Observable<any> {
      return this._http.get(this._appSettings.agendaFormalizacion.url.base);
  }

    /**
   * @description: totales de agendas de Formalizacion
   */
     public getTotalesAgendaFormalizacion(): Observable<any> {
      return this._http.get(this._appSettings.agendaFormalizacion.url.totales);
  }

  /**
   * @description: Establece por defecto el observable behaviorSubject
   */
  public resetSeleccionAgenda(): void {
      this.seleccionAgenda.next({selected: '', show: false});
  }
}
