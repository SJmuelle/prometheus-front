import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DetalleCreditoService {

    private ruta=environment.apiUrl+'api-fintra/api/generic/qry/';

    constructor(private _httpClient: HttpClient) {}

    getInformacionPersonal(codigoNegocio: string) {
        return this._httpClient.get(
            this.ruta +
                `/informacion-detalle-referencia-laboral/${codigoNegocio}`
        );
    }

    getInformacionReferencias(codigoNegocio: string) {
        return this._httpClient.get(
            this.ruta +
                `/informacion-detalle-referencias/${codigoNegocio}`
        );
    }

    getInformacionCodeudor(codigoNegocio: string) {
        return this._httpClient.get(
            this.ruta +
                `/informacion-detalle-codeudor/${codigoNegocio}`
        );
    }

    getInformacionNegocio(codigoNegocio: string) {
        return this._httpClient.get(
            this.ruta +
                `/informacion-detalle-negocio-cliente/${codigoNegocio}`
        );
    }

    getInformacionConyuge(codigoNegocio: string) {
        return this._httpClient.get(
            this.ruta +
                `/informacion-detalle-conyugue/${codigoNegocio}`
        );
    }
}
