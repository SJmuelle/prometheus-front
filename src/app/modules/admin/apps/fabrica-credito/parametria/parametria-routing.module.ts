import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoChequeoComponent } from './listado-chequeo/listado-chequeo.component';
import { ListadoPreguntasReferenciacionComponent } from './listado-preguntas-referenciacion/listado-preguntas-referenciacion.component';
import { ListadoTiposComentariosComponent } from './listado-tipos-comentarios/listado-tipos-comentarios.component';

const routes: Routes = [
  {
      path: '',
      component: ListadoChequeoComponent
  },
  {
    path: 'listadoPreguntasReferenciacion',
    component: ListadoPreguntasReferenciacionComponent
  },
  {
    path: 'listadoTiposComentarios',
    component: ListadoTiposComentariosComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametriaRoutingModule { }
