import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CajaVirtualService {

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
    return this._http.get(`${this._appSettings.cajaVirtual.url.infoNegocio}`)
  }



  /**
   * Get contacts
   */
  getCuentasAsignadas(): Observable<any[]> {
    return this._http.get<any>(`${this._appSettings.cajaVirtual.url.infoNegocio}`).pipe(
      tap((respuesta) => {
        this._cuentasAsignadas.next(respuesta.data);
      })
    );
  }

  /*
   * @description: 
   */
  public congelaCalculoTotal(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cajaVirtual.url.congelaCalculoTotal, datos);
  }
  /*
 * @description: 
 */
  public congelaCalculoDescuento(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cajaVirtual.url.congelaCalculoDescuento, datos);
  }

  /*
  * @description: 
  */
  public congelaCongelaSimulador(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cajaVirtual.url.congelaSimulador, datos);
  }

  /*
  * @description: 
  */
  public congelaCongelaGuardar(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cajaVirtual.url.congelaGuardar, datos);
  }

  /*
  * @description: 1
  */
  public refinanciacionTipoEstrategia(): Observable<any> {
    return this._http.get(this._appSettings.cajaVirtual.url.refinanciacionTipoEstrategia);
  }

  /*
  * @description: 2
  */
  public refinanciacionBuscarCliente(tipoDato,tipoEstrategia,id): Observable<any> {
    return this._http.get(`${this._appSettings.cajaVirtual.url.refinanciacionBuscarCliente}/${tipoDato}/${id}/${tipoEstrategia}`);
  }

  /*
  * @description: 
  */
  public refinanciacionCargarDetalleCartera(negocio,tipoEstrategia,fecha): Observable<any> {
    return this._http.get(`${this._appSettings.cajaVirtual.url.refinanciacionCargarDetalleCartera}/${negocio}/${tipoEstrategia}/${fecha}`);
  }

  /*
  * @description: 
  */
  public refinanciacionBuscarFechaPago(): Observable<any> {
    return this._http.get(this._appSettings.cajaVirtual.url.refinanciacionBuscarFechaPago);
  }


  /*
  * @description: 
  */
  public refinanciacionCalcularCtaInicial(datos: any): Observable<any> {
    return this._http.post(this._appSettings.cajaVirtual.url.refinanciacionCalcularCtaInicial, datos);
  }

  /*
  * @description: 
  */
  public refinanciacionCargarDtoCongela(): Observable<any> {
    return this._http.get(this._appSettings.cajaVirtual.url.refinanciacionCargarDtoCongela);
  }

}
