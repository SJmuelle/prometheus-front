import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULOS
import { FuseCardModule } from '../../../../../@fuse/components/card/card.module';
import { NgxPaginationModule } from 'ngx-pagination';

// MODULOS MATERIAL
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FechaCorridaRoutingModule } from './fecha-corrida-routing.module';
import { FacturaComponent } from './factura/factura.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    FacturaComponent
  ],
    imports: [
        CommonModule,
        FechaCorridaRoutingModule,
        FuseCardModule,
        NgxPaginationModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule
    ]
})
export class FechaCorridaModule { }
