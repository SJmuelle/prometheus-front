import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppSettingsService } from '../app-configs/app-settings.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FormularioCreditoService {

    constructor(
        private _utilityService: UtilityService,
        private _http: HttpClient,
        private _appSettings: AppSettingsService
    ) { }


    getLatitudLongitud(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.latitudLongitud, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    validatarOTP(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.validarOTP, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    solicitarOTP(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.solicitarGenerarOTP, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    postDatos(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.microcredito, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    postPreSolicitud(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.gurdadoPreSolicitud, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }
    cargueInicial(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.cargueInicial, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }
    cargueInicialLibranza(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.cargueInicialLibranza, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    cargueActividadEconomica(nivelEstudio, tipoActividad, camaraComercio) {
        return this._utilityService.getQuery(`${this._appSettings.formulario.url.cargueActividadEconomica}/${nivelEstudio}/${camaraComercio}/${tipoActividad}`)
            .pipe(map((res: any) => {
                return res;
            }));
    }
    cargueSolicitudesFormularioSimulaciones(tipoDocumento, identificacion, unidadNegocio) {
        return this._utilityService.getQuery(`${this._appSettings.formulario.url.cargueSolicitudesFormularioSimulaciones}/${unidadNegocio}/${tipoDocumento}/${identificacion}`)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    listarCiudadesMicro(departamento) {
        return this._utilityService.getQuery(`${this._appSettings.formulario.url.listarCiudadesMicro}/${departamento}`)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    listarBarriosMicro(ciudad) {
        return this._utilityService.getQuery(`${this._appSettings.formulario.url.listarBarriosMicro}/${ciudad}`)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    asesorMicro(idBarrio) {
        return this._utilityService.getQuery(`${this._appSettings.formulario.url.nombreAsesorMicro}/${idBarrio}`)
            .pipe(map((res: any) => {
                return res;
            }));
    }
    validationPlazoMicro(monto) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.validationPlazoMicro, monto)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    calcularValorCoutaAProximada(data) {
        let options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const body = new HttpParams()
            .set('data', JSON.stringify(data))

        return this._http.post(this._appSettings.formulario.url.calcularValorAprox, body, { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })

    }

    postGuardarFormularioSolicitud(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.guardarFormularioLibranza, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }
    postGuardarFormularioSolicitudLaboral(data) {
        return this._utilityService.postQuery(this._appSettings.formulario.url.guardarFormularioLibranzaLaboral, data)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    public downloadDocument(id: string): Observable<any[]> {
        return this._http.get<any[]>(`${this._appSettings.decision.url.baseArchivo}/${id}`)
    }

}
