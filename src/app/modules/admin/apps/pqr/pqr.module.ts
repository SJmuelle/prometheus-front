import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PqrComponent } from './pqr.component';
import { ListComponent } from './list/list.component';
import { TipopqrComponent } from './tipopqr/tipopqr.component';
import { FormComponent } from './tipopqr/form/form.component';
import { CausalesPQRSComponent } from './causales-pqrs/causales-pqrs.component';
import { ResponsablesPQRSComponent } from './responsables-pqrs/responsables-pqrs.component';
import { SolucionesPQRSComponent } from './soluciones-pqrs/soluciones-pqrs.component';
import { FormCausalesComponent } from './causales-pqrs/form-causales/form-causales.component';
import { FormResponsablesComponent } from './responsables-pqrs/form-responsables/form-responsables.component';
import { FormSolucionesComponent } from './soluciones-pqrs/form-soluciones/form-soluciones.component';
import { CreacionPQRSComponent } from './creacion-pqrs/creacion-pqrs.component';
// import { CreacionComponent } from './creacion/creacion.component';
// import { CausalesPQRSComponent } from '.causales-pqrs/causales-pqrs.component';
import { FuseCardModule } from '../../../../../@fuse/components/card/card.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { GestionPQRSComponent } from './gestion-pqrs/gestion-pqrs.component';
import { QuillModule } from 'ngx-quill';
const routes: Routes = [
  {
    path: 'creacion/:cliente',
    component: CreacionPQRSComponent,
  },
  {
    path: 'gestion/:idPQR',
    component: GestionPQRSComponent,
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
    SolucionesPQRSComponent,
    FormCausalesComponent,
    FormResponsablesComponent,
    FormSolucionesComponent,
    CreacionPQRSComponent,
    GestionPQRSComponent,
    // CreacionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    
    NgxPaginationModule,
    FuseCardModule,
    
    QuillModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,

  ]
})
export class PqrModule { }
