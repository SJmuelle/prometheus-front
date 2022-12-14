import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '../../../../../@fuse/components/card/card.module';
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
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TrasladosRoutingModule } from './traslados-routing.module';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { ListFinalizadoComponent } from './list-finalizado/list-finalizado.component';
import { DebiendoComponent } from './list-solicitud/debiendo/debiendo.component';
import { DetalleDeudaComponent } from './list-solicitud/debiendo/detalle-deuda/detalle-deuda.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { AdministradorComponent } from './administrador/administrador.component';


@NgModule({
  declarations: [
    ListSolicitudComponent,
    ObservacionComponent,
    ListFinalizadoComponent,
    DebiendoComponent,
    DetalleDeudaComponent,
    CrearSolicitudComponent,
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FuseCardModule,
    ReactiveFormsModule,
    TrasladosRoutingModule,
    FuseAlertModule,
    Ng2SearchPipeModule,
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
    MatDatepickerModule
  ]
})
export class TrasladosModule { }
