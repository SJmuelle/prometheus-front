import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoCarteraRoutingModule } from './seguimiento-cartera-routing.module';
import { SeguimientoCarteraClienteComponent } from './seguimiento-cartera-cliente/seguimiento-cartera-cliente.component';
import { SharedModule } from 'app/shared/shared.module';
import { ModalDetailsCarteraClienteComponent } from './modal-details-cartera-cliente/modal-details-cartera-cliente/modal-details-cartera-cliente.component';


@NgModule({
  declarations: [
    SeguimientoCarteraClienteComponent,
    ModalDetailsCarteraClienteComponent
  ],
  imports: [
    CommonModule,
    SeguimientoCarteraRoutingModule,
    SharedModule
  ]
})
export class SeguimientoCarteraModule { }
