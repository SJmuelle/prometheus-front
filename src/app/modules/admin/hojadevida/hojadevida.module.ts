import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HojadevidaComponent } from './hojadevida.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { CreditoComponent } from '../../../components/credito/credito.component';
import { ModalcreditoComponent } from '../../../components/modalcredito/modalcredito.component';
import { CarteraComponent } from '../../../components/cartera/cartera.component';
import { ModalcarteraComponent } from '../../../components/modalcartera/modalcartera.component';


const routes: Routes = [
  { path: '', component: HojadevidaComponent }
];

@NgModule({
  declarations: [
    HojadevidaComponent,
    CreditoComponent,
    ModalcreditoComponent,
    CarteraComponent,
    ModalcarteraComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class HojadevidaModule { }
