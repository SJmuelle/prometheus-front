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
import { CausalespqrsComponent } from '../../../components/causalespqrs/causalespqrs.component';
import { ModalescausalespqrsComponent } from '../../../components/modalescausalespqrs/modalescausalespqrs.component';
import { ResponsablespqrsComponent } from '../../../components/responsablespqrs/responsablespqrs.component';
import { ModalresponsablespqrsComponent } from '../../../components/modalresponsablespqrs/modalresponsablespqrs.component';


const routes: Routes = [
  { path: 'hv', component: HojadevidaComponent },
  { path: 'pqrs', component: TipoPqrsComponent },
  { path: 'dias-no-habiles', component: DiasnohabilesComponent },
  { path: 'causales', component: CausalespqrsComponent },
  { path: 'responsables', component: ResponsablespqrsComponent },
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
    ModaldiasnohabilesComponent,
    CausalespqrsComponent,
    ModalescausalespqrsComponent,
    ResponsablespqrsComponent,
    ModalresponsablespqrsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class HojadevidaModule { }
