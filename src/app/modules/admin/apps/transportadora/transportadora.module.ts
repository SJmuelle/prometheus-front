import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportadoraRoutingModule } from './transportadora-routing.module';
import { ProntoPagoComponent } from './pronto-pago/pronto-pago.component';
import { DetalleComponent } from './pronto-pago/detalle/detalle.component';
import { PorcentajeComponent } from './pronto-pago/detalle/porcentaje/porcentaje.component';
import { PagoMasivoComponent } from './pago-masivo/pago-masivo.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { ActualizarTasaComponent } from './convenios/actualizar-tasa/actualizar-tasa.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';



@NgModule({
  declarations: [
    ProntoPagoComponent,
    DetalleComponent,
    PorcentajeComponent,
    PagoMasivoComponent,
    ConveniosComponent,
    ActualizarTasaComponent
  ],
  imports: [
    CommonModule,
    TransportadoraRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class TransportadoraModule { }
