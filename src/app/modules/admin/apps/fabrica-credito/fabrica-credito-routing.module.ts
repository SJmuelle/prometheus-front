import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaCompletacionModule} from './agenda-completacion/agenda-completacion.module';
import {GestionFabricaCreditoModule} from './gestion-fabrica-credito/gestion-fabrica-credito.module';
import {AgendaReferenciacionModule} from "./agenda-referenciacion/agenda-referenciacion.module";
import {AgendaComercialModule} from "./agenda-comercial/agenda-comercial.module";
import { ParametriaModule } from './parametria/parametria.module';
import { AgendaDecisionModule } from './agenda-decision/agenda-decision.module';
import { TrazabilidadCreditoModule } from './trazabilidad-credito/trazabilidad-credito.module';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'parametria',
                loadChildren: () => ParametriaModule
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
                path: 'trazabilidad',
                loadChildren: () => TrazabilidadCreditoModule
            },

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricaCreditoRoutingModule { }
