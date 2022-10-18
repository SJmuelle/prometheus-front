import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaCompletacionModule} from './agenda-completacion/agenda-completacion.module';
import {GestionFabricaCreditoModule} from './gestion-fabrica-credito/gestion-fabrica-credito.module';
import {AgendaReferenciacionModule} from "./agenda-referenciacion/agenda-referenciacion.module";
import {AgendaComercialModule} from "./agenda-comercial/agenda-comercial.module";
import { ParametriaModule } from './parametria/parametria.module';
import { AgendaDecisionModule } from './agenda-decision/agenda-decision.module';
import { TrazabilidadCreditoModule } from './trazabilidad-credito/trazabilidad-credito.module';
import { AgendaGestionCarteraModule } from './agenda-gestion-cartera/agenda-gestion-cartera.module';
import {AgendaFormalizacionModule} from "./agenda-formalizacion/agenda-formalizacion.module";
import { ReferidosModule } from './referidos/referidos.module';
import { AsignarSolicitudesModule } from './asignar-solicitudes/asignar-solicitudes.module';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'parametria',
                loadChildren: () => ParametriaModule
            },
            {
                path: 'referidos',
                loadChildren: () => ReferidosModule
            },
            {
                path: 'agenda-comercial',
                loadChildren: () => AgendaComercialModule
            },
            {
                path: 'agenda-completion',
                loadChildren: () => AgendaCompletacionModule
            },
            {
                path: 'credit-management',
                loadChildren: () => GestionFabricaCreditoModule
            },
            {
                path: 'agenda-referencing',
                loadChildren: () => AgendaReferenciacionModule
            },
            {
                path: 'agenda-decision',
                loadChildren: () => AgendaDecisionModule
            },
            {
                path: 'agenda-cartera',
                loadChildren: () => AgendaGestionCarteraModule
            },
            {
                path: 'trazabilidad',
                loadChildren: () => TrazabilidadCreditoModule
            },
            {
                path: 'agenda-formalizacion',
                loadChildren: () => AgendaFormalizacionModule
            },
            {
                path: 'asignar-solicitudes',
                loadChildren: () => AsignarSolicitudesModule
            },

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricaCreditoRoutingModule { }
