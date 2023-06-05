import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ListadosNegociosComponent } from './listados-negocios/listados-negocios.component';
import { DetalleCarteraComponent } from './detalle-cartera/detalle-cartera.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaComponent,
  },
  {
    path: ':tipoEstrategia/:tipoID/:id',
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
