import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-configs/app-settings.service';
import {Observable} from "rxjs";

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

  public  getBanco(): Observable<any> {
    return this._http.get(`${this._appSettings.transferencias.url.baseBancos}`);
  }

  public  getProveedor(): Observable<any> {
    return this._http.get(`${this._appSettings.transferencias.url.baseProveedor}`);
  }

  public postTransferencia(datosTransferencia: any): Observable<any> {
    return this._http.post(this._appSettings.transferencias.url.baseTransferencia, datosTransferencia);
  }

  
}
