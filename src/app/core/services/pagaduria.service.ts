import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";
import { replace, toNumber } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PagaduriaService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   * @description: Obtiene listado de solicitudes
   */
  public getSolicitudes(): Observable<any> {
    return this._http.get(this._appSettings.pagaduria.url.base)
  }

  /**
   * @description: Obtiene listado de solicitudes segun el tipo
   */
  public getSolicitudesFilter(tipo:any, estado:any): Observable<any> {
    return this._http.get(`${this._appSettings.pagaduria.url.baseSoli}/${tipo}/${estado}`)
  }

  /**
   * @description: Obtiene listado de obligaciones
   */
  public getObligaciones(numero:any): Observable<any> {
    return this._http.get(`${this._appSettings.pagaduria.url.baseObli}/${numero}`)
  }

  /**
   * @description: Actualiza el estado de las solicitudes recibiendo los datos especificados.
   */
  public UpdateSolicitud(datos: any): Observable<any> {
    return this._http.post(this._appSettings.pagaduria.url.baseUpdate, datos);
  }

  /**
   * @description: Descargar los archivos de la columna Anexo.
   */
  public descargarArchivos(data: any): Observable<any> {
    console.log(`${this._appSettings.pagaduria.url.baseArchivo}/${data}`)
    return this._http.get(`${this._appSettings.pagaduria.url.baseArchivo}/${data}`)
  }

  /**
   * @description: Asegurar que los campos de valor tengan formato de numero
   */
  public formatearNumero(value: string){
    const valor: string = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return valor;
  }

  /**
   * @description: Enviar los numeros para el formato.
   */
  public enviarNumero(value: string){
    if (value == '0') {
        return 0;
    }else {
        const valor = value.replace(/,/g, '');
        // console.log(valor)
        return valor;
    }
  }

}
