import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecaudosModule } from './recaudos/recaudos.module';

const routes: Routes = [{
  path: 'recaudos',
  loadChildren: () => RecaudosModule
},
{
  path: 'seguimiento-cartera',
  loadChildren: () => import('./seguimiento-cartera/seguimiento-cartera.module').then((m) => m.SeguimientoCarteraModule)
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasPorCobrarRoutingModule { }
