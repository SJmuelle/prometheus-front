import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaReferenciacionRoutingModule } from './agenda-referenciacion-routing.module';
import { GridAgendaReferenciacionComponent } from './grid-agenda-referenciacion/grid-agenda-referenciacion.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {GestionFabricaCreditoModule} from "../gestion-fabrica-credito/gestion-fabrica-credito.module";
import { FormDialogReprogramarComponent } from './form-dialog-reprogramar/form-dialog-reprogramar.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {
    FormDialogComentarioReferenciaComponent
} from "./form-dialog-comentario-referencia/form-dialog-comentario-referencia.component";
import {FuseAlertModule} from "../../../../../../@fuse/components/alert";
import { FormDialogListErrorDialogComponent } from './form-dialog-list-error-dialog/form-dialog-list-error-dialog.component';
import { MatListModule } from '@angular/material/list';
import { GridTipoReferenciacionComponent } from './grid-tipo-referenciacion/grid-tipo-referenciacion.component';


@NgModule({
  declarations: [
    GridAgendaReferenciacionComponent,
    FormGestionReferenciacionModalComponent,
    FormDialogReprogramarComponent,
    FormDialogComentarioReferenciaComponent,
    FormDialogListErrorDialogComponent,
    GridTipoReferenciacionComponent
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
        MatDatepickerModule,
        GestionFabricaCreditoModule,
        NgxMatDatetimePickerModule,
        FormsModule,
        MatListModule,
        FuseAlertModule,
    ]
})
export class AgendaReferenciacionModule { }
