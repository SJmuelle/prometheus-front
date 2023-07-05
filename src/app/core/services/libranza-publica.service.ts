import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LibranzaPublicaService {
    constructor(
        private _http: HttpClient,
        private _appSettings: AppSettingsService
    ) { }

    /**
     * @description: Get datos fabrica Agenda referenciacion
     */
    public guardarDatosBasicos(datos): Observable<any> {
        // return this._http.get(`${this._appSettings.fabricaDatos.url.agendaReferenciacion}`);
        return this._http.post(
            this._appSettings.libranzaPublica.url.guardeBasico,
            datos
        );
    }

    /**
     * @description: Get datos fabrica Agenda referenciacion
     */
    public cargueInicialFormularioCorto(datos): Observable<any> {
        // return this._http.get(`${this._appSettings.fabricaDatos.url.agendaReferenciacion}`);
        return this._http.post(
            this._appSettings.libranzaPublica.url.cargueInicialFormularioCorto,
            datos
        );
    }

    /**
      * @description: post datos actualizar datos para OTP
      */
    public actualizarDatosBasicosOTP(datos): Observable<any> {
        // return this._http.get(`${this._appSettings.fabricaDatos.url.agendaReferenciacion}`);
        return this._http.post(
            this._appSettings.libranzaPublica.url.reCalcularDatosOTP,
            datos
        );
    }

    /**
         * @description: formulario nueva solicitud
         */
    public consultarDatosSolicitudConDocumento(datos): Observable<any> {
        // return this._http.get(`${this._appSettings.fabricaDatos.url.agendaReferenciacion}`);
        return this._http.get(
            this._appSettings.libranzaPublica.url.consultaIdentificacionSolicitud + `/${datos.tipoDocumento}/${datos.documento}`
        );
    }




    /**
        * @description: guardar formulario corto
        */
    public guardarFormularioCorto(datos): Observable<any> {
        // return this._http.get(`${this._appSettings.fabricaDatos.url.agendaReferenciacion}`);
        return this._http.post(
            this._appSettings.libranzaPublica.url.guardarFormularioCorto,
            datos
        );
    }
}
