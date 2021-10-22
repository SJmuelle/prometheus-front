import { Injectable } from '@angular/core';
import {EndPoints} from './end-points';

@Injectable()
export class AppSettingsService {
    /**
     * @description: End-point agenda de completacion
     */
    public agendaCompletacion = {
        url: {
            base: EndPoints.uri('agendas-credito/CO')
        }
    };
    /**
     * @description: End-point agenda de referenciacion
     */
    public agendaReferenciacion = {
        url: {
            base: EndPoints.uri('agenda-credito/RE')
        }
    };
    /**
     * @description: End-point fabrica de datos
     */
    public fabricaDatos = {
        url: {
            base: EndPoints.uri('consulta-fabrica'),
            baseCredito: EndPoints.uriCredito('fabrica-tab-titular'),
            baseRepresentante: EndPoints.uri('informacion-representante-legal')
        }
    };
    /**
     * @description: End-point departamentos
     */
    public departamentos =  {
        url: {
            base: EndPoints.uri('departamentos')
        }
    };
    /**
     * @description: End-point ciudades
     */
    public ciudades = {
        url: {
            base: EndPoints.uri('ciudades')
        }
    };
    /**
     * @description: End-point Barrios
     */
    public barrios = {
        url: {
            base: EndPoints.uri('barrios')
        }
    };
    /**
     * @description: End-point Listas genericas
     */
    public genericas = {
        url: {
            base: EndPoints.uri('consulta-lista-generica')
        }
    };
    /**
     * @description: End-point referencias
     */
    public referencias = {
        url: {
            base: EndPoints.uri('consulta-referencias')
        }
    };




}
