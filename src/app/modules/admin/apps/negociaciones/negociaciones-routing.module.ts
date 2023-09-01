import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaNegociacionesComponent } from './consulta-negociaciones/consulta-negociaciones.component';
import { NegociacionCarteraComponent } from './negociacion-cartera/negociacion-cartera.component';

const routes: Routes = [
  {
    path: '',
    component: NegociacionCarteraComponent
  },
  {
    path: 'consulta-negociaciones',
    component: ConsultaNegociacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NegociacionesRoutingModule { }
