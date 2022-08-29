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
import { ListadoPreguntasReferenciacionComponent } from './listado-preguntas-referenciacion/listado-preguntas-referenciacion.component';
import { ListadoPreguntasReferenciacionFormComponent } from './listado-preguntas-referenciacion/listado-preguntas-referenciacion-form/listado-preguntas-referenciacion-form.component';
import { ListadoTiposComentariosComponent } from './listado-tipos-comentarios/listado-tipos-comentarios.component';
import { ListadoTiposComentariosFormComponent } from './listado-tipos-comentarios/listado-tipos-comentarios-form/listado-tipos-comentarios-form.component';
import { TiempoAgendaComponent } from './tiempo-agenda/tiempo-agenda.component';
import { FormTiempoAgendaComponent } from './tiempo-agenda/form-tiempo-agenda/form-tiempo-agenda.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ListadoChequeoComponent,
    ListadoChequeoFormComponent,
    ListadoPreguntasReferenciacionComponent,
    ListadoPreguntasReferenciacionFormComponent,
    ListadoTiposComentariosComponent,
    TiempoAgendaComponent,
    FormTiempoAgendaComponent,
    ListadoTiposComentariosFormComponent
  ],
  imports: [
    CommonModule,
    ParametriaRoutingModule,
    FormsModule,
    SharedModule,
    Ng2SearchPipeModule,
    MatTooltipModule,
    NgxPaginationModule,
    FuseCardModule,
  ]
})
export class ParametriaModule { }
