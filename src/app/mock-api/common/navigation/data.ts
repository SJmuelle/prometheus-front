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
                icon    : 'heroicons_outline:check-circle',
                children: [
                    {
                        id: 'dashboard.diasnohabiles',
                        title: 'Días no habiles',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/dias-no-habiles'
                    },
                    {
                        id: 'dashboard.causales',
                        title: 'Causales de PQRS',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/causales'
                    },
                    {
                        id: 'dashboard.responsables',
                        title: 'Responsables de PQRS',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/responsables'
                    },
                    {
                        id: 'dashboard.solucion',
                        title: 'Solución de PQRS',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/solucion'
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
                icon    : 'heroicons_outline:check-circle',
                children: [
                    {
                        id: 'dashboard.diasnohabiles',
                        title: 'Días no habiles',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/dias-no-habiles'
                    },
                    {
                        id: 'dashboard.causales',
                        title: 'Causales de PQRS',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/causales'
                    },
                    {
                        id: 'dashboard.responsables',
                        title: 'Responsables de PQRS',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/responsables'
                    },
                    {
                        id: 'dashboard.solucion',
                        title: 'Solución de PQRS',
                        type: 'basic',
                        link: '/dashboard/hoja-vida/solucion'
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
