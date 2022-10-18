import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSolicitudesComponent } from './list-solicitudes/list-solicitudes.component';

const routes: Routes = [
  {
    path: '',
    component: ListSolicitudesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignarSolicitudesRoutingModule { }
