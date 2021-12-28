import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GridAgendaCompletacionComponent} from "./grid-agenda-completacion/grid-agenda-completacion.component";

const routes: Routes = [
    {
        path: '',
        component: GridAgendaCompletacionComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaCompletacionRoutingModule { }
