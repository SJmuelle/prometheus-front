import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

const values: any = {
  clienteInfo: null
}

@Injectable({
  providedIn: 'root'
})
export class CarteraClientesService {

  public dataCliente$: BehaviorSubject<any> = new BehaviorSubject(values)
  public direccionCliente$: BehaviorSubject<string> = new BehaviorSubject('')
  public reloadData$: Subject<any[]> = new Subject();
  public dataTablesSelected$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public allDataSearch: any = null;
  public selectedOption$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   * 
   * @returns listar la unidad de negocio de la cartera del cliente
   */
  public listarUnidadNEgocio(): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarUnidad}`)
  }

  /**
   * 
   * @param data 
   */
  public saveSearch(data: any): void {

    this.allDataSearch = { ...data }
  }

  /**
 * 
 * @param data 
 */
  public getSearchData(): any {
    return this.allDataSearch;
  }



  /**
   * 
   * @returns listar periodos fotos de la cartera del cliente
   */
  public listarPeriodosFotos(): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.periodoFotos}`)
  }

  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public buscarClienteCartera(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(this._appSettings.seguimientoCarteraClientes.url.buscarCliente, { ...data })
  }

  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public cargarClienteCartera(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(this._appSettings.seguimientoCarteraClientes.url.cargarCliente, { ...data })
  }

  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public verPagosClientes(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(this._appSettings.seguimientoCarteraClientes.url.visualizarPagos, { ...data })
  }

  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public verGestionesCliente(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.visualizarGestiones}/${data}`)
  }

  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public verCompromisosPagos(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.visualizarCompromisos}/${data}`)
  }

  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public ListarTipoGestor(): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarTipoGestor}`)
  }

  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public listarTipoGestion(): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarTipoGestion}`)
  }


  /**
  * 
  * @returns listar periodos fotos de la cartera del cliente
  */
  public listarTipoContacto(): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarTipoContacto}`)
  }

  /**
 * 
 * @returns listar periodos fotos de la cartera del cliente
 */
  public listarMotivoNoPago(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarMotivoNoPago}/${data.select}/${data.id}`)
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public listarEstadoCliente(id): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarEstadoCliente}/${id}`)
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public listarProximaAccion(id): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarProximaAccion}/${id}`)
  }


  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public listarResultadoGestion(id): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarResultadoGestion}/${id}`)
  }


  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public listarDepartamentos(): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarDepartamentos}`)
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public listarCiudades(id): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarCiudades}/${id}`)
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public guardarGestionCliente(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(`${this._appSettings.seguimientoCarteraClientes.url.guardarGestionCliente}`, { ...data })
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public verInformacionCliente(id): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.verInformacionCliente}/${id}`)
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public guardarInformacionCliente(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(`${this._appSettings.seguimientoCarteraClientes.url.guardarInformacionCliente}`, { ...data })
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public verDetallePagoCliente(data): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(`${this._appSettings.seguimientoCarteraClientes.url.verDetallePagoCliente}`, { ...data })
  }


  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public listarNomenclaturas(): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarNomenclaturas}`)
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public listarBarrios(ciudad: string): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.get(`${this._appSettings.seguimientoCarteraClientes.url.listarBarrios}/${ciudad}`)
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public buscarClienteHistorico(data: any): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(`${this._appSettings.seguimientoCarteraClientes.url.buscarClienteHistorico}`, { ...data })
  }

  /**
* 
* @returns listar periodos fotos de la cartera del cliente
*/
  public verDetalleCarteraHistorico(data: any): Observable<any> {
    // api-fintra/api/generic/qry/cartera-listar-unidad-negocio
    return this._http.post(`${this._appSettings.seguimientoCarteraClientes.url.verDetalleCarteraHistorico}`, { ...data })
  }

  //generic/cartera-cargar-detalle-cliente-historico
  //generic/qry/nomenclarturas
  //generic/cartera-actualizar-info-cliente

  //generic/cartera-guardar-gestion-compromiso

  //generic/qry/listar-departamentos

  ///generic/qry/cartera-listar-proxima-accion-contacto/1

  // api/generic/cartera-cargar-detalle-cliente

  // api-fintra/api/generic/cartera-buscar-cliente

}
