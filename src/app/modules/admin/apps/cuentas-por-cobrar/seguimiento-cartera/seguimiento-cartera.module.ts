import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoCarteraRoutingModule } from './seguimiento-cartera-routing.module';
import { SeguimientoCarteraClienteComponent } from './seguimiento-cartera-cliente/seguimiento-cartera-cliente.component';
import { SharedModule } from 'app/shared/shared.module';
import { ModalActualizarClienteComponent } from './modal-actualizar-cliente/modal-actualizar-cliente/modal-actualizar-cliente.component';
import { ModalSubDetalleClienteComponent } from './modal-sub-detalle-cliente/modal-sub-detalle-cliente/modal-sub-detalle-cliente.component';
import { NgxMaskModule } from 'ngx-mask';







@NgModule({
  declarations: [
    SeguimientoCarteraClienteComponent,
    ModalActualizarClienteComponent,
    ModalSubDetalleClienteComponent,
  ],
  imports: [
    CommonModule,
    SeguimientoCarteraRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SeguimientoCarteraModule { }
