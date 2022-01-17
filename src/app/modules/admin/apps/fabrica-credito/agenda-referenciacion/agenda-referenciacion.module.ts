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
import { FormGestionReferenciacionModalComponent } from './form-gestion-referenciacion-modal/form-gestion-referenciacion-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import { GridReferenciacionComponent } from './grid-referenciacion/grid-referenciacion.component';


@NgModule({
  declarations: [
    GridAgendaReferenciacionComponent,
    FormGestionReferenciacionModalComponent,
    GridReferenciacionComponent
  ],
    imports: [
        CommonModule,
        AgendaReferenciacionRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatDividerModule,
        MatExpansionModule,
        MatTabsModule,
    ]
})
export class AgendaReferenciacionModule { }
