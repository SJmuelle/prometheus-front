import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProntoPagoComponent } from './pronto-pago/pronto-pago.component';
import { PagoMasivoComponent } from './pago-masivo/pago-masivo.component';
import { ConveniosComponent } from './convenios/convenios.component';

const routes: Routes = [
  {
    path: 'pronto-pago',
    component: ProntoPagoComponent
  },
  {
    path: 'recaudo',
    component: PagoMasivoComponent
  },
  {
    path: 'parametrizacion',
    component: ConveniosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportadoraRoutingModule { }
