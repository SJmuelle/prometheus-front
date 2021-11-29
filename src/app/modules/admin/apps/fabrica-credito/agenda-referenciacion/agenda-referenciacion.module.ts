import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaReferenciacionRoutingModule } from './agenda-referenciacion-routing.module';
import { GridAgendaReferenciacionComponent } from './grid-agenda-referenciacion/grid-agenda-referenciacion.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    GridAgendaReferenciacionComponent
  ],
    imports: [
        CommonModule,
        AgendaReferenciacionRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class AgendaReferenciacionModule { }
