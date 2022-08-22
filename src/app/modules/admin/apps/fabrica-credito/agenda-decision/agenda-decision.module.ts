import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaDecisionRoutingModule } from './agenda-decision-routing.module';
import { GridAgendaDecisionComponent } from './grid-agenda-decision/grid-agenda-decision.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseAlertModule } from '@fuse/components/alert';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgendaReferenciacionModule } from '../agenda-referenciacion/agenda-referenciacion.module';
import { ResumenComponent } from './resumen/resumen.component';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { GestionFabricaCreditoModule } from '../gestion-fabrica-credito/gestion-fabrica-credito.module';
import { FormDecisionComponent } from './form-decision/form-decision.component';


@NgModule({
  declarations: [
    GridAgendaDecisionComponent,
    ResumenComponent,
    FormDecisionComponent
  ],
  imports: [
    CommonModule,
    AgendaDecisionRoutingModule,
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
    FuseCardModule,
    FuseDrawerModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    NgApexchartsModule,
    SharedModule,
    GestionFabricaCreditoModule,
    
  ]
})
export class AgendaDecisionModule { }
