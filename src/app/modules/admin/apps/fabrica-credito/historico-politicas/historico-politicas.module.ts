import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { HistoricoPoliticasRoutingModule } from './historico-politicas-routing.module';
import { HistoricoPoliticasComponent } from './historico-politicas.component';


@NgModule({
  declarations: [
    HistoricoPoliticasComponent
  ],
  imports: [
    CommonModule,
    HistoricoPoliticasRoutingModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class HistoricoPoliticasModule { }
