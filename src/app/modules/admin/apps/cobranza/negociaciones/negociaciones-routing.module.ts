import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadosNegociosComponent } from './listados-negocios/listados-negocios.component';
import { DetalleCarteraComponent } from './detalle-cartera/detalle-cartera.component';

const routes: Routes = [
  {
    path: '',
    component: ListadosNegociosComponent,
  },
  {
    path: ':tipoEstrategia/:tipoID/:id/:negocio',
    component: DetalleCarteraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NegociacionesRoutingModule { }
