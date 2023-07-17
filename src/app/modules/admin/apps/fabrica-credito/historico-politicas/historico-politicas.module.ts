import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { HistoricoPoliticasRoutingModule } from './historico-politicas-routing.module';
import { HistoricoPoliticasComponent } from './historico-politicas.component';
import { SharedModule } from 'app/shared/shared.module';
import { PoliticasAgendasComponent } from './politicas-agendas/politicas-agendas.component';


@NgModule({
  declarations: [
    HistoricoPoliticasComponent,
    PoliticasAgendasComponent
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
    ReactiveFormsModule,
    MatInputModule,
    SharedModule
  ]
})
export class HistoricoPoliticasModule { }
