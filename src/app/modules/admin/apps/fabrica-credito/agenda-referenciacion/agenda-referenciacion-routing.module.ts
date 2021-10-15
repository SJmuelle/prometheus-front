import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GridAgendaReferenciacionComponent} from './grid-agenda-referenciacion/grid-agenda-referenciacion.component';

const routes: Routes = [
    {
        path: '',
        component: GridAgendaReferenciacionComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaReferenciacionRoutingModule { }
