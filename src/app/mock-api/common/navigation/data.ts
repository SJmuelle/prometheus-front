/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Hoja de vida',
        type: 'aside',
        icon: 'heroicons_outline:chart-square-bar',
        children: [
            {
                id: 'dashboard.hojavida',
                title: 'Hoja de vida',
                type: 'basic',
                link: '/dashboard',
                icon: 'heroicons_outline:chart-square-bar',

            },
            // {
            //     id: 'dashboard.pqrs',
            //     title: 'PQRS',
            //     type: 'collapsable',
            //     icon: 'heroicons_outline:check-circle',
            //     children: [
            //         {
            //             id: 'dashboard.pqr.lista',
            //             title: 'Lista',
            //             type: 'basic',
            //             icon: 'heroicons_outline:clipboard-list',
            //             link: '/list'
            //         },
            //         {
            //             id: 'dashboard.pqr.configuracion',
            //             title: 'Configuración',
            //             icon: 'heroicons_outline:cog',
            //             type: 'collapsable',
            //             children: [
            //                 {
            //                     id: 'dashboard.pqr.configuracion.tipo',
            //                     title: 'Tipo de PQRS',
            //                     icon: 'heroicons_outline:minus-sm',
            //                     type: 'basic',
            //                     link: '/pqr/configuracion/tipoPQRS'
            //                 },
            //                 {
            //                     id: 'dashboard.pqr.configuracion.causales',
            //                     title: 'Causales de PQRS',
            //                     type: 'basic',
            //                     icon: 'heroicons_outline:minus-sm',
            //                     link: '/pqr/configuracion/causalesPQRS'
            //                 },
            //                 {
            //                     id: 'dashboard.pqr.configuracion.responsables',
            //                     title: 'Responsables de PQRS',
            //                     type: 'basic',
            //                     icon: 'heroicons_outline:minus-sm',
            //                     link: '/pqr/configuracion/responsablesPQRS'
            //                 },
            //                 {
            //                     id: 'dashboard.pqr.configuracion.soluciones',
            //                     title: 'Soluciones de PQRS',
            //                     type: 'basic',
            //                     icon: 'heroicons_outline:minus-sm',
            //                     link: '/pqr/configuracion/solucionesPQRS'
            //                 },
            //             ]
            //         },
            //         {
            //             id: 'dashboard.pqr.gestion',
            //             title: 'Solución de PQRS',
            //             icon: 'heroicons_outline:check-circle',
            //             type: 'basic',
            //             link: '/gestion'
            //         }
            //     ]
            // }
        ]

    },
    // {
    //     id: 'calendario',
    //     title: 'Calendario',
    //     type: 'basic',
    //     icon: 'heroicons_outline:calendar',
    //     link: '/calendar'

    // }
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Hoja de vida',
        type: 'aside',
        icon: 'heroicons_outline:chart-square-bar',
        children: [
            {
                id: 'dashboard.hojavida',
                title: 'Hoja de vida',
                type: 'basic',
                link: '/dashboard/hoja-vida/hv',
                icon: 'heroicons_outline:chart-square-bar',

            },
            {
                id: 'dashboard.pqrs',
                title: 'PQRS',
                type: 'group',
                icon: 'heroicons_outline:check-circle',
                children: [
                    {
                        id: 'dashboard.pqrs.list',
                        title: 'Lista',
                        type: 'basic',
                        link: '/pqr/list'
                    },
                    {
                        id: 'dashboard.pqr.causales',
                        title: 'Causales de PQRS',
                        type: 'basic',
                        link: '/pqr/hoja-vida/causales'
                    },
                    {
                        id: 'dashboard.pqr.responsables',
                        title: 'Responsables de PQRS',
                        type: 'basic',
                        link: '/pqr/hoja-vida/responsables'
                    },
                    {
                        id: 'dashboard.pqr.solucion',
                        title: 'Solución de PQRS',
                        type: 'basic',
                        link: '/pqr/hoja-vida/solucion'
                    }
                ]
            }
        ],
    },
    {
        id: 'agenda-completacion',
        title: 'Agenda de completación',
        type: 'aside',
        icon: 'heroicons_outline:office-building',
        children: [
            {
                id: 'agenda-completacion.list',
                title: 'Agenda de completación',
                type: 'basic',
                link: '/credit-factory/agenda-completion',
                icon: 'heroicons_outline:document-text',
            },

        ]
    }
    // {
    //     id: 'calendario',
    //     title: 'Calendario',
    //     type: 'basic',
    //     icon: 'heroicons_outline:calendar',
    //     link: '/calendar'

    // }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard'
    }
];
