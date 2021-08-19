/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Hoja de vida',
        type: 'collapsable',
        icon: 'heroicons_outline:chart-square-bar',
        children: [
            {
                id: 'dashboard.hojavida',
                title: 'Hoja de vida',
                type: 'basic',
                link: '/dashboard/hoja-vida/hv'

            },
            {
                id: 'dashboard.pqrs',
                title: 'PQRS',
                type: 'basic',
                link: '/dashboard/hoja-vida/pqrs'

            },
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
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard'
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
