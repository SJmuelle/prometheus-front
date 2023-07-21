import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class CarteraClientesService {

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

  // api-fintra/api/generic/cartera-buscar-cliente

}
