import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent  } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';

import { Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js'

// declare var Swal:any;
// declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  server:string = environment.urlApi;
  server2:string = environment.urlApi2;
  // homelogin:string = environment.login;
  notoken:string = 'notoken';
  constructor(private _httpClient: HttpClient) { }

  //Funciones de sesion
  readToken(){
    let token:any;
    if(this.validateToken()){
      return token = localStorage.getItem('accessToken');
    }else{
      return token = ''
    }
  }
  validateToken(): boolean{
    if(localStorage.getItem('accessToken')){
      return true;
    }else{
      return false;
    }
  }
  getSession(param:string){
    return localStorage.getItem(param);
  }


  // funciones de peticiones puras
  getQuery(query:string,sendHeaders:boolean){

    console.log(this.readToken());
    const URL = this.server2 + query;
    const headers = new HttpHeaders({
        'Authentication' : `${this.readToken()}`,
        'Content-Type' : 'application/json; charset=utf-8'
    });
    if(sendHeaders){
      console.log(headers);
      return this._httpClient.get(URL, { headers }).pipe(catchError(this.handleError));
    }
    else{
      return this._httpClient.get(URL).pipe(catchError(this.handleError));
    }
  }

  getFile(query:string){
    const URL = this.server + query;
    const headers = new HttpHeaders({
        'Authentication' : `${this.readToken()}`,
        'Content-Type': 'application/json; charset=utf-8',
        'responseType': 'blob'
    });
    return this._httpClient.get(URL, { headers }).pipe(catchError(this.handleError));

  }

  deleteQuery(query:string,sendHeaders:boolean){
    const URL = this.server + query;
    const headers = new HttpHeaders({
        'Authentication': `${this.readToken()}`,
        'Content-Type': 'application/json; charset=utf-8'
    });
    if(sendHeaders){
      return this._httpClient.delete(URL, { headers }).pipe(catchError(this.handleError));
    }
    else{
      return this._httpClient.delete(URL).pipe(catchError(this.handleError));
    }
  }

  postQuery(query:string, data:any, typeHeaders:string='data'){
    const URL = this.server + query;
    let optiones:any;
    if(typeHeaders == 'data'){
      optiones = {
        'Authentication': `${this.readToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      };
    }else {
      if(typeHeaders == this.notoken){
      
        optiones = {
          'Authentication': ``,
          "Accept": "application/json, text/plain, */*",
          'Content-Type': 'application/json; charset=utf-8'
        }
    }else{
        optiones = {
          'Authentication': `${this.readToken()}`,
          "Accept": "application/json",
        }
      }
    }

    const headers = new HttpHeaders(optiones);
    headers.delete('Content-Type');
    return this._httpClient.post(URL, data, { headers }).pipe(catchError(this.handleError));
  }

  postFile(query:string, data:any){
    const URL = this.server2 + query;
    let optiones = {
      'Authentication': `${this.readToken()}`,
    };
    const headers = new HttpHeaders(optiones);
    return this._httpClient.post(URL, data, { headers }).pipe(catchError(this.handleError));
  }

  putQuery(query:string, data:any ,typeHeaders:string='data'){
    const URL = this.server + query;
    let optiones:any;
    if(typeHeaders == 'data'){
      optiones = {
        'Authentication': `${this.readToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      };
    }else {
      if(typeHeaders == this.notoken){
        optiones = {
          "Accept": "application/json",
          'Content-Type': 'application/json; charset=utf-8'
        }
    }else{
        optiones = {
          'Authentication': `${this.readToken()}`,
          "Accept": "application/json",
        }
      }
    }
    const headers = new HttpHeaders(optiones);
    return this._httpClient.put(URL, data, { headers }).pipe(catchError(this.handleError));
  }



  //Funcion para el Manejo de errores
  handleError = (err: HttpErrorResponse): Observable<HttpEvent<any>> =>{
    let errorMessage = 'Unknown error!';
    let icon:string = 'question';
    console.log("Algo se daño");
    let res:any = {}
    if (err.error instanceof ErrorEvent) {
      icon = "question";
      errorMessage = `Error: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 401:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession','true');

          }, 100);
          break;
        case 402:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession','true');
          }, 100);
          break;
        case 403:
            errorMessage = `No tiene permiso para ejecutar esta acción`;
          break;
        case 400:
            if(err.error == 'La session ha expirado'){
              localStorage.clear();
              localStorage.clear();
              setTimeout(() => {
                localStorage.setItem('closeSession','true');

              }, 100);
            }
            if(err.error !== undefined && typeof err.error == 'string'){
              errorMessage = `${err.error}`;
            }
        break;
        case 404:
            errorMessage = `${err.error}`
        break;
        case 500:
            errorMessage = `${err.error.msj}`;
            break;
        default:
          errorMessage = `${err.statusText}`;
          break;
      }
    }
    if(errorMessage !== undefined && errorMessage !== 'undefined' && err.status !== 401 && err.error !== 'La session ha expirado'){
      
    }
    // Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // })
    return throwError( errorMessage );
  }



}