import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProntoPagoRoutingModule } from './pronto-pago-routing.module';
import { ListPagosComponent } from './list-pagos/list-pagos.component';
import { FormsModule } from '@angular/forms';
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
import { DetalleComponent } from './list-pagos/detalle/detalle.component';
import { PorcentajeComponent } from './list-pagos/detalle/porcentaje/porcentaje.component';



@NgModule({
  declarations: [
    ListPagosComponent,
    DetalleComponent,
    PorcentajeComponent
  ],
  imports: [
    CommonModule,
    ProntoPagoRoutingModule,
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
    Ng2SearchPipeModule
  ]
})
export class ProntoPagoModule { }
