import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionCuentasModule } from './asignacion-cuentas/asignacion-cuentas.module';
import { GestionCarteraModule } from './gestion-cartera/gestion-cartera.module';
import { NegociacionesModule } from './negociaciones/negociaciones.module';
import { HistoricoGestionesModule } from './historico-gestiones/historico-gestiones.module';
import { HistoricoNegociacionesModule } from './historico-negociaciones/historico-negociaciones.module';
import { HistoricoPagoClienteModule } from './historico-pago-cliente/historico-pago-cliente.module';
import { HistialPagosModule } from './histial-pagos/histial-pagos.module';
import { ArqueoCajaModule } from './arqueo-caja/arqueo-caja.module';
import { AperturaCajaModule } from './apertura-caja/apertura-caja.module';

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
  ,
  {
    path: '',
    children: [
      {
        path: 'historial-pagos',
        loadChildren: () => HistialPagosModule,
      }
    ]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'arqueo-caja',
        loadChildren: () => ArqueoCajaModule,
      }
    ]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'apertura-caja',
        loadChildren: () => AperturaCajaModule,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobranzaRoutingModule { }
