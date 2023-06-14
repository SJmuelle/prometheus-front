import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionCuentasModule } from './asignacion-cuentas/asignacion-cuentas.module';
import { GestionCarteraModule } from './gestion-cartera/gestion-cartera.module';
import { NegociacionesModule } from './negociaciones/negociaciones.module';
import { HistoricoGestionesModule } from './historico-gestiones/historico-gestiones.module';
import { HistoricoNegociacionesModule } from './historico-negociaciones/historico-negociaciones.module';
import { HistoricoPagoClienteModule } from './historico-pago-cliente/historico-pago-cliente.module';

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
  ,
  {
    path: '',
    children: [
      {
        path: 'historico-gestiones',
        loadChildren: () => HistoricoGestionesModule,
      }
    ]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'historico-negociaciones',
        loadChildren: () => HistoricoNegociacionesModule,
      }
    ]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'historico-paagos',
        loadChildren: () => HistoricoPagoClienteModule,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobranzaRoutingModule { }
