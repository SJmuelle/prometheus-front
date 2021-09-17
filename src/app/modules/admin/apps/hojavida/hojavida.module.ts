import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HojavidaComponent } from './hojavida.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
// import { FormControl } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalcarteraComponent } from 'app/components/hojadevida/modalcartera/modalcartera.component';
import { ModalcreditoComponent } from 'app/components/hojadevida/modalcredito/modalcredito.component';
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
