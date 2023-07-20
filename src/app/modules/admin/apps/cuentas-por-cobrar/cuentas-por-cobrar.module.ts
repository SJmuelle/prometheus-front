import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasPorCobrarRoutingModule } from './cuentas-por-cobrar-routing.module';
import { SeguimientoCarteraModule } from './seguimiento-cartera/seguimiento-cartera.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CuentasPorCobrarRoutingModule,
    SeguimientoCarteraModule
  ]
})
export class CuentasPorCobrarModule { }
