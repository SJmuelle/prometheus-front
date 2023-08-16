import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullViewsDetailsClienteComponent } from './full-views-details-cliente/full-views-details-cliente.component';
import { SeguimientoCarteraClienteComponent } from './seguimiento-cartera-cliente/seguimiento-cartera-cliente.component';
import { SeguimientoCarteraModule } from './seguimiento-cartera.module';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoCarteraClienteComponent
  },
  {
    path: 'vista-detalle-cliente',
    component: FullViewsDetailsClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoCarteraRoutingModule { }
