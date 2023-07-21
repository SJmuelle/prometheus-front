import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoCarteraRoutingModule } from './seguimiento-cartera-routing.module';
import { SeguimientoCarteraClienteComponent } from './seguimiento-cartera-cliente/seguimiento-cartera-cliente.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    SeguimientoCarteraClienteComponent
  ],
  imports: [
    CommonModule,
    SeguimientoCarteraRoutingModule,
    SharedModule
  ]
})
export class SeguimientoCarteraModule { }
