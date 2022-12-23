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
     * @description: Get datos fabrica Agenda referenciacion
     */
    public getDatosFabricaAgendaReferenciacion(datos): Observable<any> {
        // return this._http.get(`${this._appSettings.fabricaDatos.url.agendaReferenciacion}`);
        return this._http.post(this._appSettings.fabricaDatos.url.agendaReferenciacion, datos);
    }

    /**
     * @description: Get step  Agendabreferenciacuoin
     */
    public obtenerStepsAgendaReferenciacion(datos): Observable<any> {
        const { numeroSolicitud, tipo } = datos;
        return this._http.get(`${this._appSettings.fabricaDatos.url.step}/${numeroSolicitud}/${tipo}`);
    }

    /**
    * @description: resumenes de credito
    */
    public getResumenCredito(datos): Observable<any> {
        // return this._http.get(this._appSettings.fabricaDatos.url.resumenes);
        return this._http.post(this._appSettings.fabricaDatos.url.resumenes, datos);

    }
    /**
* @description: resumenes de credito
*/
    public getHistoricoCliente(datos): Observable<any> {
        // return this._http.get(this._appSettings.fabricaDatos.url.resumenes);
        // return this._http.post(this._appSettings.fabricaDatos.url.historicoCliente, datos);
        const { numeroSolicitud } = datos;
        return this._http.get(`${this._appSettings.fabricaDatos.url.historicoCliente}/${numeroSolicitud}`);
    }

    /**
* @description: resumenes de credito
*/
    public getrazabilidad(datos): Observable<any> {
        // const { numeroSolicitud } = datos;
        // return this._http.get(`${this._appSettings.fabricaDatos.url.trazabilidad}/${numeroSolicitud}`);
        // return this._http.get(this._appSettings.fabricaDatos.url.trazabilidad);
        return this._http.post(this._appSettings.fabricaDatos.url.trazabilidad, datos);

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
    public getCheckList(data): Observable<any> {
        // const { numeroSolicitud, tipoDocumento } = datos;
        // let data = `{"numeroSolicitud": "${numeroSolicitud}", "unidadNegocio": ${32},"tipoIdentificacion": "${tipoDocumento}"}`;

        // return this._http.get(`${this._appSettings.fabricaDatos.url.checklist}/${numeroSolicitud}/32/${tipoDocumento}`);
        return this._http.post(this._appSettings.fabricaDatos.url.checklist, data);
    }


    /**
     * @description: Post Guardar datos fabrica credito
     */
    public postDatosFabricaCredita(data: any): Observable<any> {
        return this._http.post(this._appSettings.fabricaDatos.url.baseCredito, data);
    }

    /**
     * @description: Post Guardar datos fabrica credito
     */
    public postDatosFabricaCreditoReferenciacion(data: any): Observable<any> {
        return this._http.post(this._appSettings.fabricaDatos.url.PostagendaReferenciacion, data);
    }
    /**
     * @description: Get Datos del titular
     */
    public getDatosTitularFabrica(solicitud: string): Observable<any> {
        return this._http.get(`${this._appSettings.fabricaDatos.url.baseRepresentante}/${solicitud}`);
    }

    /**
 * @description: Get Datos del titular
 */
    public busquedaGeneral(data: any): Observable<any> {
        return this._http.post(`${this._appSettings.fabricaDatos.url.trazabilidadBusqueda}`, data);
    }

    /**
* @description: Get Datos del titular
*/
    public trazabilidadBusquedaFiltro(data: any): Observable<any> {
        return this._http.post(`${this._appSettings.fabricaDatos.url.trazabilidadBusquedaFiltro}`, data);
    }
}
