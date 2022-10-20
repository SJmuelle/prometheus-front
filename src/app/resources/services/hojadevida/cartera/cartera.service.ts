import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { UtilityService } from '../../utility.service';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class CarteraService {
    constructor(private _httpClient: HttpClient,private _utility: UtilityService) { }

    getCartera(cedula: string) {
        let url;
        url = environment.urlApi2 + `informacion-cartera/${cedula}`;
        return this._httpClient.get(url);
    }

    getDetalleCartera(codigoNegocio: string) {
        let today = new Date();
        let year = today.getFullYear();
        let mesActual = (today.getMonth() + 1);
        let mes = mesActual > 9 ? mesActual : '0' + mesActual;
        return this._httpClient.get(
            environment.urlApi2 + `informacion-detalle-cartera/${year}${mes}/1/${codigoNegocio}`
        );
    }
    getDetalleCarteraTotal(codigoNegocio: string,id) {
        // /informacion-detalle-cartera/202009/1/MC18825
        let today = new Date();
        let year = today.getFullYear();
        let mesActual = (today.getMonth() + 1);
        let mes = mesActual > 9 ? mesActual : '0' + mesActual;
        return this._httpClient.get(
            environment.urlApi2 + `informacion-detalle-cartera-sum/${year}${mes}/${id}/${codigoNegocio}`
        );
    }
    getIngreso(codigo: string) {
        // /informacion-detalle-cartera/202009/1/MC18825

        return this._httpClient.get(
            environment.urlApi2 + `informacion-ingresos/${codigo}`
        );
    }
    getDetalleIngreso(codigo: any,tipo:any, dstrct:any) {
        // {{generic}}/informacion-detalle-ingresos/IA590985/ICA/FINV
        return this._httpClient.get(
            environment.urlApi2 + `informacion-detalle-ingresos/${codigo}/${tipo}/${dstrct}`
        );
    }
    getPlanPago(codigo) {

        // // console.log(this.readToken());
        const URL = `${environment.urlprometheus}?option=5&user=${codigo}&numsolc=${codigo}`
        const headers = new HttpHeaders({
            'Authentication' : ``
        });
        // console.log(headers);
        return this._httpClient.get(URL, { headers }).pipe();
    }
}
