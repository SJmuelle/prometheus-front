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
                link: '/dashboard/hoja-vida/hv',
                icon: 'heroicons_outline:chart-square-bar',

            },
            {
                id: 'dashboard.pqrs',
                title: 'PQRS',
                type: 'collapsable',
                icon: 'heroicons_outline:check-circle',
                children: [
                    {
                        id: 'dashboard.pqr.lista',
                        title: 'Lista',
                        type: 'basic',
                        link: '/list'
                    },
                    {
                        id: 'dashboard.pqr.configuracion',
                        title: 'Configuración',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'dashboard.pqr.configuracion.tipo',
                                title: 'tipo de PQRS',
                                type: 'basic',
                                link: '/configuracion/tipo'
                            },
                            {
                                id: 'dashboard.pqr.configuracion.causales',
                                title: 'Causales de PQRS',
                                type: 'basic',
                                link: '/configuracion/causales'
                            },
                            {
                                id: 'dashboard.pqr.configuracion.responsables',
                                title: 'Responsables de PQRS',
                                type: 'basic',
                                link: '/configuracion/responsables'
                            },
                        ]
                    },
                    {
                        id: 'dashboard.pqr.gestion',
                        title: 'Solución de PQRS',
                        type: 'basic',
                        link: '/gestion'
                    }
                ]
            }
        ]

    },
    {
        id: 'calendario',
        title: 'Calendario',
        type: 'basic',
        icon: 'heroicons_outline:calendar',
        link: '/calendar'

    }
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
        ]

    },
    {
        id: 'calendario',
        title: 'Calendario',
        type: 'basic',
        icon: 'heroicons_outline:calendar',
        link: '/calendar'

    }
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
