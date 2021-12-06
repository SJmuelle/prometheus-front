import { Route } from '@angular/router';

// COMPONENTES
import { CreacionPQRSComponent } from './creacion-pqrs/creacion-pqrs.component';
import { GestionPQRSComponent } from './gestion-pqrs/gestion-pqrs.component';
import { PqrComponent } from './pqr.component';
import { TipopqrComponent } from './tipopqr/tipopqr.component';
import { CausalesPQRSComponent } from './causales-pqrs/causales-pqrs.component';
import { ResponsablesPQRSComponent } from './responsables-pqrs/responsables-pqrs.component';
import { SolucionesPQRSComponent } from './soluciones-pqrs/soluciones-pqrs.component';
import { ProcedimientosPQRSComponent } from './procedimientos-pqrs/procedimientos-pqrs.component';
import { ListComponent } from './list/list.component';

export const pqrRoutes: Route[] = [
    {
        path: 'creacion/:cliente',
        component: CreacionPQRSComponent,
    },
    {
        path: 'gestion/:idPQR',
        component: GestionPQRSComponent,
    },
    {
        path: 'configuracion',
        component: PqrComponent,
        children: [
            {
                path: 'tipoPQRS',
                component: TipopqrComponent,
            },
            {
                path: 'causalesPQRS',
                component: CausalesPQRSComponent,
            },
            {
                path: 'responsablesPQRS',
                component: ResponsablesPQRSComponent,
            },
            {
                path: 'solucionesPQRS',
                component: SolucionesPQRSComponent,
            },
            {
                path: 'procedimientosPQRS',
                component: ProcedimientosPQRSComponent,
            },
        ],
    },
    { path: '**', component: ListComponent },
];
