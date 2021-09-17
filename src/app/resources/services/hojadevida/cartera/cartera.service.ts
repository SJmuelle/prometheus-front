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
    
    getDetalleCartera(codigoNegocio: string) {
        let today = new Date();
        let year = today.getFullYear();
        let mesActual = (today.getMonth() + 1); 
        let mes = mesActual>9?'':'0'+mesActual; 
        return this._httpClient.get(
            environment.urlApi2 + `/informacion-detalle-cartera/${year}${mes}/1/${codigoNegocio}`
        );
    }
    getDetalleCarteraTotal(codigoNegocio: string) {
        // /informacion-detalle-cartera/202009/1/MC18825
        let today = new Date();
        let year = today.getFullYear();
        let mesActual = (today.getMonth() + 1); 
        let mes = mesActual>9?'':'0'+mesActual; 
        return this._httpClient.get(
            environment.urlApi2 + `/informacion-detalle-cartera-sum/${year}${mes}/1/${codigoNegocio}`
        );
    }
}
