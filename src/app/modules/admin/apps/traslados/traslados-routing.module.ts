import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';

const routes: Routes = [
  {
    path: 'listado',
    component: ListSolicitudComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosRoutingModule { }
