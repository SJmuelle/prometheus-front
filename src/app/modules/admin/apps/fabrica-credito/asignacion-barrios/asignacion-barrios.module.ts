import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionBarriosRoutingModule } from './asignacion-barrios-routing.module';
import { AsignacionBarriosComponent } from './asignacion-barrios.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AsignacionBarriosComponent
  ],
  imports: [
    CommonModule,
    AsignacionBarriosRoutingModule,
    MatIconModule,
  ]
})
export class AsignacionBarriosModule { }
