import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetasIndicadoresComercialesComponent } from './metas-indicadores-comerciales/metas-indicadores-comerciales.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';

const routes: Routes = [
  {
    path:"metas-indicadores-comercial",
    component:MetasIndicadoresComercialesComponent
  },
  {
    path:"asignaciones",
    component:AsignacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
