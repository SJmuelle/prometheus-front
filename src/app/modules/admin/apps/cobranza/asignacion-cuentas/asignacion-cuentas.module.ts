import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionCuentasRoutingModule } from './asignacion-cuentas-routing.module';
import { MapaCoberturaComponent } from './mapa-cobertura/mapa-cobertura.component';
import { AsignacionCuentasComponent } from './asignacion-cuentas.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListadoComponent } from './listado/listado.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'app/shared/shared.module';
import { DetalleAsignacionComponent } from './detalle-asignacion/detalle-asignacion.component';


@NgModule({
  declarations: [
    MapaCoberturaComponent,
    AsignacionCuentasComponent,
    ListadoComponent,
    DetalleAsignacionComponent,
  ],
  imports: [
    CommonModule,
    AsignacionCuentasRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    SharedModule

  ]
})
export class AsignacionCuentasModule { }