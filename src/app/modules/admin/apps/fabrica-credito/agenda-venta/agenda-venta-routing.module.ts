import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendaVentaComponent } from './grid-agenda-venta/grid-agenda-venta.component';

const routes: Routes = [
  {
    path: '',
    component: GridAgendaVentaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaVentaRoutingModule { }
