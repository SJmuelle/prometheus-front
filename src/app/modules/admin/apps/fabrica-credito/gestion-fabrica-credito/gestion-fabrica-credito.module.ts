import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFabricaCreditoRoutingModule } from './gestion-fabrica-credito-routing.module';
import { FormGestionFabricaCreditoComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-credito.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CdkScrollableModule} from "@angular/cdk/scrolling";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";
import { FormRepresentanteLegalComponent } from './form-representante-legal/form-representante-legal.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import { GridReferenciasComponent } from './grid-referencias/grid-referencias.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { FormDetallesReferenciasComponent } from './form-detalles-referencias/form-detalles-referencias.component';
import { FormDialogReferenciasComponent } from './form-dialog-referencias/form-dialog-referencias.component';
import {MatDialogModule} from "@angular/material/dialog";
import { GridComentariosComponent } from './grid-comentarios/grid-comentarios.component';
import { GridDocumentacionComponent } from './grid-documentacion/grid-documentacion.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { FormDialogCompararDocumentosComponent } from './form-dialog-comparar-documentos/form-dialog-comparar-documentos.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {PdfViewerModule} from "ng2-pdf-viewer";
import { FormDialogDecisionComponent } from './form-dialog-decision/form-dialog-decision.component';
import { FormDialogComentariosComponent } from './form-dialog-comentarios/form-dialog-comentarios.component';
import {NgxPaginationModule} from "ngx-pagination";
import { GridPoliticasComponent } from './grid-politicas/grid-politicas.component';
import { GridDevolucionesComponent } from './grid-devoluciones/grid-devoluciones.component';
import { FormDialogDevolucionesComponent } from './form-dialog-devoluciones/form-dialog-devoluciones.component';
import { FormDialogoChecklistComponent } from './form-dialogo-checklist/form-dialogo-checklist.component';
import { MatListModule } from '@angular/material/list';

import { FuseDrawerModule } from '@fuse/components/drawer';
import { GridCentralesComponent } from './grid-centrales/grid-centrales.component';
import { FormGestionFabricaUltracemComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-ultracem/form-gestion-fabrica-ultracem.component';


@NgModule({
    declarations: [
        FormGestionFabricaCreditoComponent,
        FormRepresentanteLegalComponent,
        GridReferenciasComponent,
        FormDetallesReferenciasComponent,
        FormDialogReferenciasComponent,
        GridComentariosComponent,
        GridDocumentacionComponent,
        FormDialogCompararDocumentosComponent,
        FormDialogDecisionComponent,
        FormDialogComentariosComponent,
        GridPoliticasComponent,
        GridDevolucionesComponent,
        FormDialogDevolucionesComponent,
        FormDialogoChecklistComponent,
        GridCentralesComponent,
        FormGestionFabricaUltracemComponent
    ],
    imports: [
        CommonModule,
        GestionFabricaCreditoRoutingModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        CdkScrollableModule,
        MatIconModule,
        MatDatepickerModule,
        MatTabsModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatTooltipModule,
        MatDialogModule,
        MatCheckboxModule,
        NgxExtendedPdfViewerModule,
        Ng2SearchPipeModule,
        PdfViewerModule,
        NgxPaginationModule,
        MatListModule,
        FuseDrawerModule

    ],

    exports: [
        GridReferenciasComponent,
        GridComentariosComponent
    ]
})
export class GestionFabricaCreditoModule { }
