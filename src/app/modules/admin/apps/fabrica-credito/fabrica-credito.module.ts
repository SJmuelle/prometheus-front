import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricaCreditoRoutingModule } from './fabrica-credito-routing.module';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
  ],
    imports: [
        CommonModule,
        FabricaCreditoRoutingModule,
        MatListModule,
    ]
})
export class FabricaCreditoModule { }
