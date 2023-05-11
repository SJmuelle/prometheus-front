import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionCuentasModule } from './asignacion-cuentas/asignacion-cuentas.module';
import { GestionCarteraModule } from './gestion-cartera/gestion-cartera.module';
import { NegociacionesModule } from './negociaciones/negociaciones.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'asignacion-cuentas',
        loadChildren: () => AsignacionCuentasModule,
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'gestion-carteras',
        loadChildren: () => GestionCarteraModule,
      }
    ]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'negociaciones',
        loadChildren: () => NegociacionesModule,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobranzaRoutingModule { }
