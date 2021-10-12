import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaCompletacionModule} from './agenda-completacion/agenda-completacion.module';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'agenda-completion',
                loadChildren: () => AgendaCompletacionModule
            },

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricaCreditoRoutingModule { }
