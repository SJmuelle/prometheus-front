import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { GestionFabricaCreditoRoutingModule } from './gestion-fabrica-credito-routing.module';
import { FormGestionFabricaCreditoComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-credito.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CdkScrollableModule } from "@angular/cdk/scrolling";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormRepresentanteLegalComponent } from './form-representante-legal/form-representante-legal.component';
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from "@angular-material-components/datetime-picker";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { GridReferenciasComponent } from './grid-referencias/grid-referencias.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormDetallesReferenciasComponent } from './form-detalles-referencias/form-detalles-referencias.component';
import { FormDialogReferenciasComponent } from './form-dialog-referencias/form-dialog-referencias.component';
import { MatDialogModule } from "@angular/material/dialog";
import { GridComentariosComponent } from './grid-comentarios/grid-comentarios.component';
import { GridDocumentacionComponent } from './grid-documentacion/grid-documentacion.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormDialogCompararDocumentosComponent } from './form-dialog-comparar-documentos/form-dialog-comparar-documentos.component';
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { FormDialogDecisionComponent } from './form-dialog-decision/form-dialog-decision.component';
import { FormDialogComentariosComponent } from './form-dialog-comentarios/form-dialog-comentarios.component';
import { NgxPaginationModule } from "ngx-pagination";
import { GridPoliticasComponent } from './grid-politicas/grid-politicas.component';
import { GridDevolucionesComponent } from './grid-devoluciones/grid-devoluciones.component';
import { FormDialogDevolucionesComponent } from './form-dialog-devoluciones/form-dialog-devoluciones.component';
import { FormDialogoChecklistComponent } from './form-dialogo-checklist/form-dialogo-checklist.component';
import { MatListModule } from '@angular/material/list';

import { FuseDrawerModule } from '@fuse/components/drawer';
import { GridCentralesComponent } from './grid-centrales/grid-centrales.component';
import { FormGestionFabricaUltracemComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-ultracem/form-gestion-fabrica-ultracem.component';
import { FormGestionFabricaLibranzaComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-libranza/form-gestion-fabrica-libranza.component';
import { GridOfertaLibranzaComponent } from './grid-oferta-libranza/grid-oferta-libranza.component';
import { GridCarteraComponent } from './grid-cartera/grid-cartera.component';
import { FuseCardModule } from '@fuse/components/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormDialogCarteraComponent } from './form-dialog-cartera/form-dialog-cartera.component';
import { GridCarteraNegociacionComponent } from './grid-cartera-negociacion/grid-cartera-negociacion.component';
import { FormDialogNegociacionComponent } from './form-dialog-negociacion/form-dialog-negociacion.component';
import { FabricaOpcionesComponent } from './fabrica-opciones/fabrica-opciones.component';
import { QuillModule } from 'ngx-quill';
import { FormDialogCarteraComprarComponent } from './form-dialog-cartera-comprar/form-dialog-cartera-comprar.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormGestionFabricaConsumoComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-consumo/form-gestion-fabrica-consumo.component';
import { GridConductoresConsumoComponent } from './grid-conductores-consumo/grid-conductores-consumo.component';
import { FormDetallesConductoresComponent } from './form-detalles-conductores/form-detalles-conductores.component';
import { GridOfertaConsumoComponent } from './grid-oferta-consumo/grid-oferta-consumo.component';
// import { FabricaOpcionesModule } from '../fabrica-opciones/fabrica-opciones.module';
import { MatSliderModule } from '@angular/material/slider';
import { GridHistoricoClienteComponent } from './grid-historico-cliente/grid-historico-cliente.component';
import { RecalcularOfertaLibranzaComponent } from './recalcular-oferta-libranza/recalcular-oferta-libranza.component';
import { RecalcularOfertaConsumoPlexaComponent } from './recalcular-oferta-consumo-plexa/recalcular-oferta-consumo-plexa.component';
import { ModalRecalcularComponent } from './modal-recalcular/modal-recalcular.component';
import { FormDialogAnalisisFinancieroComponent } from './form-dialog-analisis-financiero/form-dialog-analisis-financiero.component';
import { NgxMaskModule } from 'ngx-mask';
// import { IConfig, NgxMaskModule } from 'ngx-mask';
// import { IConfig, NgxMaskModule } from 'ngx-mask';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormGestionFabricaFabricaMicroComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-fabrica-micro/form-gestion-fabrica-fabrica-micro.component';
import { FormCodeudorComponent } from './form-codeudor/form-codeudor.component';
import { FormDeudorSolitarioComponent } from './form-deudor-solitario/form-deudor-solitario.component';
import { AgendaReferenciacionModule } from '../agenda-referenciacion/agenda-referenciacion.module';
import { GridOfertaMicroComponent } from './grid-oferta-micro/grid-oferta-micro.component';
import { GridCarteraMicroComponent } from './grid-cartera-micro/grid-cartera-micro.component';
import { VerDocumentosComponent } from '../agenda-decision/ver-documentos/ver-documentos.component';
import { VerReferenciacionComponent } from '../agenda-decision/ver-referenciacion/ver-referenciacion.component';
import { RecalcularOfertaMicroComponent } from './recalcular-oferta-micro/recalcular-oferta-micro.component';
import { GridFiltrosDurosComponent } from './grid-filtros-duros/grid-filtros-duros.component';
import { FormGestionFabricaLibranzaPublicaComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-libranza-publica/form-gestion-fabrica-libranza-publica.component';
import { ModalExcepcionCreditoComponent } from './modal-excepcion-credito/modal-excepcion-credito.component';
import { DetalleExcepcionCreditoComponent } from './detalle-excepcion-credito/detalle-excepcion-credito.component';





@NgModule({
    declarations: [
        FormGestionFabricaCreditoComponent,
        VerReferenciacionComponent,
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
        FormGestionFabricaUltracemComponent,
        FormGestionFabricaLibranzaComponent,
        FormGestionFabricaConsumoComponent,
        GridOfertaLibranzaComponent,
        GridCarteraComponent,
        FormDialogCarteraComponent,
        GridCarteraNegociacionComponent,
        FormDialogNegociacionComponent,
        FabricaOpcionesComponent,
        FormDialogCarteraComprarComponent,
        GridConductoresConsumoComponent,
        FormDetallesConductoresComponent,
        GridOfertaConsumoComponent,
        GridHistoricoClienteComponent,
        RecalcularOfertaLibranzaComponent,
        RecalcularOfertaConsumoPlexaComponent,
        ModalRecalcularComponent,
        FormDialogAnalisisFinancieroComponent,
        FormGestionFabricaFabricaMicroComponent,
        FormCodeudorComponent,
        FormDeudorSolitarioComponent,
        GridOfertaMicroComponent,
        GridCarteraMicroComponent,
        VerDocumentosComponent,
        RecalcularOfertaMicroComponent,
        GridFiltrosDurosComponent,
        FormGestionFabricaLibranzaPublicaComponent,
        ModalExcepcionCreditoComponent,
        DetalleExcepcionCreditoComponent
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
        FuseDrawerModule,
        FuseCardModule,
        MatRadioModule,
        FormsModule,
        MatAutocompleteModule,
        // QuillModule,
        MatMenuModule,
        MatSliderModule,
        // FabricaOpcionesModule,
        // NgxMaskModule.forRoot(),
        // NgxMaskModule.forRoot(maskConfig),
        // NgxMaskModule.forRoot(maskConfigFunction),
        NgxMaskModule.forRoot(),
        MatProgressBarModule,
        QuillModule.forRoot(),

        // AgendaReferenciacionModule,
    ],

    exports: [
        FabricaOpcionesComponent,
        RecalcularOfertaLibranzaComponent,
        RecalcularOfertaConsumoPlexaComponent,

    ],

})
export class GestionFabricaCreditoModule { }
