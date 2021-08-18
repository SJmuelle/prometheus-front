import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HojadevidaComponent } from './hojadevida.component';
import { SharedModule } from 'app/shared/shared.module';
import { CreditoComponent } from '../../../components/credito/credito.component';
import { ModalcreditoComponent } from '../../../components/modalcredito/modalcredito.component';
import { CarteraComponent } from '../../../components/cartera/cartera.component';
import { ModalcarteraComponent } from '../../../components/modalcartera/modalcartera.component';
import { DatatableComponent } from '../../../components/datatable/datatable.component';
import { TipoPqrsComponent } from '../../../components/tipo-pqrs/tipo-pqrs.component';
import { ModalTipoPqrsComponent } from '../../../components/modal-tipo-pqrs/modal-tipo-pqrs.component';
import { DiasnohabilesComponent } from '../../../components/diasnohabiles/diasnohabiles.component';
import { ModaldiasnohabilesComponent } from '../../../components/modaldiasnohabiles/modaldiasnohabiles.component';


const routes: Routes = [
  { path: 'hv', component: HojadevidaComponent },
  { path: 'pqrs', component: TipoPqrsComponent },
  { path: 'dias-no-habiles', component: DiasnohabilesComponent }
];

@NgModule({
  declarations: [
    HojadevidaComponent,
    CreditoComponent,
    ModalcreditoComponent,
    CarteraComponent,
    ModalcarteraComponent,
    DatatableComponent,
    TipoPqrsComponent,
    ModalTipoPqrsComponent,
    DiasnohabilesComponent,
    ModaldiasnohabilesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class HojadevidaModule { }
