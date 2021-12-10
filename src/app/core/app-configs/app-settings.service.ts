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
            base: EndPoints.uri('consulta-referencias'),
            baseDetalle: EndPoints.uri('consulta-detalle-referencias'),
            baseReferencia: EndPoints.uriGenerica('cre-actualizar-referencia'),
            baseReferenciaCrear: EndPoints.uriGenerica('cre-agregar-referencia')
        }
    };
    /**
     * @description: End-point comentarios
     */
    public comentarios = {
        url: {
            baseComentario:  EndPoints.uri('cre-consulta-comentarios'),
            baseComentarioCrear: EndPoints.uri('cre-agregar-comentario')
        }
    };
    /**
     * @description: End-point
     */
    public documentos = {
        url: {
            base: EndPoints.uri('documentos-reque'),
            baseAdjunto: EndPoints.uriAdjuntos('adjuntar-archivo'),
            baseConsultar: EndPoints.uriBase('/pqrs/file/load/cre-consultar-documento'),
            baseEliminar: EndPoints.uriGenerica('cre-inactivar-doc')
        }
    };

}
