import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendasVisitasComponent } from './grid-agendas-visitas/grid-agendas-visitas.component';

const routes: Routes = [
  {
    path: '',
    component: GridAgendasVisitasComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaVisitasRoutingModule { }
