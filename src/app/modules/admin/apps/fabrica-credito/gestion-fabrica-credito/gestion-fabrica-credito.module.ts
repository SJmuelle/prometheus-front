import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFabricaCreditoRoutingModule } from './gestion-fabrica-credito-routing.module';
import { FormGestionFabricaCreditoComponent } from './form-gestion-fabrica-credito/form-gestion-fabrica-credito.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CdkScrollableModule} from "@angular/cdk/scrolling";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";
import { FormRepresentanteLegalComponent } from './form-representante-legal/form-representante-legal.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {MAT_DATE_LOCALE} from "@angular/material/core";


@NgModule({
  declarations: [
    FormGestionFabricaCreditoComponent,
    FormRepresentanteLegalComponent
  ],
    imports: [
        CommonModule,
        GestionFabricaCreditoRoutingModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        CdkScrollableModule,
        MatIconModule,
        MatDatepickerModule,
        MatTabsModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule
    ],

})
export class GestionFabricaCreditoModule { }
