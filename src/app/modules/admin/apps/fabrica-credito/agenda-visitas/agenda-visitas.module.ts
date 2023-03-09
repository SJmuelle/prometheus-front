import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaVisitasRoutingModule } from './agenda-visitas-routing.module';
import { GridAgendasVisitasComponent } from './grid-agendas-visitas/grid-agendas-visitas.component';


@NgModule({
  declarations: [
    GridAgendasVisitasComponent
  ],
  imports: [
    CommonModule,
    AgendaVisitasRoutingModule
  ]
})
export class AgendaVisitasModule { }
