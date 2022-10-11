import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferidosRoutingModule } from './referidos-routing.module';
import { GridEnlacesComponent } from './grid-enlaces/grid-enlaces.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    GridEnlacesComponent
  ],
  imports: [
    CommonModule,
    ReferidosRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FuseCardModule,
    ClipboardModule,
    MatTooltipModule
  ]
})
export class ReferidosModule { }
