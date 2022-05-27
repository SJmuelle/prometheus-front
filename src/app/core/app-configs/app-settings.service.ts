import { Injectable } from '@angular/core';
import { EndPoints } from './end-points';

@Injectable()
export class AppSettingsService {
    /**
     * @description: End-point agenda de completacion
     */
    public agendaCompletacion = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/CO'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/CO')
        }
    };
    /**
     * @description: End-point agenda de referenciacion
     */
    public agendaReferenciacion = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/RE'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/RE'),
            tipoReferenciacion: EndPoints.uri('/credito/tk/property/cards-informacion-refenciacion')
        }
    };
    /**
     * @description: End-point fabrica de datos
     */
    public fabricaDatos = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-fabrica'),
            baseCredito: EndPoints.uri('/credito/tk/recursos/fabrica-tab-titular'),
            baseRepresentante: EndPoints.uri('/generic/qry/informacion-representante-legal'),
            baseCheck: EndPoints.uri('/generic/qry/informacion-representante-legal'),
            checklist: EndPoints.uri('/generic/qry/obtener-items-chequeo-credito'),
            step: EndPoints.uri('/generic/qry/obtener-steps-agenda-referenciacion'),
            agendaReferenciacion: EndPoints.uri('/credito/obtener-info-referencia-tipo'),
        }
    };
    /**
     * @description: End-point departamentos
     */
    public departamentos = {
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
            baseComentario: EndPoints.uri('/generic/qry/cre-consulta-comentarios'),
            baseComentarioCrear: EndPoints.uri('/generic/cre-agregar-comentario')
        }
    };
    /**
    * @description: End-point comentarios para devolver Fabrica
    */
    public comentariosDevolverFabrica = {
        url: {
            baseComentarioCrear: EndPoints.uri('/credito/tk/formulario-solicitud-tabs')
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
            baseEliminar: EndPoints.uri('/archivos/inactivar/cre-inactivar-doc'),
            baseHistorico: EndPoints.uri('/archivos/consulta-historico-documentos-fabrica')
        }
    };
    /**
     * @description: End-point
     */
    public decision = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-lista-generica/DECISION'),
            baseDecision: EndPoints.uri('/generic/cre-decision'),
            cambioEstado: EndPoints.uri('/generic/cre-cambio-estado-agenda'),
            baseCausal: EndPoints.uri('/generic/qry/cau-rechazo'),
            validaCampos: EndPoints.uri('/credito/validar-campos-solicitud')
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
    /**
     * @description: End-point devoluciones
     */
    public devoluciones = {
        url: {
            baseDevolucion: EndPoints.uri('/generic/qry/obtener-devoluciones'),
            baseDevolucionCrear: EndPoints.uri('/credito/tk/formulario-solicitud-tabs'),
            baseDevolucionCausal: EndPoints.uri('/generic/qry/causales-devolucion')
        }
    };
    /**
     * @description: End-point agenda comercial
     */
    public agendaComercial = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/CM'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/CM')
        }
    };
}
