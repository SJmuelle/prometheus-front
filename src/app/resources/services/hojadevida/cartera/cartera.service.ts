import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CarteraService {
    constructor(private _httpClient: HttpClient) {}

    getCartera(codigoNegocio: string) {
        return this._httpClient.get(
            environment.urlApi2 + `/informacion-cartera/${codigoNegocio}`
        );
    }
}
