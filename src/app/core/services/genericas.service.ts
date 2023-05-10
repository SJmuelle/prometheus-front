import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettingsService } from "../app-configs/app-settings.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenericasService {

    constructor(
        private _http: HttpClient,
        private _appSettings: AppSettingsService
    ) { }

    /**
     * @description: Obtiene listado
     */
    public getEstadoReferencias(): Observable<any> {
        const params: string = 'ESTADO-REFERENCIA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
     * @description: Relacion comercial
     */
    public getRelacionComercial(): Observable<any> {
        return this._http.get(`${this._appSettings.genericas.url.referenciaComercial}`);
    }
    /**
     * @description: Obtiene listado
     */
    public getViveNegocio(): Observable<any> {
        const params: string = 'VIVE-NEGOCIO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description Obtiene el listado de declarante
     */
    public getDeclarante(): Observable<any> {
        const params: string = 'DECLARANTE';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
     * @description: Obtiene listado tipos de vivienda
     */
    public getTipoViviendas(): Observable<any> {
        const params: string = 'TIPO-VIVIENDA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description: Obtiene listado tipos de estados civiles
     */
    public getTipoEstadoCivil(): Observable<any> {
        const params: string = 'ESTADO-CIVIL';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
 * @description: Obtiene listado tipos de estados civiles
 */
    public getTipoCredito(): Observable<any> {
        const params: string = 'TIPO-CREDITO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
* @description: Obtiene listado tipos de estados civiles
*/
    public getTipoContrato(): Observable<any> {
        const params: string = 'TIPO-CONTRATO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description: Obtiene listado tipos de estados civiles
     */
    public getDestinoCredito(): Observable<any> {
        const params: string = 'DESTINO-CREDITO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
    * @description: Obtiene listado tipos de estados civiles
    */
    public getestrato(): Observable<any> {
        const params: string = 'ESTRATO-CASA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
     * @description: Obtiene listado de camara de comercio
     */
    public getCamaraComercio(): Observable<any> {
        const params: string = 'CAMARA-COMERCIO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description Obtiene listado tipos de documentos
     */
    public getTiposDocumentos(): Observable<any> {
        const params: string = 'TIPO-DOCUMENTO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description Obtiene listado generos
     */
    public getGeneros(): Observable<any> {
        const params: string = 'GENERO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description: Obtiene nivel de estudii
     */
    public getNivelEstudio(): Observable<any> {
        const params: string = 'NIVEL-ESTUDIO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
     * @description: Obtiene nivel de estudii
     */
    public getPagadurias(): Observable<any> {
        const params: string = 'pagadurias';
        return this._http.get(`${this._appSettings.genericas.url.basetk}/${params}`);
    }
    /**
     * @description: Obtiene nivel de estudii
     */
    public getTipoServicios(): Observable<any> {
        const params: string = 'TIPO-SERVICIO-PLEXA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
    * @description: Obtiene nivel de estudii
     */
    public getTurnoVehiculos(): Observable<any> {
        const params: string = 'TIPO-JORNADA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
    * @description: Obtiene nivel de estudii
     */
    public getTipoCombustibles(): Observable<any> {
        const params: string = 'TIPO-COMBUSTIBLE';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description: Obtiene nivel de estudii
     */
    public getlistadoOcupaciones(): Observable<any> {
        const params: string = 'listado-ocupaciones';
        return this._http.get(`${this._appSettings.genericas.url.basetk}/${params}`);
    }
    public postActividadEconomica(ocupacion: string): Observable<any> {
        let data = {
            ocupacion: ocupacion
        }
        return this._http.post(this._appSettings.busquedaActividadEconomica.url.base, data);
    }
    /**
        * @description: obtiene nivel de estudii
        */
    public getTipoCuentaBancaria(): Observable<any> {
        const params: string = 'TIPO-CUENTA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
    * @description: obtiene nivel de estudii
    */
    public getEstadoCuenta(tipo): Observable<any> {
        // const params: string = 'ESTADO-CUENTA';
        let data = {
            tipo: tipo
        }
        return this._http.post(`${this._appSettings.busquedaEstadoCuenta.url.base}`, data);
    }
    /**
     * @description: obtiene nivel de estudii
     */
    public getSalarioBasico(): Observable<any> {
        // const params: string = 'ESTADO-CUENTA';
        let data = {

        }
        return this._http.post(`${this._appSettings.salarioBasico.url.base}`, data);
    }
    /**
    * @description: Obtiene nivel de estudii
    */
    public getEntidadBancaria(): Observable<any> {
        const params: string = 'obtener-bancos';
        return this._http.get(`${this._appSettings.genericas.url.basetk}/${params}`);
    }
    /**
* @description: Obtiene nivel de estudii
*/
    public getEntidadBancariaConsumo(): Observable<any> {
        const params: string = 'obtener-bancos-consumo';
        return this._http.get(`${this._appSettings.genericas.url.basetk}/${params}`);
    }
    /**
    * @description: Obtiene nivel de estudii
    */
    public getAplicaIngresos(): Observable<any> {
        const params: string = 'APLICA-INGRESOS';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description: Obtiene listado de tipos de referencia
     */
    public getTiposReferencias(): Observable<any> {
        const params: string = 'TIPO-REFERENCIA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
     * @description: Obtiene listado de tipos de referencia
     */
    public getTiposReferenciasXsolicitud(numeroSolicitud): Observable<any> {
        // const params: string = 'TIPO-REFERENCIA';
        return this._http.get(`${this._appSettings.referenciaCliente.url.tipoReferencia}/${numeroSolicitud}`);

        // return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
     * @description: Obtiene listado de tipos de referencia
     */
    public getTiposTercero(numeroSolicitud): Observable<any> {
        // const params: string = 'TIPO-REFERENCIA';
        return this._http.get(`${this._appSettings.referenciaCliente.url.tipoTercero}/${numeroSolicitud}`);

        // return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
   * @description: Obtiene listado de tipos de referencia
   */
    public getTiposCompra(): Observable<any> {
        const params: string = 'TIPO-COMPRA';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }


    /**
   * @description: Obtiene listado de tipos de referencia
   */
    public getParametriaTipoCredito(data: string): Observable<any> {

        return this._http.get(`${this._appSettings.parametriaTipoCredito.url.base}/${data}`);
    }

    /**
 * @description: Obtiene listado de tipos de Paretensco
 */
    public getParetensco(): Observable<any> {
        const params: string = 'PARENTESCO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }

    /**
    * @description: Obtiene listado de tipos de Paretensco
    */
    public getSelectDinamico(data): Observable<any> {

        return this._http.get(`${this._appSettings.genericas.url.base}/${data}`);
    }

    /**
* @description: Obtiene listado de tipos de Paretensco
*/
    public getTipoVia(): Observable<any> {
        const params: string = 'nomenclarturas';
        return this._http.get(`${this._appSettings.genericas.url.basetk}/${params}`);
    }

    /**
    * @description:
    */
    public postBusquedaEntidadFinanciera(nombre: string): Observable<any> {
        let data = {
            nombreEntidad: nombre
        }
        return this._http.post(this._appSettings.busquedaEntidadFinanciera.url.base, data);
    }

    /**
    * @description:
    */
    public postReCalcularSolicitudMicro(data: any): Observable<any> {

        return this._http.post(this._appSettings.agendaReferenciacion.url.reCalcularSolicitudMicro, data);
    }
    
    /**
  * @description: Obtiene unidades de negocio
  */
    public getUnidadesNegocio(): Observable<any> {
        const params: string = 'UNIDAD-NEGOCIO';
        return this._http.get(`${this._appSettings.genericas.url.base}/${params}`);
    }
    /**
     * @description: Obtiene estados de creditos
     */
    public getEstadoCredito(): Observable<any> {
        const params: string = 'estados-creditos';
        return this._http.get(`${this._appSettings.genericas.url.basetk}/${params}`);
    }
    /**
     * @description: Obtiene los subestados
     */
    public postSubEstados(data: any): Observable<any> {
        const params: string = 'subestados-creditos';
        return this._http.get(`${this._appSettings.genericas.url.basetk}/${params}/${data}`);
    }

    /**
     * @description: Obtiene numero de negocio
     */
    public getUnidadNegocio(numSolicitud: string): Observable<any> {
        return this._http.get(`${this._appSettings.genericas.url.unidadNegocio}/${numSolicitud}`);
    }

}
