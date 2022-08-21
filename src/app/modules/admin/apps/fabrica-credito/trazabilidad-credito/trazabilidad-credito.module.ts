import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrazabilidadCreditoRoutingModule } from './trazabilidad-credito-routing.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
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
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { DetalleTrazabilidadComponent } from './detalle-trazabilidad/detalle-trazabilidad.component';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FabricaOpcionesModule } from '../fabrica-opciones/fabrica-opciones.module';


@NgModule({
  declarations: [
    BusquedaComponent,
    DetalleTrazabilidadComponent
  ],
  imports: [
    CommonModule,
    TrazabilidadCreditoRoutingModule,
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
    FuseFindByKeyPipeModule,
    SharedModule,
    FuseDrawerModule,
    FabricaOpcionesModule
  ]
})
export class TrazabilidadCreditoModule { }
