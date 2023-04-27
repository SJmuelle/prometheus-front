import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetasIndicadoresComercialesComponent } from './metas-indicadores-comerciales/metas-indicadores-comerciales.component';

const routes: Routes = [
  {
    path:"metas-indicadores-comercial",
    component:MetasIndicadoresComercialesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
