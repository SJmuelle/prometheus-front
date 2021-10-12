import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaCompletacionRoutingModule } from './agenda-completacion-routing.module';
import {GridAgendaCompletacionComponent} from './grid-agenda-completacion/grid-agenda-completacion.component';
import {ContenedorFabricaComponent} from './contenedor-fabrica/contenedor-fabrica.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
      GridAgendaCompletacionComponent,
      ContenedorFabricaComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatDividerModule,
    AgendaCompletacionRoutingModule
  ]
})
export class AgendaCompletacionModule { }
