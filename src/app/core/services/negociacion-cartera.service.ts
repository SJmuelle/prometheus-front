import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';



type Ireload = { reload?: boolean, fullTable?: boolean };

const reload: Ireload = { reload: false, fullTable: true };

@Injectable({
  providedIn: 'root'
})


export class NegociacionCarteraService {


  constructor(
    private http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }
  public reloadData$: BehaviorSubject<any> = new BehaviorSubject(reload);

  /**
   * 
   * @param data 
   * @returns 
   */
  public ObtenerNegociacionCartera(data: string): Observable<any> {

    return this.http.get(`${this._appSettings.negociacionCartera.url.base}/${data}`)
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  public guardarNegociacionCartera(data: any): Observable<any> {

    return this.http.post(`${this._appSettings.negociacionCartera.url.guardado}`, data)
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  public ObtenerListadoNegociaciones(diasMora): Observable<any> {

    return this.http.get(`${this._appSettings.negociacionCartera.url.listadoNegociaciones}/${diasMora}`)
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  public ObtenerNegociacionRealizada(cod_negocio: string): Observable<any> {

    return this.http.get(`${this._appSettings.negociacionCartera.url.negociacionRealizada}/${cod_negocio}`)
  }





}
