import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProntoPagoModule } from './pronto-pago/pronto-pago.module';
import { PagoMasivoModule } from './pago-masivo/pago-masivo.module';

const routes: Routes = [
  {path: 'pronto-pago', loadChildren: () => ProntoPagoModule },
  {path: 'import-file', loadChildren: () => PagoMasivoModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportadorasRoutingModule { }
