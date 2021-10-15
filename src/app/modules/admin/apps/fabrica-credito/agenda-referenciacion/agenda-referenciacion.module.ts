import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaReferenciacionRoutingModule } from './agenda-referenciacion-routing.module';
import { GridAgendaReferenciacionComponent } from './grid-agenda-referenciacion/grid-agenda-referenciacion.component';


@NgModule({
  declarations: [
    GridAgendaReferenciacionComponent
  ],
  imports: [
    CommonModule,
    AgendaReferenciacionRoutingModule
  ]
})
export class AgendaReferenciacionModule { }
