import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HojadevidaService {

  constructor(
    private _httpClient: HttpClient) { }


  getNegocios(cc: number) {
    return this._httpClient.get(environment.urlApi2 + `/generic/qry/informacion-negocios-por-cliente/${cc}`);
  }

  getInfoCliente(nit: number) {
    return this._httpClient.get(environment.urlApi2 + `/generic/qry/informacion-cliente/${nit}`);
  }
}
