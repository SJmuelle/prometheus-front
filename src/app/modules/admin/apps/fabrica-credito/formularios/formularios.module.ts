import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { MicrocreditoComponent } from './microcredito/microcredito.component';


@NgModule({
  declarations: [
    MicrocreditoComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule
  ]
})
export class FormulariosModule { }
