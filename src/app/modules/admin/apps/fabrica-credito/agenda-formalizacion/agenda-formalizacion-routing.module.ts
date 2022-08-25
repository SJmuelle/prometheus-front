import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GridAgendaFormalizacionComponent} from "./grid-agenda-formalizacion/grid-agenda-formalizacion.component";

const routes: Routes = [
    {
        path: '',
        component: GridAgendaFormalizacionComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaFormalizacionRoutingModule { }
