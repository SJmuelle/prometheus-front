import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaFirmaDigitalRoutingModule } from './agenda-firma-digital-routing.module';
import { GridAgendaFirmaDigitalComponent } from './grid-agenda-firma-digital/grid-agenda-firma-digital.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgendaReferenciacionModule } from '../agenda-referenciacion/agenda-referenciacion.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormActualizarInfoComponent } from './form-actualizar-info/form-actualizar-info.component';
import { FuseCardModule } from '@fuse/components/card';
import { TablaEvidenteComponent } from './tabla-evidente/tabla-evidente.component';
import { MatListModule } from '@angular/material/list';
import { NgxMaskModule } from 'ngx-mask';
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { ModalDetalleFirmaDigitalComponent } from './modal-detalle-firma-digital/modal-detalle-firma-digital/modal-detalle-firma-digital.component';




@NgModule({
  declarations: [
    GridAgendaFirmaDigitalComponent,
    FormActualizarInfoComponent,
    TablaEvidenteComponent,
    ModalDetalleFirmaDigitalComponent
  ],
  imports: [
    AgendaFirmaDigitalRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    FuseAlertModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    AgendaReferenciacionModule,
    MatMenuModule,
    MatButtonToggleModule,
    SharedModule,
    FuseCardModule,
    MatDividerModule,
    MatListModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    NgxMaskModule.forRoot(),


  ]
})
export class AgendaFirmaDigitalModule { }
