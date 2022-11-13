import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProntoPagoComponent } from './pronto-pago/pronto-pago.component';

const routes: Routes = [
  {
    path: 'pronto-pago',
    component: ProntoPagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportadoraRoutingModule { }
