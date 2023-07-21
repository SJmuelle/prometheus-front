import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaFirmaService {
  numeroSolicitud: Subject<number> = new Subject();
  openDrawner: Subject<boolean> = new Subject();

  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }


  public get getNumeroSolicitud$(): Observable<number> {
    return this.numeroSolicitud.asObservable();
  }

  public get openDrawner$(): Observable<boolean> {
    return this.openDrawner.asObservable();
  }

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

  /**
   * @description: Listado de agendas de completacion
   */
  public obtenerDatosBasicosFirma(numeroSolicitud): Observable<any> {
    return this._http.get(`${this._appSettings.agendaFirmaDigital.url.obtenerDatosBasicosFirma}/${numeroSolicitud}`);
  }

  /**
 * @description: Listado de agendas de completacion
 */
  public obtenerIntentosEvidente(data): Observable<any> {
    return this._http.post(`${this._appSettings.agendaFirmaDigital.url.obtenerIntentosEvidente}`, data);
  }


  /**
  * @description:
  */
  public guardarDatosBasicosFirma(data): Observable<any> {
    return this._http.post(`${this._appSettings.agendaFirmaDigital.url.guardarDatosBasicosFirma}`, data);
  }


  /**
   * 
   * @param data 
   * @returns 
   */
  public verDocumentosFirmaDigital(data: any): Observable<any> {
    const id = data.id
    const negocio = data.negocio
    return this._http.get<any>(`${this._appSettings.agendaFirmaDigital.url.verDocumentosFirmaDigital}/${id}/${negocio}`)
  }

}
