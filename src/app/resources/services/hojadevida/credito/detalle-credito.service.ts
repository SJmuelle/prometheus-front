import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DetalleCreditoService {
    constructor(private _httpClient: HttpClient) {}

    getInformacionPersonal(codigoNegocio: string) {
        return this._httpClient.get(
            environment.urlApi2 +
                `/informacion-detalle-referencia-laboral/${codigoNegocio}`
        );
    }

    getInformacionReferencias(codigoNegocio: string) {
        return this._httpClient.get(
            environment.urlApi2 +
                `/informacion-detalle-referencias/${codigoNegocio}`
        );
    }

    getInformacionCodeudor(codigoNegocio: string) {
        return this._httpClient.get(
            environment.urlApi2 +
                `/informacion-detalle-codeudor/${codigoNegocio}`
        );
    }

    getInformacionNegocio(codigoNegocio: string) {
        return this._httpClient.get(
            environment.urlApi2 +
                `/informacion-detalle-negocio-cliente/${codigoNegocio}`
        );
    }

    getInformacionConyuge(codigoNegocio: string) {
        return this._httpClient.get(
            environment.urlApi2 +
                `/informacion-detalle-conyugue/${codigoNegocio}`
        );
    }
}
