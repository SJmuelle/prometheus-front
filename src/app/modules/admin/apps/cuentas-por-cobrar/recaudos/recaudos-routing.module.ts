import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoMasivoModule } from './pagos-transportadoras/pago-masivo.module';

const routes: Routes = [{
  path: 'transportadora', loadChildren: ()=> PagoMasivoModule
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecaudosRoutingModule { }
