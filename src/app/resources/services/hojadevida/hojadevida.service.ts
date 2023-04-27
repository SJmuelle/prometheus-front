import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { UtilityService } from '../utility.service';

@Injectable({
    providedIn: 'root',
})
export class HojadevidaService {

    private ruta=environment.apiUrl+'api-fintra/api/generic/qry/';

    constructor(
        private _httpClient: HttpClient,
        private _utility: UtilityService
    ) {}

    getNegocios(cc: number) {
        // 
        let url: string = `informacion-negocios-por-cliente/${cc}`;
        return this._utility.getQuery(url, true).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }

    getInfoCliente(nit: any) {
        return this._httpClient.get(
            this.ruta + `informacion-cliente/${nit}`
        );
    }

    getInfoCertificadoPazySalvo(documento: string) {
        let url = `certificado-informacion-pazysalvo/${documento}`;
        return this._utility.getQuery(url, true).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getCertificadoInfoGeneral(documento: string, fecha: string) {
        let url = `/certificado-informacion-general`;
        return this._utility
            .postQuery(url, { documento: documento, fecha: fecha })
            .pipe(
                map((res: any) => {
                    return res;
                })
            );
    }
}
