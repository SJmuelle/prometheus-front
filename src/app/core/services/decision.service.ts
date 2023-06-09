import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable, throwError } from "rxjs";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {
  icono
  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService,
    private router: Router

  ) { }
  /**
   *@description: Obtiene el listado de opciones
   */
  public getOpciones(): Observable<any> {
    return this._http.get(this._appSettings.decision.url.base).pipe(catchError(this.handleError));;
  }
  /**
   * @description: Guarda la decision
   */
  public postDecision(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.baseDecision, data).pipe(catchError(this.handleError));;
  }

    /**
   * @description: Guarda la decision
   */
    public postDecisionNoVisado(data: any): Observable<any> {
      return this._http.post(this._appSettings.decision.url.baseDecisionNoVisado, data).pipe(catchError(this.handleError));;
    }

       /**
   * @description: DataCreditoRechazo
   */
       public dataCreditoRechazo(data: any): Observable<any> {
        return this._http.post(this._appSettings.decision.url.dataCreditoRechazo, data).pipe(catchError(this.handleError));;
      }
  /**
 * @description: Guarda la decision de aprobado agenda de comite comercial
 */
  public postAprobado(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.baseAprobado, data).pipe(catchError(this.handleError));;
  }
  /**
 * @description:post de cmabio de estado
 */
  public postCambioEstado(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.cambioEstado, data).pipe(catchError(this.handleError));;
  }

  /**
* @description:post de cmabio de estado
*/
  public getAgendasFabrica(agenda: string): Observable<any> {
    return this._http.get(`${this._appSettings.decision.url.getAgendasFabrica}/${agenda}`).pipe(catchError(this.handleError));;
  }

  /**
  * @description:post de validacion Datos
  */
  public postValidacionDatos(data: any): Observable<any> {
    return this._http.post(this._appSettings.decision.url.validaCampos, data).pipe(catchError(this.handleError));;
  }

  /**
   * @description: Obtiene el listado de causales
   */
  public getCausales(): Observable<any> {
    return this._http.get(this._appSettings.decision.url.baseCausalRechazo).pipe(catchError(this.handleError));;
  }

    /**
   * @description: Obtiene el listado de causales
   */
    public getCausalesAgendaPagaduria(): Observable<any> {
      return this._http.get(this._appSettings.decision.url.baseCausalRechazoPagaduria).pipe(catchError(this.handleError));;
    }


      /**
   * @description: para fallas de errores en las peticiones.
   */
  handleError = (err: any): Observable<HttpEvent<any>> => {
  
    // this.store.dispatch(actions.stopLoading());
    //  ;
    let errorMessage = 'No hay respuesta, favor intente nuevamente';
    // console.log("Algo se daño");
    let res: any = {};
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.msg}`;
    } else {
      switch (err.status) {
        case 401:
        case 402:
          this.icono='warning'
          errorMessage = `Favor coloque los valores del inicio sesión nuevamente`;
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession', 'true');
            this.router.navigate(['/login'])
          }, 100);
          break;
        case 403:
          errorMessage = `No tiene permiso para ejecutar esta acción`;
          break;
        case 400:
          if (err.error.msg == 'La session ha expirado') {
            localStorage.clear();
            localStorage.clear();
            setTimeout(() => {
              localStorage.setItem('closeSession', 'true');
              this.router.navigate(['/login'])
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
    if (err.error !== 'La session ha expirado') {
      if (
        errorMessage != 'undefined' &&
        errorMessage !== undefined &&
        errorMessage != null &&
        errorMessage != '' &&
        errorMessage != 'UNKNOWN ERROR!'
      ) {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: this.icono,
          confirmButtonText: 'Cerrar',
        }).then();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No hubo respuesta por parte del servidor, favor intente nuevamente',
          icon: this.icono,
          confirmButtonText: 'Cerrar',
        }).then();
      }
    }
    return throwError(errorMessage);
  };
}
