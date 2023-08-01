import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoCarteraRoutingModule } from './seguimiento-cartera-routing.module';
import { SeguimientoCarteraClienteComponent } from './seguimiento-cartera-cliente/seguimiento-cartera-cliente.component';
import { SharedModule } from 'app/shared/shared.module';
import { ModalDetailsCarteraClienteComponent } from './modal-details-cartera-cliente/modal-details-cartera-cliente/modal-details-cartera-cliente.component';
import { ModalActualizarClienteComponent } from './modal-actualizar-cliente/modal-actualizar-cliente/modal-actualizar-cliente.component';
import { ModalSubDetalleClienteComponent } from './modal-sub-detalle-cliente/modal-sub-detalle-cliente/modal-sub-detalle-cliente.component';
import { NgxMaskModule } from 'ngx-mask';
import { AplicarPagosCarteraClienteComponent } from './seguimiento-cartera-cliente/aplicar-pagos-cartera-cliente/aplicar-pagos-cartera-cliente/aplicar-pagos-cartera-cliente.component';







@NgModule({
  declarations: [
    SeguimientoCarteraClienteComponent,
    ModalDetailsCarteraClienteComponent,
    ModalActualizarClienteComponent,
    ModalSubDetalleClienteComponent,
    AplicarPagosCarteraClienteComponent
  ],
  imports: [
    CommonModule,
    SeguimientoCarteraRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SeguimientoCarteraModule { }
