import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettingsService} from '../app-configs/app-settings.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaCompletacionService {
  // public seleccionAgenda: BehaviorSubject<{selected: any; show: boolean}> = new BehaviorSubject<{ selected: any; show: boolean }>({selected: '', show: false});
  public seleccionAgenda: Subject<{selected: any; show: boolean}> = new Subject<{ selected: any; show: boolean }>();
  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }
  /**
   * @description: Listado de agendas de completacion
   */
  public getAgendaCompletacion(): Observable<any> {
      return this._http.get(this._appSettings.agendaCompletacion.url.base);
  }

  /**
   * @description: Establece por defecto el observable behaviorSubject
   */
  public resetSeleccionAgenda(): void {
      this.seleccionAgenda.next({selected: '', show: false});
  }
}
