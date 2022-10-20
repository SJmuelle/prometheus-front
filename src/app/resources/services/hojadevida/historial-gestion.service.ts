import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHistorialGestion } from 'app/resources/interfaces/hojadevida/ihistorial-gestion';
import { environment } from 'environments/environment';
import { List } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class HistorialGestionService {
    private ruta=environment.apiUrl+'api-fintra/api/generic/qry/';
    titulos: Array<any> = [
        'Fecha de Gestión',
        'Gestor',
        'Tipo de Gestión',
        'Detalle de la Gestión',
        'Próxima Acción',
        'Fecha Próxima Acción',
    ];

    nombres: Array<string> = [
        'fechaGestion',
        'gestor',
        'tipoGestion',
        'detalleGestion',
        'proximaAccion',
        'fechaProxAccion',
    ];

    iGestion: List<IHistorialGestion> = [];

    constructor(private _httpClient: HttpClient) {}

    getHistorialGestion(codigoNegocio: string = '') {
        return this._httpClient.get(
            this.ruta +
                `informacion-historial-gestion/${codigoNegocio}`
        );
    }
}
