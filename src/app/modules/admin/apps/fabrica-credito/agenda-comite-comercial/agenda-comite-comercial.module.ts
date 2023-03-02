import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaComiteComercialRoutingModule } from './agenda-comite-comercial-routing.module';
import { GridAgendaComiteComercialComponent } from './grid-agenda-comite-comercial/grid-agenda-comite-comercial.component';


@NgModule({
  declarations: [
    GridAgendaComiteComercialComponent
  ],
  imports: [
    CommonModule,
    AgendaComiteComercialRoutingModule
  ]
})
export class AgendaComiteComercialModule { }
