import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { ListFinalizadoComponent } from './list-finalizado/list-finalizado.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component'; 
import { AdministradorComponent } from './administrador/administrador.component';

const routes: Routes = [
  {
    path: 'listado',
    component: ListSolicitudComponent,
  },
  {
    path: 'finalizado',
    component: ListFinalizadoComponent,
  },
  {
    path: 'creacion',
    component: CrearSolicitudComponent,
  },
  {
    path: 'permiso',
    component: AdministradorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosRoutingModule { }
