import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrComponent } from './pqr.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TipopqrComponent } from './tipopqr/tipopqr.component';

const routes: Routes = [
  {
    path: 'list',
    component: PqrComponent,
    children: [
      {
        path: '',
        component: ListComponent,
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
    TipopqrComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PqrModule { }
