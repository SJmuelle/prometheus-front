import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametriaRoutingModule } from './parametria-routing.module';
import { ListadoChequeoComponent } from './listado-chequeo/listado-chequeo.component';
import { ListadoChequeoFormComponent } from './listado-chequeo/listado-chequeo-form/listado-chequeo-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListadoChequeoComponent,
    ListadoChequeoFormComponent
  ],
  imports: [
    CommonModule,
    ParametriaRoutingModule,
    FormsModule,
    SharedModule,
    Ng2SearchPipeModule,

    NgxPaginationModule,
    FuseCardModule,
  ]
})
export class ParametriaModule { }
