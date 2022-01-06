import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaReferenciacionRoutingModule } from './agenda-referenciacion-routing.module';
import { GridAgendaReferenciacionComponent } from './grid-agenda-referenciacion/grid-agenda-referenciacion.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    GridAgendaReferenciacionComponent
  ],
    imports: [
        CommonModule,
        AgendaReferenciacionRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class AgendaReferenciacionModule { }
