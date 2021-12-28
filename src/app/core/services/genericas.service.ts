import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenericasService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }

  /**
   * @description: Obtiene listado
   */
  public getEstadoReferencias(): Observable<any> {
      const params: string = 'ESTADO-REFERENCIA';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description: Obtiene listado
   */
  public getViveNegocio(): Observable<any> {
      const params: string = 'VIVE-NEGOCIO';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description Obtiene el listado de declarante
   */
  public getDeclarante(): Observable<any> {
      const params: string = 'DECLARANTE';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description: Obtiene listado tipos de vivienda
   */
  public getTipoViviendas(): Observable<any> {
      const params: string = 'TIPO-VIVIENDA';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description: Obtiene listado de camara de comercio
   */
  public getCamaraComercio(): Observable<any> {
      const params: string = 'CAMARA-COMERCIO';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description Obtiene listado tipos de documentos
   */
  public getTiposDocumentos(): Observable<any> {
      const params: string = 'TIPO-DOCUMENTO';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description Obtiene listado generos
   */
  public getGeneros(): Observable<any> {
      const params: string = 'GENERO';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description: Obtiene nivel de estudii
   */
  public getNivelEstudio(): Observable<any> {
      const params: string = 'NIVEL-ESTUDIO';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
  /**
   * @description: Obtiene listado de tipos de referencia
   */
  public getTiposReferencias(): Observable<any> {
      const params: string = 'TIPO-REFERENCIA';
      return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
  }
}
