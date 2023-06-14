import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoNegociacionesRoutingModule } from './historico-negociaciones-routing.module';
import { ListadoComponent } from './listado/listado.component';


@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    CommonModule,
    HistoricoNegociacionesRoutingModule
  ]
})
export class HistoricoNegociacionesModule { }
