import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaFirmaService {

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }
  /**
   * @description:
   */
  public correoDecision(data): Observable<any> {
    return this._http.post(`${this._appSettings.agendaFirmaDigital.url.correoDecision}`, data);
  }

  /**
 * @description:
 */
  public UpdateEstadoEvidente(data): Observable<any> {
    return this._http.post(`${this._appSettings.agendaFirmaDigital.url.updateEstadoEvidente}`, data);
  }

    /**
 * @description:
 */
    public updateReenviarFirma(data): Observable<any> {
      return this._http.post(`${this._appSettings.agendaFirmaDigital.url.updateReenviarFirma}`, data);
    }


}
