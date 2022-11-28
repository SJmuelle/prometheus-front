import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { ListFinalizadoComponent } from './list-finalizado/list-finalizado.component';

const routes: Routes = [
  {
    path: 'listado',
    component: ListSolicitudComponent,
  },
  {
    path: 'finalizado',
    component: ListFinalizadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosRoutingModule { }
