import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MercadeoRoutingModule } from './mercadeo-routing.module';
import { ReporterdMercadeoComponent } from './reporterd-mercadeo/reporterd-mercadeo.component';


@NgModule({
  declarations: [
    ReporterdMercadeoComponent
  ],
  imports: [
    CommonModule,
    MercadeoRoutingModule
  ]
})
export class MercadeoModule { }
