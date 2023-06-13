import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NegociacionesRoutingModule } from './negociaciones-routing.module';
import { NegociacionCarteraComponent } from './negociacion-cartera/negociacion-cartera.component';
import { DataTableComponent } from './negociacion-cartera/data-table/data-table.component';
import { DataModalComponent } from './negociacion-cartera/data-modal/data-modal.component';
import { SharedModule } from 'app/shared/shared.module';
import { DataTablePipe } from '../../../../shared/pipes/data-table.pipe'

@NgModule({
  declarations: [
    NegociacionCarteraComponent,
    DataTableComponent,
    DataModalComponent,
    DataTablePipe

  ],
  imports: [
    CommonModule,
    NegociacionesRoutingModule,
    SharedModule,

  ],
  exports: [DataTablePipe]
})
export class NegociacionesModule { }
