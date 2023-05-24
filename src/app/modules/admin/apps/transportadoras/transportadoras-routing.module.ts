import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProntoPagoModule } from './pronto-pago/pronto-pago.module';

const routes: Routes = [
  {path: 'pronto-pago', loadChildren: () => ProntoPagoModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportadorasRoutingModule { }
