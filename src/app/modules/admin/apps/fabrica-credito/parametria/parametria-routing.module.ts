import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoBarriosComponent } from './listado-barrios/listado-barrios.component';
import { ListadoChequeoComponent } from './listado-chequeo/listado-chequeo.component';
import { ListadoPreguntasReferenciacionComponent } from './listado-preguntas-referenciacion/listado-preguntas-referenciacion.component';
import { ListadoTiposComentariosComponent } from './listado-tipos-comentarios/listado-tipos-comentarios.component';
import { TiempoAgendaComponent } from './tiempo-agenda/tiempo-agenda.component';

const routes: Routes = [
  {
      path: 'chequeo',
      component: ListadoChequeoComponent
  },
  {
    path: 'listadoPreguntasReferenciacion',
    component: ListadoPreguntasReferenciacionComponent
  },
  {
    path: 'listadoTiposComentarios',
    component: ListadoTiposComentariosComponent
  },
  {
    path: 'tiempoAgenda',
    component: TiempoAgendaComponent
  },
  {
    path: 'listadoBarrio',
    component: ListadoBarriosComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametriaRoutingModule { }
