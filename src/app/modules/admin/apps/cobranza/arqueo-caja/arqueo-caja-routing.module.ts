import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadosComponent } from './listados/listados.component';

const routes: Routes = [
  {
    path:"",
    component: ListadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArqueoCajaRoutingModule { }
