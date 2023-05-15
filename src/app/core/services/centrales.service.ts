import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
    providedIn: 'root',
})
export class CentralesService {
    constructor(
        private _http: HttpClient,
        private _appSettings: AppSettingsService
    ) {}

    /*
     * @description: Obtiene los datos de centrales
     */
    public getComentarios(datos: any): Observable<any> {
        return this._http.post(this._appSettings.centrales.url.base, datos);
    }

     /*
     * @description: Obtenner historial credito
     */
     public getHistorialCredit(datos: any): Observable<any> {
        return this._http.post(this._appSettings.centrales.url.historialCredit, datos);
    }

     /*
     * @description: Obtenner historial credito
     */
     public postRenovarConsultaCredit(datos: any): Observable<any> {
        const body = new URLSearchParams();
        body.set('data', JSON.stringify(datos));
        
        return this._http.put('https://prometheus.fintra.co:8443/fintracredit/webresources/hdc/credit_history_fintra', body.toString(),{
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
    }
}
