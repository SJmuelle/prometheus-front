import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable, throwError } from "rxjs";
import { replace, toNumber } from 'lodash';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DecisionesService {
  private icono: SweetAlertIcon = 'error';
  private titulo: string = 'Error';

  // private icono:string='error';

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   *@description: Obtiene el listado de opciones
   */
  public getOpciones(agenda): Observable<any> {
    return this._http.get(this._appSettings.decision.url.base+agenda);
  }

  
  /**
   * @description: Obtiene el listado de causales aprobacion
   */
  public getCausalesAprobacion(numeroSolicitud, descision): Observable<any> {
    let data = {
      numeroSolicitud: numeroSolicitud,
      concepto: descision
    }
    return this._http.post(`${this._appSettings.decision.url.baseCausalAprobacion}`, data);
  }


  /**
 * @description: Obtiene el listado de causales
 */
  public getCausalesRechazo(numeroSolicitud): Observable<any> {
    let data = {
      numeroSolicitud: numeroSolicitud,
    }
    // return this._http.post(`${this._appSettings.decision.url.baseCausalRechazo}`, data).pipe(catchError(this.handleError));;
    return this._http
      .post(this._appSettings.decision.url.baseCausalRechazo, data)
      .pipe(catchError(this.handleError));
  }

    /**
 * @description: Obtiene el listado de causales
 */
    public getCauDesestimiento(numeroSolicitud): Observable<any> {
      let data = {
        numeroSolicitud: numeroSolicitud,
      }
      // return this._http.post(`${this._appSettings.decision.url.baseCausalRechazo}`, data).pipe(catchError(this.handleError));;
      return this._http
        .post(this._appSettings.decision.url.baseCauDesestimiento, data)
        .pipe(catchError(this.handleError));
    }
  

  /**
   * @description: Asegurar que los campos de valor tengan formato de numero
   */
  public formatearNumero(value: string) {
    const valor: string = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return valor;
  }

  /**
   * @description: Enviar los numeros para el formato.
   */
  public enviarNumero(value: string) {
    if (value == '0') {
      return 0;
    } else {
      const valor = value.replace(/,/g, '');
      // console.log(valor)
      return valor;
    }
  }

  /**
 * @description: comprobacion Campos
 */
  public comprobacionCampos(data: any): Observable<any> {

    return this._http.post(this._appSettings.decision.url.comprobacionCampos, data)
      .pipe(catchError(this.handleError));

  }

  /**
 * @description: comprobacion Campos
 */
  public generarNumeroPagare(data: any): Observable<any> {

    return this._http.post(this._appSettings.decision.url.generarNumeroPagare, data)
      .pipe(catchError(this.handleError));

  }

  /**
  * @description:post de validacion Datos
  */
  public postGuardado(data: any): Observable<any> {

    // return this._http.post(this._appSettings.decision.url.guardado, data);
    return this._http
      .post(this._appSettings.decision.url.guardado, data).pipe(catchError(this.handleError));
  }


  //Funcion para el Manejo de errores
  handleError = (err: any): Observable<HttpEvent<any>> => {
    // ;
    let errorMessage = 'No hay respuesta, favor intente nuevamente';
    let icon: string = 'question';
    // console.log("Algo se daño");
    let res: any = {};
    if (err.error instanceof ErrorEvent) {
      icon = 'question';
      errorMessage = `Error: ${err.error.msg}`;
    } else {
      switch (err.status) {
        case 401:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession', 'true');
          }, 100);
          break;
        case 402:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession', 'true');
          }, 100);
          break;
        case 403:
          errorMessage = `No tiene permiso para ejecutar esta acción`;
          break;
        case 400:
          this.titulo="Advertencia"
          this.icono = 'warning';
          if (err.error.msg == 'La session ha expirado') {
            localStorage.clear();
            localStorage.clear();
            setTimeout(() => {
              localStorage.setItem('closeSession', 'true');
            }, 100);
          }
          if (
            err.error.msg !== undefined &&
            typeof err.error.msg == 'string'
          ) {
            errorMessage = `${err.error.msg}`;
          }
          break;
        case 404:
          errorMessage = `${err.error.msg}`;
          break;
        case 500:
          errorMessage = `${err.error.msg}`;
          break;
        default:
          errorMessage = `${err.statusText.msg}`;
          break;
      }
    }
    if (err.status !== 401 && err.error !== 'La session ha expirado') {
      if (
        errorMessage != 'undefined' &&
        errorMessage !== undefined &&
        errorMessage != null &&
        errorMessage != '' &&
        errorMessage != 'UNKNOWN ERROR!'
      ) {
        Swal.fire({
          title: this.titulo,
          text: errorMessage,
          icon: this.icono,
          confirmButtonText: 'Cerrar',
        }).then();
      } else {
        Swal.fire({
          title: this.titulo,
          text: 'No hubo respuesta por parte del servidor, favor intente nuevamente',
          icon: this.icono,
          confirmButtonText: 'Cerrar',
        }).then();
      }
    }
    return throwError(errorMessage);
  };

}
