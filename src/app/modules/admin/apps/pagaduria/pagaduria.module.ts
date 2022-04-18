import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagaduriaRoutingModule } from './pagaduria-routing.module';
import { PagaduriaComponent } from './pagaduria/pagaduria.component';
import { ObligacionesComponent } from './pagaduria/obligaciones/obligaciones.component';
import { AprobarReferenciaLaboralComponent } from './pagaduria/aprobar-referencia-laboral/aprobar-referencia-laboral.component';
import { RechazarReferenciaLaboralComponent } from './pagaduria/rechazar-referencia-laboral/rechazar-referencia-laboral.component';

import { FuseAlertModule } from '@fuse/components/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AprobarCapacidadPagoComponent } from './pagaduria/aprobar-capacidad-pago/aprobar-capacidad-pago.component';
import { RechazarCapacidadPagoComponent } from './pagaduria/rechazar-capacidad-pago/rechazar-capacidad-pago.component';


@NgModule({
  declarations: [
    PagaduriaComponent,
    ObligacionesComponent,
    AprobarReferenciaLaboralComponent,
    RechazarReferenciaLaboralComponent,
    AprobarCapacidadPagoComponent,
    RechazarCapacidadPagoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagaduriaRoutingModule,
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
    FuseAlertModule
  ]
})
export class PagaduriaModule { }
