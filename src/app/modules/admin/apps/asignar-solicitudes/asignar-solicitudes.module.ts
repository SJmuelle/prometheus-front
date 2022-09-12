import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignarSolicitudesRoutingModule } from './asignar-solicitudes-routing.module';
import { ListSolicitudesComponent } from './list-solicitudes/list-solicitudes.component';

import { FuseAlertModule } from '@fuse/components/alert';
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

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


@NgModule({
  declarations: [
    ListSolicitudesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AsignarSolicitudesRoutingModule,
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
export class AsignarSolicitudesModule { }
