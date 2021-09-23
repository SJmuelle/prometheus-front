import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrComponent } from './pqr.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TipopqrComponent } from './tipopqr/tipopqr.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormComponent } from './tipopqr/form/form.component';
import { CausalesPQRSComponent } from './causales-pqrs/causales-pqrs.component';
import { ResponsablesPQRSComponent } from './responsables-pqrs/responsables-pqrs.component';
import { SolucionesPQRSComponent } from './soluciones-pqrs/soluciones-pqrs.component';
// import { CausalesPQRSComponent } from '.causales-pqrs/causales-pqrs.component';

const routes: Routes = [
  {
    path: 'list',
    component: PqrComponent,
  },
  {
    path: 'configuracion',
    component: PqrComponent,
    children: [
      {
        path: 'tipoPQRS',
        component: TipopqrComponent,
      },
      {
        path: 'causalesPQRS',
        component: CausalesPQRSComponent,
      },
      {
        path: 'responsablesPQRS',
        component: ResponsablesPQRSComponent,
      },
      {
        path: 'solucionesPQRS',
        component: SolucionesPQRSComponent,
      }
    ]
  },
  { path: '**', component: ListComponent },

  // { path: 'pqrs', component: TipoPqrsComponent },
  // { path: 'dias-no-habiles', component: DiasnohabilesComponent },
  // { path: 'causales', component: CausalespqrsComponent },
  // { path: 'responsables', component: ResponsablespqrsComponent },
  // { path: 'solucion', component: SolucionpqrsComponent },
];

@NgModule({
  declarations: [
    PqrComponent,
    ListComponent,
    TipopqrComponent,
    FormComponent,
    CausalesPQRSComponent,
    ResponsablesPQRSComponent,
    SolucionesPQRSComponent
  ],
  imports: [
    SharedModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    CommonModule,
    NgxPaginationModule
  ]
})
export class PqrModule { }
