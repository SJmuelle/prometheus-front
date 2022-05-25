import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FabricaCreditoService {
    public seleccionDatos: BehaviorSubject<{ data: any; show?: boolean }> = new BehaviorSubject<{ data: any; show: boolean }>({ data: '', show: false });
    constructor(
        private _http: HttpClient,
        private _appSettings: AppSettingsService
    ) { }

    /**
     * @description: Get datos fabrica Agenda
     */
    public getDatosFabricaAgenda(datos): Observable<any> {
        const { numeroSolicitud, identificacion } = datos;
        return this._http.get(`${this._appSettings.fabricaDatos.url.base}/${numeroSolicitud}/${identificacion}/T`);
    }

    /**
     * @description: Get step  Agendabreferenciacuoin
     */
    public obtenerStepsAgendaReferenciacion(datos): Observable<any> {
        const { numeroSolicitud } = datos;
        return this._http.get(`${this._appSettings.fabricaDatos.url.step}/${numeroSolicitud}`);
    }


    /**
     * @description: Get datos fabrica Agenda
     */
    public getCantidadDatos(datos): Observable<any> {
        const { numeroSolicitud, identificacion } = datos;
        return this._http.get(`${this._appSettings.fabricaDatos.url.baseCheck}/${numeroSolicitud}/${identificacion}/T`);
    }

    /**
 * @description: Get datos fabrica Agenda
 */
    public getCheckList(datos): Observable<any> {
        const { numeroSolicitud, tipoDocumento } = datos;
        return this._http.get(`${this._appSettings.fabricaDatos.url.checklist}/${numeroSolicitud}/32/${tipoDocumento}`);
    }


    /**
     * @description: Post Guardar datos fabrica credito
     */
    public postDatosFabricaCredita(data: any): Observable<any> {
        return this._http.post(this._appSettings.fabricaDatos.url.baseCredito, data);
    }
    /**
     * @description: Get Datos del titular
     */
    public getDatosTitularFabrica(solicitud: string): Observable<any> {
        return this._http.get(`${this._appSettings.fabricaDatos.url.baseRepresentante}/${solicitud}`);
    }

}
