import { Injectable } from '@angular/core';
import {EndPoints} from './end-points';

@Injectable()
export class AppSettingsService {
    /**
     * @description: End-point agenda de completacion
     */
    public agendaCompletacion = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/CO')
        }
    };
    /**
     * @description: End-point agenda de referenciacion
     */
    public agendaReferenciacion = {
        url: {
            base: EndPoints.uri('/generic/qry/agenda-credito/RE')
        }
    };
    /**
     * @description: End-point fabrica de datos
     */
    public fabricaDatos = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-fabrica'),
            baseCredito: EndPoints.uri('/credito/tk/recursos/fabrica-tab-titular'),
            baseRepresentante: EndPoints.uri('/generic/qry/informacion-representante-legal')
        }
    };
    /**
     * @description: End-point departamentos
     */
    public departamentos =  {
        url: {
            base: EndPoints.uri('/generic/qry/departamentos')
        }
    };
    /**
     * @description: End-point ciudades
     */
    public ciudades = {
        url: {
            base: EndPoints.uri('/generic/qry/ciudades')
        }
    };
    /**
     * @description: End-point Barrios
     */
    public barrios = {
        url: {
            base: EndPoints.uri('/generic/qry/barrios')
        }
    };
    /**
     * @description: End-point Listas genericas
     */
    public genericas = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-lista-generica')
        }
    };
    /**
     * @description: End-point referencias
     */
    public referencias = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-referencias'),
            baseDetalle: EndPoints.uri('/generic/qry/consulta-detalle-referencias'),
            baseReferencia: EndPoints.uri('/generic/cre-actualizar-referencia'),
            baseReferenciaCrear: EndPoints.uri('/generic/cre-agregar-referencia'),
            baseCliente: EndPoints.uri('/generic/actualizar-nits-referencias'),
            baseNegocio: EndPoints.uri('/generic/cre-actualizar-info-negocio-ref'),
        }
    };
    /**
     * @description: End-point comentarios
     */
    public comentarios = {
        url: {
            baseComentario:  EndPoints.uri('/generic/qry/cre-consulta-comentarios'),
            baseComentarioCrear: EndPoints.uri('/generic/cre-agregar-comentario')
        }
    };
    /**
     * @description: End-point
     */
    public documentos = {
        url: {
            base: EndPoints.uri('/generic/qry/documentos-requeridos-fabrica'),
            baseAdjunto: EndPoints.uri('/archivos/guardar/adjuntar-archivo'),
            baseConsultar: EndPoints.uri('/pqrs/file/load/cre-consultar-documento'),
            baseEliminar: EndPoints.uri('/generic/cre-inactivar-doc')
        }
    };
    /**
     * @description: End-point
     */
    public decision = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-lista-generica/DECISION'),
            baseDecision: EndPoints.uri('/credito/cre-decision'),
            cambioEstado: EndPoints.uri('/generic/cre-cambio-estado-agenda'),
            baseCausal: EndPoints.uri('/generic/qry/cau-rechazo')
        }
    };
    /**
     * @description: End-Point
     */
    public politicas = {
        url: {
            base: EndPoints.uri('/generic/qry/cre-politicas-adm')
        }
    };
    /**
     * @description: End-point
     */
    public referenciaCliente = {
        url: {
            base: EndPoints.uri('/generic/qry/informacion-cliente-referenciar'),
            baseReferecia: EndPoints.uri('/generic/cre-referenciar'),
            baseReprogramar: EndPoints.uri('/generic/cre-reprogramar-solicitud')
        }
    };
}
