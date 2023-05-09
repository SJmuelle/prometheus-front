import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VisualizacionCarteraComponent } from './visualizacion-cartera/visualizacion-cartera.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaComponent,
  },
  {
    path: ':identificacion',
    component: VisualizacionCarteraComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCarteraRoutingModule { }
