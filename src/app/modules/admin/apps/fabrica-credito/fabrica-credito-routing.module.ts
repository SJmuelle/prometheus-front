import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaCompletacionModule} from './agenda-completacion/agenda-completacion.module';
import {GestionFabricaCreditoModule} from './gestion-fabrica-credito/gestion-fabrica-credito.module';
import {AgendaReferenciacionModule} from "./agenda-referenciacion/agenda-referenciacion.module";


const routes: Routes = [
    {
        path: '',
        children: [
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
            }

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricaCreditoRoutingModule { }
