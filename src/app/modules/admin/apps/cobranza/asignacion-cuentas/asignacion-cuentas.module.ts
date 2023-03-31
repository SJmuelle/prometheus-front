import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionCuentasRoutingModule } from './asignacion-cuentas-routing.module';
import { MapaCoberturaComponent } from './mapa-cobertura/mapa-cobertura.component';


@NgModule({
  declarations: [
    MapaCoberturaComponent
  ],
  imports: [
    CommonModule,
    AsignacionCuentasRoutingModule
  ]
})
export class AsignacionCuentasModule { }
