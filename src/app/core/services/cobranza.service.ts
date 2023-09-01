import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CobranzaService {


  private _cuentasAsignadas: BehaviorSubject<any[] | null> = new BehaviorSubject(null);


  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }


  /**
 * Getter for _cuentasAsignadas
 */
  get cuentasAsignadas$(): Observable<any[]> {
    return this._cuentasAsignadas.asObservable();
  }


  /**
   * @description: Obtiene listado de informacion-negocios-asignados 
   */
  public getInformacionNegocios(): Observable<any> {
    return this._http.get(`${this._appSettings.cobranza.url.infoNegocio}`)
  }



  /**
   * Get cobranza
   */
  getCuentasAsignadas(): Observable<any[]> {
    return this._http.get<any>(`${this._appSettings.cobranza.url.infoNegocio}`).pipe(
      tap((respuesta) => {
        this._cuentasAsignadas.next(respuesta.data);
      })
    );
  }

  /*
   * @description: 
   */
  public congelaCalculoTotal(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cobranza.url.congelaCalculoTotal, datos);
  }
  /*
 * @description: 
 */
  public congelaCalculoDescuento(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cobranza.url.congelaCalculoDescuento, datos);
  }

  /*
  * @description: 
  */
  public congelaCongelaSimulador(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cobranza.url.congelaSimulador, datos);
  }

  /*
  * @description: 
  */
  public congelaCongelaGuardar(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cobranza.url.congelaGuardar, datos);
  }

  /*
  * @description: 1
  */
  public refinanciacionTipoEstrategia(): Observable<any> {
    return this._http.get(this._appSettings.cobranza.url.refinanciacionTipoEstrategia);
  }

  /*
  * @description: 2
  */
  public refinanciacionBuscarCliente(tipoDato, tipoEstrategia, id): Observable<any> {
    return this._http.get(`${this._appSettings.cobranza.url.refinanciacionBuscarCliente}/${tipoDato}/${id}/${tipoEstrategia}`);
  }

  /*
  * @description: 
  */
  public refinanciacionCargarDetalleCartera(negocio, tipoEstrategia, fecha): Observable<any> {
    return this._http.get(`${this._appSettings.cobranza.url.refinanciacionCargarDetalleCartera}/${negocio}/${tipoEstrategia}/${fecha}`);
  }

  /*
* @description: 
*/
  public refinanciacionBuscarFechaPago(): Observable<any> {
    return this._http.get(this._appSettings.cobranza.url.refinanciacionBuscarFechaPago);
  }

  /*
  * @description: 
  */
  public congelaComboDescuento(): Observable<any> {
    return this._http.get(this._appSettings.cobranza.url.congelaComboDescuento);
  }


  /*
  * @description: 
  */
  public refinanciacionCalcularCtaInicial(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cobranza.url.refinanciacionCalcularCtaInicial, datos);
  }

  /*
  * @description: 
  */
  public refinanciacionCargarDtoCongela(): Observable<any> {
    return this._http.get(this._appSettings.cobranza.url.refinanciacionCargarDtoCongela);
  }

  /*
  * @description: 
  */
  public getHistoricoCartera(negocio: string): Observable<any> {
    return this._http.get(`${this._appSettings.cobranza.url.historicoGestionCartera}/${negocio}`);
  }
}
