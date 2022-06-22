import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendaDecisionComponent } from './grid-agenda-decision/grid-agenda-decision.component';
import { ResumenComponent } from './resumen/resumen.component';

const routes: Routes = [
  {
    path: '',
    component: GridAgendaDecisionComponent
  },
  {
    path: 'resumen/:num/:id',
    component: ResumenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaDecisionRoutingModule { }
