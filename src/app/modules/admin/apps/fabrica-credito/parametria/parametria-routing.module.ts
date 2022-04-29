import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoChequeoComponent } from './listado-chequeo/listado-chequeo.component';

const routes: Routes = [
  {
      path: '',
      component: ListadoChequeoComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametriaRoutingModule { }
