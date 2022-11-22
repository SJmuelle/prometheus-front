import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-configs/app-settings.service';
import {Observable} from "rxjs";
import {map, skipWhile, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CuentasxcobrarService {

  constructor(
    private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }

  public getFacturesFilter(nit: any, vencimiento: any): Observable<any>{
    return this._http.get(`${this._appSettings.transferencias.url.baseFiltro}/${nit}/${vencimiento}`);
  }

  public  getBanco(user: any): Observable<any> {
    return this._http.get(`${this._appSettings.transferencias.url.baseBancos}/${user}`);
  }

  public  getProveedor(): Observable<any> {
    return this._http.get(`${this._appSettings.transferencias.url.baseProveedor}`);
  }

  public  getProveedorFilter(): Observable<any> {
    return this._http.get(`${this._appSettings.transferencias.url.baseProveedor}`).pipe(
      map((response:[]) => response.map(item => item['proveedor']))
    )
  }

  public postTransferencia(datosTransferencia: any): Observable<any> {
    return this._http.post(this._appSettings.transferencias.url.baseTransferencia, datosTransferencia);
  }

  
}
