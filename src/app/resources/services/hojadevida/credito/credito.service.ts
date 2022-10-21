import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CreditoService {
    private ruta=environment.apiUrl+'api-fintra/api/generic/qry/';
    constructor(private _httpClient: HttpClient) {}

    getCredito(codigoNegocio: string) {
        return this._httpClient.get(
            this.ruta + `informacion-credito/${codigoNegocio}`
        );
    }
}
