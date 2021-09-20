import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HojavidaComponent } from './hojavida.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalcarteraComponent } from 'app/components/hojadevida/modalcartera/modalcartera.component';
import { ModalcreditoComponent } from 'app/components/hojadevida/modalcredito/modalcredito.component';
import { ModalIngresoComponent } from 'app/components/hojadevida/modal-ingreso/modal-ingreso.component';

import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
  { path: 'hv', component: HojavidaComponent },
  // { path: 'pqrs', component: TipoPqrsComponent },
  // { path: 'dias-no-habiles', component: DiasnohabilesComponent },
  // { path: 'causales', component: CausalespqrsComponent },
  // { path: 'responsables', component: ResponsablespqrsComponent },
  // { path: 'solucion', component: SolucionpqrsComponent },
];

@NgModule({
  declarations: [
    HojavidaComponent,
    ModalcarteraComponent,
    ModalcreditoComponent,
    ModalIngresoComponent
  ],
  imports: [
    CommonModule,
    // FormControl,
    Ng2SearchPipeModule,
    SharedModule, RouterModule.forChild(routes),
    NgxPaginationModule

  ]
})
export class HojavidaModule { }
