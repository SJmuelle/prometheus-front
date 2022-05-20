import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent  } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';

import { Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHeaders,
} from '@angular/common/http';
import Swal from 'sweetalert2';

// declare var Swal:any;
// declare var $:any;
@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    server: string = environment.urlApi;
    server2: string = environment.urlApi2;
    server3: string = environment.urlApi3;
    adjunto: string = environment.adjunto;
    correo: string = environment.envioCorreo;
    // homelogin:string = environment.login;
    notoken: string = 'notoken';
    constructor(private _httpClient: HttpClient) {}



  formatearNumero(value: any){
    const valor: any = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',');
    return valor;
  }
  enviarNumero(value: string){
    if (value == '0') {
        return 0;
    }else {
        const valor = value.replace(/,/g, '');
        return valor;
    }
  }
    //Funciones de sesion
    readToken() {
        let token: any;
        if (this.validateToken()) {
            return (token = localStorage.getItem('accessToken'));
        } else {
            return (token = '');
        }
    }

    validateToken(): boolean {
        if (localStorage.getItem('accessToken')) {
            return true;
        } else {
            return false;
        }
    }

    getSession(param: string) {
        return localStorage.getItem(param);
    }

    // funciones de peticiones puras
    getQuery(query: string, sendHeaders: boolean) {
        // console.log(this.readToken());
        const URL = this.server2 + query;
        const headers = new HttpHeaders({
            Authentication: `${this.readToken()}`,
            'Content-Type': 'application/json; charset=utf-8',
        });
        if (sendHeaders) {
            // console.log(headers);
            return this._httpClient
                .get(URL, { headers })
                .pipe(catchError(this.handleError));
        } else {
            return this._httpClient.get(URL).pipe(catchError(this.handleError));
        }
    }

    getQueryUnico(query: string, sendHeaders: boolean) {
        // console.log(this.readToken());
        const URL = this.server + query;
        const headers = new HttpHeaders({
            Authentication: `${this.readToken()}`,
            'Content-Type': 'application/json; charset=utf-8',
        });
        if (sendHeaders) {
            // console.log(headers);
            return this._httpClient
                .get(URL, { headers })
                .pipe(catchError(this.handleError));
        } else {
            return this._httpClient.get(URL).pipe(catchError(this.handleError));
        }
    }

    getFile(query: string) {
        const URL = this.server + query;
        const headers = new HttpHeaders({
            Authentication: `${this.readToken()}`,
            'Content-Type': 'application/json; charset=utf-8',
            responseType: 'blob',
        });
        return this._httpClient
            .get(URL, { headers })
            .pipe(catchError(this.handleError));
    }

    deleteQuery(query: string, sendHeaders: boolean) {
        const URL = this.server + query;
        const headers = new HttpHeaders({
            Authentication: `${this.readToken()}`,
            'Content-Type': 'application/json; charset=utf-8',
        });
        if (sendHeaders) {
            return this._httpClient
                .delete(URL, { headers })
                .pipe(catchError(this.handleError));
        } else {
            return this._httpClient
                .delete(URL)
                .pipe(catchError(this.handleError));
        }
    }

    postQuery(query: string, data: any, typeHeaders: string = 'data') {
        const URL = this.server3 + query;
        let optiones: any;
        if (typeHeaders == 'data') {
            optiones = {
                Authentication: `${this.readToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            };
        } else {
            if (typeHeaders == this.notoken) {
                optiones = {
                    Authentication: ``,
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json; charset=utf-8',
                };
            } else {
                optiones = {
                    Authentication: `${this.readToken()}`,
                    Accept: 'application/json',
                };
            }
        }

        const headers = new HttpHeaders(optiones);
        headers.delete('Content-Type');
        return this._httpClient
            .post(URL, data, { headers })
            .pipe(catchError(this.handleError));
    }
    postQueryServer1(query: string, data: any, typeHeaders: string = 'data') {
        const URL = this.server + query;
        let optiones: any;
        if (typeHeaders == 'data') {
            optiones = {
                Authentication: `${this.readToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            };
        } else {
            if (typeHeaders == this.notoken) {
                optiones = {
                    Authentication: ``,
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json; charset=utf-8',
                };
            } else {
                optiones = {
                    Authentication: `${this.readToken()}`,
                    Accept: 'application/json',
                };
            }
        }

        const headers = new HttpHeaders(optiones);
        headers.delete('Content-Type');
        return this._httpClient
            .post(URL, data, { headers })
            .pipe(catchError(this.handleError));
    }

    postQueryCorreo(query: string, data: any, typeHeaders: string = 'data') {
        const URL = this.adjunto + query;
        let optiones: any;
        if (typeHeaders == 'data') {
            optiones = {
                Authentication: `${this.readToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            };
        } else {
            if (typeHeaders == this.notoken) {
                optiones = {
                    Authentication: ``,
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json; charset=utf-8',
                };
            } else {
                optiones = {
                    Authentication: `${this.readToken()}`,
                    Accept: 'application/json',
                };
            }
        }

        const headers = new HttpHeaders(optiones);
        headers.delete('Content-Type');
        return this._httpClient
            .post(URL, data, { headers })
            .pipe(catchError(this.handleError2));
    }

    // postFile(query:string, data:any){
    //   const URL = this.server + query;
    //   let optiones = {
    //     'Authentication': `${this.readToken()}`,
    //   };
    //   const headers = new HttpHeaders(optiones);
    //   return this._httpClient.post(URL, data, { headers }).pipe(catchError(this.handleError));
    // }
    postFile(query: string, data: any, typeHeaders: string = 'data'): any {
        const URL = this.adjunto + query;
        let optiones: any;
        if (typeHeaders == 'data') {
            optiones = {
                Authentication: `${this.readToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            };
        } else {
            if (typeHeaders == this.notoken) {
                optiones = {
                    Authentication: ``,
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json; charset=utf-8',
                };
            } else {
                optiones = {
                    Authentication: `${this.readToken()}`,
                    Accept: 'application/json',
                };
            }
        }

        const headers = new HttpHeaders(optiones);
        headers.delete('Content-Type');
        return this._httpClient
            .post(URL, data, { headers })
            .pipe(catchError(this.handleError));
    }

    putQuery(query: string, data: any, typeHeaders: string = 'data') {
        const URL = this.server + query;
        let optiones: any;
        if (typeHeaders == 'data') {
            optiones = {
                Authentication: `${this.readToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            };
        } else {
            if (typeHeaders == this.notoken) {
                optiones = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                };
            } else {
                optiones = {
                    Authentication: `${this.readToken()}`,
                    Accept: 'application/json',
                };
            }
        }
        const headers = new HttpHeaders(optiones);
        return this._httpClient
            .put(URL, data, { headers })
            .pipe(catchError(this.handleError));
    }

    //Funcion para el Manejo de errores
    handleError = (err: any): Observable<HttpEvent<any>> => {
        // debugger;
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
                    title: 'Error',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                }).then();
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'No hubo respuesta por parte del servidor, favor intente nuevamente',
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                }).then();
            }
        }
        return throwError(errorMessage);
    };

    //Funcion para el Manejo de errores
    handleError2 = (err: any): Observable<HttpEvent<any>> => {
        // debugger;
        let errorMessage =
            'No se envio el correo, favor notificar por otro medio';
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
                    if (err.error.msg == 'La session ha expirado') {
                        localStorage.clear();
                        localStorage.clear();
                        setTimeout(() => {
                            localStorage.setItem('closeSession', 'true');
                        }, 100);
                    }
                    if(err.error.data.data){
                        errorMessage = `${err.error.data.data}`;
                    } else if (
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
                    title: 'Error',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                }).then();
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'No hubo respuesta por parte del servidor, favor intente nuevamente',
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                }).then();
            }
        }
        return throwError(errorMessage);
    };
}


