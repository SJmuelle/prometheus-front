import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagaduriaRoutingModule } from './pagaduria-routing.module';
import { PagaduriaComponent } from './pagaduria/pagaduria.component';

import { FuseAlertModule } from '@fuse/components/alert';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    PagaduriaComponent
  ],
  imports: [
    CommonModule,
    PagaduriaRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatExpansionModule,
    FuseAlertModule
  ]
})
export class PagaduriaModule { }
