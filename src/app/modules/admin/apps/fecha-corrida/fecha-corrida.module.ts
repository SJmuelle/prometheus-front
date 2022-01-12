import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULOS
import { FuseCardModule } from '../../../../../@fuse/components/card/card.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// MODULOS MATERIAL
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';

import { FechaCorridaRoutingModule } from './fecha-corrida-routing.module';
import { FacturaComponent } from './factura/factura.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FacturaComponent
  ],
  imports: [
    CommonModule,
    FechaCorridaRoutingModule,
    FuseCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatExpansionModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule    
  ]
})
export class FechaCorridaModule { }
