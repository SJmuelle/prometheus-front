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
     * @description: End-point agenda de completacion
     */
    public agendaFormalizacion = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/FO'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/FO')
        }
    };
    /**
     * @description: End-point pagaduria
     */
    public pagaduria = {
        url: {
            base: EndPoints.uriPaga('api-fintra/api/generic/qry/solicitudes-pagaduria/IDPAGADURIA/RL/P'),
            baseSoli: EndPoints.uriPaga('api-fintra/api/generic/qry/solicitudes-pagaduria/IDPAGADURIA'),
            baseUpdate: EndPoints.uriPaga('api-fintra/api/generic/update-solicitud-pagaduria'),
            baseObli: EndPoints.uriPaga('api-fintra/api/generic/qry/obligaciones-comprar'),
            baseArchivo: EndPoints.uriPaga('api-fintra/api/archivos/documentos-negocio')
        }
    };
    /**
     * @description: End-point de pago masivo
     */
    public transportadora = {
        url: {
            base: EndPoints.uri('/generic/qry/detalle-pronto-pago'),
            basePropietario: EndPoints.uri('/generic/qry/negociacion-pronto-pago'),
            baseAceptar: EndPoints.uri('/generic/aceptacion-pronto-pago'),
            baseRechazar: EndPoints.uri('/generic/rechazar-negociacion-pronto-pago'),
            baseTransportadora: EndPoints.uri('/generic/qry/transportadoras'),
            baseActualizar: EndPoints.uri('/generic/update-porcentaje-pronto-pago'),
            baseTrazabilidad: EndPoints.uri('/generic/trazabilidad-pronto-pago')
        }
    };

    /**
     * @description: End-point de pago masivo
     */
    public pago = {
        url: {
            base: EndPoints.uri('/generic/aplicacion-pago-finl'),
            baseConvenios: EndPoints.uri('/generic/qry/convenios-unidad-negocio-finl'),
            baseUpdateConvenios: EndPoints.uri('/generic/update-convenio-finl')
        }
    };
    public excepcionCredito = {
        url: {
            buscarPorSellect: EndPoints.uri('/credito/tk/property/asignacion-solicitudes-creditos')
        }
    }

    /**
     * @description: End-point asignacion de creditos
     */
    public asignacion = {
        url: {
            base: EndPoints.uri('/credito/tk/property/asignacion-solicitudes-creditos'),
            baseAsesor: EndPoints.uri('/generic/qry/tk/listado-analista'),
            guardarAsesor: EndPoints.uri('/generic/tk/guardar-analista'),
            actualizarAsesor: EndPoints.uri('/generic/tk/actualizar-analista'),
            baseUnidades: EndPoints.uri('/generic/qry/tk/listado-tipos-negocios'),
        }
    };
    /**
     * @description: End-point agenda de referenciacion
     */
    public agendaReferenciacion = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/RE'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/RE'),
            tipoReferenciacion: EndPoints.uri('/credito/tk/property/cards-informacion-refenciacion'),
            reCalcularSolicitudMicro: EndPoints.uri('/generic/recalcular-solicitud-micro')
        }
    };
    /**
 * @description: End-point agenda de Decision
 */
    public agendaCartera = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/GC'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/GC'),
            validarNit: EndPoints.uri('/generic/cre-validar-nit-entidad'),
            entidadesNombres: EndPoints.uri('/generic/cre-consultar-entidades-nombre')
        }
    };

    /**
* @description: End-point agenda de venta
*/
    public agendaVenta = {
        url: {
            base: EndPoints.uri('/generic/qry/tk/agenda-ventas-digitales'),
        }
    };

    public formulario = {
        url: {
            // https://prometheus.fintra.co:8443/api-fintra/api/credito/tk/property/parametros-cargue-inicial
            latitudLongitud: EndPoints.alfa('/geocoding-address'),
            microcredito: EndPoints.uri('/credito/microcredito/guardado-solicitud-microcredito'),
            cargueInicial: EndPoints.uri('/credito/tk/property/parametros-cargue-inicial'),
            cargueActividadEconomica: EndPoints.uri('/generic/qry/obtener-actividades-form-micro'),
            cargueSolicitudesFormularioSimulaciones: EndPoints.uri('/generic/qry/solicitudes-formulario-simulaciones'),
            listarCiudadesMicro: EndPoints.uri('/generic/qry/listar-ciudades-micro'),
            listarBarriosMicro: EndPoints.uri('/generic/qry/listar-barrios-micro'),
            nombreAsesorMicro: EndPoints.uri('/generic/qry/nombre-asesor-micro'),
            validationPlazoMicro: EndPoints.uri('/generic/validacion-plazos-microcredito'),
            validarOTP: EndPoints.uri('/firma/solicitud-validar-otp'),
            gurdadoPreSolicitud: EndPoints.uri('/generic/guardado-pre-solicitud-microcredito'),
            solicitarGenerarOTP: EndPoints.uri('/firma/solicitud-generar-otp'),
            calcularValorAprox: EndPoints.uriPaga('fintracredit/webresources/hdc/calculate_value')
        }
    }
    /**
     * @description: End-point fabrica de datos
     */
    public fabricaDatos = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-fabrica'),
            informacionTercero: EndPoints.uri('/generic/qry/informacion-tipo-tercero'),
            baseCredito: EndPoints.uri('/credito/tk/recursos/fabrica-tab-titular'),
            baseCreditoCodeudor: EndPoints.uri('/credito/microcredito/guardado-codeudor-microcredito'),
            baseCreditoSolitario: EndPoints.uri('/credito/microcredito/guardado-solidario-microcredito'),
            baseRepresentante: EndPoints.uri('/generic/qry/informacion-representante-legal'),
            baseCheck: EndPoints.uri('/generic/qry/informacion-representante-legal'),
            checklist: EndPoints.uri('/generic/obtener-items-chequeo-credito'),
            step: EndPoints.uri('/generic/qry/obtener-steps-agenda-referenciacion'),
            agendaReferenciacion: EndPoints.uri('/credito/obtener-info-referencia-tipo'),
            agendaReferenciacionPregunta: EndPoints.uri('/credito/fabrica/consulta-preguntas-referenciacion'),
            agendaReferenciacionInformacion: EndPoints.uri('/generic/qry/informacion-titular-referenciacion'),
            agendaReferenciacionGuardarPregunta: EndPoints.uri('/credito/fabrica/guardado-preguntas-referenciacion'),
            PostagendaReferenciacion: EndPoints.uri('/credito/tk/formulario-solicitud-tabs'),
            resumenes: EndPoints.uri('/credito/tk/property/cards-informacion-decision'),
            historicoCliente: EndPoints.uri('/generic/qry/obtener-otros-creditos-vigentes'),
            trazabilidad: EndPoints.uri('/credito/tk/array-padre-hija/recursos-consulta-trazabilidad'),
            trazabilidadBusqueda: EndPoints.uri('/generic/agendas-credito-trazabilidad'),
            trazabilidadBusquedaFiltro: EndPoints.uri('/credito/tk/property/trazabilidad-solicitudes-creditos'),
            autorizarConsultaOTP: EndPoints.uri('/generic/autoriza-consultas-otp'),
            getRolID: EndPoints.uri('/generic/qry/tk/obtener-rol-id-usuario')
        }
    };

    public libranzaPublica = {
        url: {
            guardeBasico: EndPoints.uri('/generic/lp-guardar-datos-basico'),
            cargueInicialFormularioCorto: EndPoints.uri('/credito/tk/property/libranza-cargue-inicial'),
            reCalcularDatosOTP: EndPoints.uri('/generic/guardado-datos-basicos-otp'),
            consultaIdentificacionSolicitud: EndPoints.uri('/generic/qry/consulta-identificacion-solicitud'),
            guardarFormularioCorto: EndPoints.uri('/credito/libranzap/guardar-solicitud-libranza-publica'),
            guardarTitular: EndPoints.uri('/generic/lp-tab-titular')
        }
    }
    /**
     * http://demo.fintra.co:8011//api-fintra/api/credito/tk/property/cards-informacion-decision
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
            base: EndPoints.uri('/generic/qry/consulta-lista-generica'),
            basetk: EndPoints.uri('/generic/qry/tk'),
            unidadNegocio: EndPoints.uri('/generic/qry/obtener-unidad-negocio'),
            referenciaComercial: EndPoints.uri('/generic/qry/consulta-lista-generica/RELACION-COMERCIAL')
        }
    };
    /**
     * @description: End-point Transferencias
     */
    public transferencias = {
        url: {
            baseTransferencia: EndPoints.uriBase('/transferencia/transferencia-cxp-proveedor'),
            baseProveedor: EndPoints.uriBase('/generic/qry/buscar-proveedor'),
            baseBancos: EndPoints.uriBase('/generic/qry/bancos-transferencia/JHSALAZAR'),
            baseFiltro: EndPoints.uriBase('/generic/qry/cxp-proveedor'),
        }
    };
    /**
     * @description: End-point Archivos de transferencias
     */
    public archivos = {
        url: {
            ListFiles: EndPoints.uriBase('/generic/qry/tk/transferencia-consultar-achivo'),
            DownFile: EndPoints.uriBase('/transferencia/obtener-achivo-base64')
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
            agregarReferencia: EndPoints.uri('/generic/cre-agregar-referencia'),
            actualizarReferencia: EndPoints.uri('/generic/cre-actualizar-referencia')
        }
    };
    /**
     * @description: End-point referencias
     */
    public conductores = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-conductores'),
            baseConductoresCrear: EndPoints.uri('/generic/cre-agregar-conductor-consumo'),
            baseConductores: EndPoints.uri('/generic/cre-actualizar-conductor-consumo'),
        }
    };
    /**
     * @description: End-point comentarios
     */
    public comentarios = {
        url: {
            baseComentario: EndPoints.uri('/generic/qry/cre-consulta-comentarios'),
            baseComentarioCrear: EndPoints.uri('/generic/cre-agregar-comentario'),
            tipoComentario: EndPoints.uri('/generic/qry/consulta-lista-generica/TIPO-COMENTARIO'),
        }
    };
    /**
 * @description: End-point comentarios
 */
    public obtenerAgendaSolicitud = {
        url: {
            base: EndPoints.uri('/generic/qry/obtener-agenda-solicitud'),
        }
    };
    /**
* @description: End-point comentarios
*/
    public parametriaTipoCredito = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-parametria-negocios'),
        }
    };
    /**
/**
* @description: End-point comentarios
*/
    public centrales = {
        url: {
            base: EndPoints.uri('/credito/historico-centrales-api-fintra'),
            historialCredit: EndPoints.uri('/credito/generic/info-historial-credit'),
            consultaHistorialExcepcion: EndPoints.uri('/credito/microcredito/consultar-historial-credito-excepcion'),
            renovarConsultaCredit: EndPoints.uri('fintracredit/webresources/hdc/credit_history_fintra'),
            filtrosDurosMicro: EndPoints.uri('/generic/filtro-duros-microcredito')
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
            baseConsultar: EndPoints.uri('/archivos/obtener/cre-consultar-documento'),
            baseEliminar: EndPoints.uri('/archivos/inactivar/cre-inactivar-doc'),
            baseHistorico: EndPoints.uri('/archivos/consulta-historico-documentos-fabrica')
        }
    };
    /**
     * @description: End-point
     */
    public decision = {
        url: {
            base: EndPoints.uri('/generic/qry/consulta-lista-generica/'),
            comprobacionCampos: EndPoints.uri('/deceval/mostrar-pagare-pdf-general'),
            generarNumeroPagare: EndPoints.uri('/generic/tk/generar-numero-pagare'),
            baseDecision: EndPoints.uri('/credito/cre-decision'),
            smsUnidades: EndPoints.uri('/credito/info-sms-unidades'),
            baseAprobado: EndPoints.uri('/generic/cre-decision-micro'),
            cambioEstado: EndPoints.uri('/generic/cre-cambio-estado-agenda'),
            baseCausalRechazo: EndPoints.uri('/generic/cau-rechazo'),
            baseCauDesestimiento: EndPoints.uri('/generic/cau-desestimiento'),
            baseCausalAprobacion: EndPoints.uri('/generic/cau-aprobacion'),
            baseCausalAnulacion: EndPoints.uri('/generic/cau-anulacion'),
            validaCampos: EndPoints.uri('/credito/validar-campos-solicitud'),
            guardado: EndPoints.uri('/credito/cre-decision'),
            getAgendasFabrica: EndPoints.uri('/generic/qry/obtener-siguiente-estado-agenda')
        }
    };
    /**
     * @description: End-Point
     */
    public politicas = {
        url: {
            base: EndPoints.uri('/generic/qry/cre-politicas-adm'),
            guardarExcepcion: EndPoints.uri('/generic/guardado-excepcion-creditos'),
            correrMotorExcepciones: EndPoints.uri('/credito/microcredito/recalculo-excepcion-politicas-creditos')
        }
    };
    /**
     * @description: End-Point
     */
    public procesos = {
        url: {
            // http://prometheus.fintra.co:8084/api-fintra/api/generic/metas-agregar-asesor
            metasClonarPeriodo: EndPoints.uri('/generic/metas-clonar-periodo'),
            metasListaIndicadores: EndPoints.uri('/generic/metas-lista-indicadores'),
            metasListaIndicadoresAgencia: EndPoints.uri('/generic/metas-lista-indicadores-agencia'),
            metasSgtePaso: EndPoints.uri('/generic/metas-sgte-paso'),
            metasAnularAsesor: EndPoints.uri('/generic/metas-anular-asesor'),
            metasUpdateMetaColocacion: EndPoints.uri('/generic/metas-update-meta-colocacion'),
            obtenerInformacionUsuarios: EndPoints.uri('/generic/qry/tk/obtener-informacion-usuarios'),
            metasAgregarAsesor: EndPoints.uri('/generic/metas-agregar-asesor'),

        }
    };
    /**
     * @description: End-Point
     */
    public listadoCartera = {
        url: {
            base: EndPoints.uri('/credito/tk/array-padre-hija/recursos-obligaciones-carteras'),
            baseCompradas: EndPoints.uri('/generic/qry/tk/obligaciones-compradas-hijas'),
            update: EndPoints.uri('/generic/actualizar-cartera-libranza'),
            create: EndPoints.uri('/generic/agregar-cartera-en-mora'),
            editar: EndPoints.uri("/generic/actualizar-cartera"),
            guardarGestionCompra: EndPoints.uri("/generic/guardar-gestion-compra"),
            pasarAgenda: EndPoints.uri('/generic/cre-valida-gestion-cartera'),
            validadorTotalLibranza: EndPoints.uri('/generic/validador-total-libranza'),
            //negociacion
            gestionCartera: EndPoints.uri('/generic/agregar-negociacion-cartera'),
            liquidacionSaldos: EndPoints.uri('/generic/agrega-liquidacion-saldos'),
            obtenerObligacion: EndPoints.uri('/generic/qry/tk/obtener-obligaciones-carteras-a-negociar'),
        }
    };
    /**
     * @description: End-point
     */
    public referenciaCliente = {
        url: {
            base: EndPoints.uri('/generic/qry/informacion-cliente-referenciar'),
            baseReferecia: EndPoints.uri('/generic/cre-referenciar'),
            baseReprogramar: EndPoints.uri('/generic/cre-reprogramar-solicitud'),
            tipoReferencia: EndPoints.uri('/generic/qry/obtener-tipos-referencia-unidad-negocio'),
            tipoTercero: EndPoints.uri('/generic/qry/obtener-tipos-referencia-tercero'),

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
            baseComite: EndPoints.uri('/generic/qry/agendas-credito/CC'),
            baseVisitas: EndPoints.uri('/generic/qry/agendas-credito/VI'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/CM'),
            totaleComite: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/CC'),
            totaleVisitas: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/VI')
        }
    };

    /**
     * @description: End-point agenda firma digital
     */
    public agendaFirmaDigital = {
        url: {
            // https://prometheus.fintra.co:8443/api-fintra/api/generic/qry/agenda-firma
            // ESTA ES LA API : http://localhost:8084/api-fintra/api/generic/update-estado-evidente
            // http://localhost:8084/api-fintra/api/generic/update-reenviar-firma
            base: EndPoints.uri('/generic/qry/agenda-firma'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/FI'),
            correoDecision: EndPoints.uri('/credito/sendmail/correo-decision'),
            updateEstadoEvidente: EndPoints.uri('/generic/update-estado-evidente'),
            updateReenviarFirma: EndPoints.uri('/generic/update-reenviar-firma'),
            obtenerDatosBasicosFirma: EndPoints.uri('/generic/qry/obtener-datosbasicos-firma'),
            obtenerIntentosEvidente: EndPoints.uri('/generic/obtener-intentos_evidente'),
            guardarDatosBasicosFirma: EndPoints.uri('/generic/guardar-datos-basicos-firma'),
            verDocumentosFirmaDigital: EndPoints.uri('/generic/qry/documentos-requeridos-firma'),


        }
    };

    /**
    * @description: End-point agenda decision
    */
    public agendaDecision = {
        url: {
            base: EndPoints.uri('/generic/qry/agendas-credito/DE'),
            totales: EndPoints.uri('/generic/qry/obtener-informacion-cards-agendas/DE')
        }
    };
    /**
    * @description: End-point agenda decision
    */
    public oferta = {
        url: {
            base: EndPoints.uri('/generic/obtener-detalle-oferta-libranza-seleccionada'),
            consumo: EndPoints.uri('/generic/qry/obtener-oferta-plexa'),
            postSelectOferta: EndPoints.uri('/generic/actualizar-eleccion-oferta'),
            postSelectOfertaConsumo: EndPoints.uri('/generic/validacion-oferta-consumo'),
            recalcularOferta: EndPoints.uri('/generic/recalcular-capacidad-pago-libranza'),
            recalcularOfertaConsumo: EndPoints.uri('/generic/calcular-capacidad-pago-consumo'),
        }
    };

    /**
* @description: End-point agenda decision
*/
    public capacidad = {
        url: {
            base: EndPoints.uri('/generic/obtener-capacidad-pago'),
            consumo: EndPoints.uri('/generic/qry/consulta-capacidad-pago-consumo'),
        }
    };

    /**
    * @description: End-point agenda decision
    */
    public busquedaEntidadFinanciera = {
        url: {
            base: EndPoints.uri('/generic/obtener-nombre-entidades'),

        }
    };

    /**
* @description: End-point agenda decision
*/
    public busquedaActividadEconomica = {
        url: {
            base: EndPoints.uri('/generic/listado-actividad-economica-consumo'),
        }
    };


    /**
    * @description: End-point agenda decision
    */
    public busquedaEstadoCuenta = {
        url: {
            base: EndPoints.uri('/generic/obtener-estados-cuentas'),

        }
    };
    /**
* @description: End-point agenda decision
*/
    public salarioBasico = {
        url: {
            base: EndPoints.uri('/generic/obtener-salario-min-vigente'),

        }
    };

    /**
     * @description: End-Point
     */
    public analisisFinanciero = {
        url: {
            base: EndPoints.uri('/generic/qry/info-analisis-financiero'),
            guardado: EndPoints.uri('/generic/guardar-analisis-financiero')
        }
    };


    /**
 * @description: End-Point
 */
    public rdStation = {
        url: {
            info_rd: EndPoints.uri('/generic/qry/informacion-reporterd-mercadeo'),
            listaLote: EndPoints.uri('/generic/qry/obtener-select-lote'),
            dataLotes: EndPoints.uri('/generic/qry/informacion-reporterd-mercadeo-lotes')
        }
    };
    /**
     * @description: End-Point
     */
    public negociacionCartera = {
        url: {
            base: EndPoints.uri('/generic/qry/negocios-cartera'),
            guardado: EndPoints.uri('/generic/insertar-negociacion-cartera'),
            listadoNegociaciones: EndPoints.uri('/generic/qry/consulta-lista-negociaciones'),
            negociacionRealizada: EndPoints.uri('/generic/qry/negociaciones-cartera'),
            reversarNegociacion: EndPoints.uri('/generic/anular-negociacion-cartera')

        }
    };

    /**
     * @description: End-Point
     */
    public seguimientoCarteraClientes = {
        url: {
            listarUnidad: EndPoints.uri('/generic/qry/cartera-listar-unidad-negocio'),
            periodoFotos: EndPoints.uri('/generic/qry/cartera-listar-periodo-foto'),
            buscarCliente: EndPoints.uri('/generic/cartera-buscar-cliente'),
            cargarCliente: EndPoints.uri('/generic/cartera-cargar-detalle-cliente'),
            visualizarPagos: EndPoints.uri('/generic/cartera-visualizar-pagos-cliente'),
            visualizarGestiones: EndPoints.uri('/generic/qry/cartera-visualizar-gestiones-cliente'),
            visualizarCompromisos: EndPoints.uri('/generic/qry/cartera-visualizar-compromiso-pago-cliente'),
            listarTipoGestor: EndPoints.uri('/generic/qry/cartera-listar-tipo-gestor'),
            listarTipoGestion: EndPoints.uri('/generic/qry/cartera-listar-tipo-gestion'),
            listarTipoContacto: EndPoints.uri('/generic/qry/cartera-listar-tipo-contacto'),
            listarMotivoNoPago: EndPoints.uri('/generic/qry/cartera-listar-motivo-no-pago'),
            listarEstadoCliente: EndPoints.uri('/generic/qry/cartera-listar-estado-cliente-contacto'),
            listarProximaAccion: EndPoints.uri('/generic/qry/cartera-listar-proxima-accion-contacto'),
            listarResultadoGestion: EndPoints.uri('/generic/qry/cartera-listar-resultado-gestion-contacto'),
            listarDepartamentos: EndPoints.uri('/generic/qry/listar-departamentos'),
            listarCiudades: EndPoints.uri('/generic/qry/listar-ciudades'),
            guardarGestionCliente: EndPoints.uri('/generic/cartera-guardar-gestion-compromiso'),
            verInformacionCliente: EndPoints.uri('/generic/qry/cartera-buscar-info-cliente'),
            guardarInformacionCliente: EndPoints.uri('/generic/cartera-actualizar-info-cliente'),
            verDetallePagoCliente: EndPoints.uri('/generic/cartera-visualizar-pagos-detalle-cliente'),
            listarNomenclaturas: EndPoints.uri('/generic/qry/nomenclarturas'),
            listarBarrios: EndPoints.uri('/generic/qry/listar-barrios'),
            buscarClienteHistorico: EndPoints.uri('/generic/cartera-buscar-cliente-historico'),
            verDetalleCarteraHistorico: EndPoints.uri('/generic/cartera-cargar-detalle-cliente-historico')

        }
    };
}

