import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";
import { replace, toNumber } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class DecisionesService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   *@description: Obtiene el listado de opciones
   */
   public getOpciones(): Observable<any> {
    return this._http.get(this._appSettings.decision.url.base);
  }

  /**
   * @description: Obtiene el listado de causales
   */
   public getCausales(): Observable<any> {
    return this._http.get(this._appSettings.decision.url.baseCausal);
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

  /**
  * @description:post de validacion Datos
  */
  public postGuardado(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.guardado, data);
  }
  
}
