import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesosRoutingModule } from './procesos-routing.module';
import { MetasIndicadoresComercialesComponent } from './metas-indicadores-comerciales/metas-indicadores-comerciales.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { FuseAlertModule } from '@fuse/components/alert';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    MetasIndicadoresComercialesComponent
  ],
  imports: [
    CommonModule,
    ProcesosRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTooltipModule,
    FuseFindByKeyPipeModule,
    SharedModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FuseAlertModule,
    MatExpansionModule,
    MatAutocompleteModule
  ]
})
export class ProcesosModule { }
