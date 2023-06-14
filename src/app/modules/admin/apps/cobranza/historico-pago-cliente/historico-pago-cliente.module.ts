import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoPagoClienteRoutingModule } from './historico-pago-cliente-routing.module';
import { ListadoComponent } from './listado/listado.component';


@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    CommonModule,
    HistoricoPagoClienteRoutingModule
  ]
})
export class HistoricoPagoClienteModule { }
