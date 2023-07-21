import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguimientoCarteraClienteComponent } from './seguimiento-cartera-cliente/seguimiento-cartera-cliente.component';
import { SeguimientoCarteraModule } from './seguimiento-cartera.module';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoCarteraClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoCarteraRoutingModule { }
