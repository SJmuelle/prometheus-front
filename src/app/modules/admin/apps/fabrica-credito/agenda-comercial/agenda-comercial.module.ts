import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComercialRoutingModule } from './agenda-comercial-routing.module';
import { GridAgendaComercialComponent } from './grid-agenda-comercial/grid-agenda-comercial.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {FuseAlertModule} from "../../../../../../@fuse/components/alert";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    GridAgendaComercialComponent
  ],
  imports: [
    CommonModule,
    AgendaComercialRoutingModule,
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
    MatExpansionModule   
  ]
})
export class AgendaComercialModule { }
