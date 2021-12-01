import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentosAdjuntosService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }

    /**
     * @description: Get documentos requeridos
     */
    public getDocumentos(datos: any): Observable<any> {
        const {numeroSolicitud, tipoDocumento} = datos;
        return this._http.get(`${this._appSettings.documentos.url.base}/32/${numeroSolicitud}/${tipoDocumento}`);
    }
    /**
     * @description: Adjuntar documentos
     */
    public adjuntarDocumento(data: any): Observable<any> {
        return this._http.post(`${this._appSettings.documentos.url.baseAdjunto}`, data);
    }
    /**
     * @description: Post Consulta documentos
     */
    public getDocumento(datos: any): Observable<any> {
        // const {numeroSolicitud, tipoDocumento} = datos;
        return this._http.post(this._appSettings.documentos.url.baseConsultar, datos);
    }
}
