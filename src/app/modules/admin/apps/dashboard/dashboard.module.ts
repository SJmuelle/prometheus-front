import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  // { path: 'pqrs', component: TipoPqrsComponent },
  // { path: 'dias-no-habiles', component: DiasnohabilesComponent },
  // { path: 'causales', component: CausalespqrsComponent },
  // { path: 'responsables', component: ResponsablespqrsComponent },
  // { path: 'solucion', component: SolucionpqrsComponent },
];


@NgModule({
  declarations: [
    BienvenidaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
