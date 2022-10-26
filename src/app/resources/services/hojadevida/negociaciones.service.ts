import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NegociacionesService {
    private ruta=environment.apiUrl+'api-fintra/api/generic/qry/';
    titulos: Array<string> = [
        'Código del Negocio',
        'Fecha de Creación',
        'Usuario de Creación',
        'Tipo de Negociación',
        'Detalle',
        'Fecha de Aplicacion',
    ];

    nombres: Array<string> = [
        'codigoNegocio',
        'fechaCreacion',
        'usuarioCreacion',
        'tipoNegociacion',
        'detalle',
        'fechaAplicacion',
    ];

    constructor(private _httpClient: HttpClient) {}

    getNegociaciones(codigoNegocio: string = '') {
        return this._httpClient.get(
           this.ruta +
                `informacion-historial-negociaciones/${codigoNegocio}`
        );
    }
    getInformacionExtractos(codigoNegocio: string = '') {
        return this._httpClient.get(
           this.ruta +
                `informacion-extractos/${codigoNegocio}`
        );
    }
    getReporteCentrales(codigoNegocio: string = '') {
        return this._httpClient.get(
           this.ruta +
                `informacion-reporte-centrales/${codigoNegocio}`
        );
    }
}
