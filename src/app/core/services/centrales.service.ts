import { HttpClient } from '@angular/common/http';
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
}
