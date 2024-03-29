/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Servicio al cliente',
        type: 'aside',
        icon: 'heroicons_outline:chart-square-bar',
        children: [
            {
                id: 'dashboard.hojavida',
                title: 'Gestión del cliente',
                type: 'basic',
                link: '/gestion',
                icon: 'heroicons_outline:chart-square-bar',
            },
            {
                title: 'PQRS',
                type: 'collapsable',
                icon: 'heroicons_outline:check-circle',
                children: [
                    {
                        id: 'dashboard.pqr.configuracion',
                        title: 'Configuración',
                        icon: 'heroicons_outline:cog',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'dashboard.pqr.configuracion.tipo',
                                title: 'Tipo de PQRS',
                                // icon: 'heroicons_outline:minus-sm',
                                type: 'basic',
                                link: '/pqr/configuracion/tipoPQRS',
                            },
                            {
                                id: 'calendario',
                                title: 'Dias hábiles',
                                type: 'basic',
                                // icon: 'heroicons_outline:calendar',
                                link: '/calendar',
                            },
                            {
                                id: 'dashboard.pqr.configuracion.causales',
                                title: 'Causales de PQRS',
                                type: 'basic',
                                // icon: 'heroicons_outline:minus-sm',
                                link: '/pqr/configuracion/causalesPQRS',
                            },
                            {
                                id: 'dashboard.pqr.configuracion.responsables',
                                title: 'Responsables de PQRS',
                                type: 'basic',
                                // icon: 'heroicons_outline:minus-sm',
                                link: '/pqr/configuracion/responsablesPQRS',
                            },
                            {
                                id: 'dashboard.pqr.configuracion.procedimientos',
                                title: 'Procedimientos de PQRS',
                                type: 'basic',
                                link: '/pqr/configuracion/procedimientosPQRS',
                            },
                            {
                                id: 'dashboard.pqr.configuracion.soluciones',
                                title: 'Soluciones de PQRS',
                                type: 'basic',
                                // icon: 'heroicons_outline:minus-sm',
                                link: '/pqr/configuracion/solucionesPQRS',
                            },
                        ],
                    },
                    {
                        id: 'dashboard.pqr.lista',
                        title: 'Creación PQRS',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-list',
                        link: '/pqr/creacion/0',
                    },
                    {
                        id: 'dashboard.pqr.gestion',
                        title: 'Gestión de PQRS',
                        icon: 'heroicons_outline:check-circle',
                        type: 'basic',
                        link: '/pqr/list',
                    },
                    {
                        id: 'dashboard.pqr.historial',
                        title: 'Historial de PQRS',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-list',
                        link: '/pqr/historial',
                    },
                ],
            },
            
        ],
    },
    {
        id: 'prooveedores',
        title: 'Proveedores',
        icon: 'transfer_within_a_station',
        type: 'aside',
        children: [
            {
                id: 'transportadora.transferencia',
                title: 'Transferencias',
                icon: 'iconsmind:paper_plane',
                type: 'basic',
                link: '/run-date/factura',
            }
        ]
    },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Servicio al cliente',
        type: 'aside',
        icon: 'heroicons_outline:chart-square-bar',
        children: [
            {
                id: 'dashboard.hojavida',
                title: 'Gestión del cliente',
                type: 'basic',
                link: '/dashboard/hoja-vida/hv',
                icon: 'heroicons_outline:chart-square-bar',
            },
            {
                id: 'dashboard.pqrs',
                title: 'PQRS',
                type: 'group',
                icon: 'heroicons_outline:inbox-in',
                children: [
                    {
                        id: 'dashboard.pqrs.list',
                        title: 'Lista',
                        type: 'basic',
                        link: '/pqr/list',
                    },
                    {
                        id: 'dashboard.pqr.causales',
                        title: 'Causales de PQRS',
                        type: 'basic',
                        link: '/pqr/hoja-vida/causales',
                    },
                    {
                        id: 'dashboard.pqr.responsables',
                        title: 'Responsables de PQRS',
                        type: 'basic',
                        link: '/pqr/hoja-vida/responsables',
                    },
                    {
                        id: 'dashboard.pqr.procedimientos',
                        title: 'Procedimientos de PQRS',
                        type: 'basic',
                        link: '/pqr/hoja-vida/procedimientos',
                    },
                    {
                        id: 'dashboard.pqr.solucion',
                        title: 'Solución de PQRS',
                        type: 'basic',
                        link: '/pqr/hoja-vida/solucion'
                    },
                ],
            },
            
        ],
    },
    {
        id: 'credito',
        title: 'Crédito',
        type: 'aside',
        icon: 'mat_outline:attach_money',
        children: [
            {
                id: 'agenda-comercial.list',
                title: 'Agenda de comercial',
                type: 'basic',
                link: '/credit-factory/agenda-comercial',
                icon: 'heroicons_outline:document-text',
            },
            {
                id: 'agenda-cartera.list',
                title: 'Agenda gestión de carteras',
                type: 'basic',
                link: '/credit-factory/agenda-cartera',
                icon: 'heroicons_outline:document-text',
            },
            {
                id: 'agenda-completacion.list',
                title: 'Agenda de completación',
                type: 'basic',
                link: '/credit-factory/agenda-completion',
                icon: 'heroicons_outline:document-text',
            },
            {
                id: 'agenda-referenciacion.list',
                title: 'Agenda de referenciación ',
                type: 'basic',
                link: '/credit-factory/agenda-referencing',
                icon: 'heroicons_outline:document',
            },
            {
                id: 'agenda-referenciacion.list',
                title: 'Agenda de análisis y decisión',
                type: 'basic',
                link: '/credit-factory/agenda-decision',
                icon: 'heroicons_outline:document',
            },
            {
                id: 'trazabilidad.list',
                title: 'Trazabilidad',
                type: 'basic',
                link: '/credit-factory/trazabilidad',
                icon: 'heroicons_outline:chart-square-bar',
            },
            {
                id: 'parametria',
                title: 'Configuración',
                type: 'collapsable',
                icon: 'heroicons_outline:check-circle',
                children: [
                    {
                        id: 'parametria.fabrica1',
                        title: 'Listado de Chequeo',
                        // icon: 'heroicons_outline:minus-sm',
                        type: 'basic',
                        link: '/credit-factory/parametria/chequeo',
                    },
                    {
                        id: 'parametria.fabrica2',
                        title: 'Listado de Comentarios',
                        // icon: 'heroicons_outline:minus-sm',
                        type: 'basic',
                        link: '/credit-factory/parametria/listadoTiposComentarios'
                    },
                    // {
                    //     id: 'parametria.fabrica3',
                    //     title: 'Preguntas de Referenciación',
                    //     // icon: 'heroicons_outline:minus-sm',
                    //     type: 'basic',
                    //     link: '/credit-factory/parametria/listadoPreguntasReferenciacion'
                    // },
                    {
                        id: 'parametria.fabrica4',
                        title: 'Tiempo por agendas',
                        // icon: 'heroicons_outline:minus-sm',
                        type: 'basic',
                        link: '/credit-factory/parametria/tiempoAgenda'
                    }
                ],
            },

        ]
    },

    {
        id: 'proveedores',
        title: 'Proveedores',
        icon: 'transfer_within_a_station',
        type: 'aside',
        children: [
            {
                id: 'transportadora.transferencia',
                title: 'Transferencias',
                icon: 'iconsmind:paper_plane',
                type: 'basic',
                link: '/run-date/factura',
            }
        ]
    },
    {
        id: 'agenda-referenciacion.list',
        title: 'Agenda de referenciación y desición',
        type: 'basic',
        link: '/credit-factory/agenda-referencing',
        icon: 'heroicons_outline:document',
    },
    {
        id: 'pagaduria',
        title: 'Pagadurías',
        type: 'basic',
        link: '/pagaduria/par',
        icon: 'heroicons_outline:cash'
    }

]
    
    // {
    //     id: 'calendario',
    //     title: 'Calendario',
    //     type: 'basic',
    //     icon: 'heroicons_outline:calendar',
    //     link: '/calendar'

    // }

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
];
