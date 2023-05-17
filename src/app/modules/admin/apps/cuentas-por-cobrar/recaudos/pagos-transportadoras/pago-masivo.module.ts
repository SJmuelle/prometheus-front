import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoMasivoRoutingModule } from './pago-masivo-routing.module';
import { ImportFileComponent } from './import-file/import-file.component';

import { FuseAlertModule } from '@fuse/components/alert';
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { FuseCardModule } from '@fuse/components/card'; 

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ConveniosComponent } from './import-file/convenios/convenios.component';
import { ActualizarTasaComponent } from './import-file/convenios/actualizar-tasa/actualizar-tasa.component';



@NgModule({
  declarations: [
    ImportFileComponent,
    ConveniosComponent,
    ActualizarTasaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PagoMasivoRoutingModule,
    FuseCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatDialogModule,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonToggleModule,
    FuseAlertModule,
    Ng2SearchPipeModule
  ]
})
export class PagoMasivoModule { }
