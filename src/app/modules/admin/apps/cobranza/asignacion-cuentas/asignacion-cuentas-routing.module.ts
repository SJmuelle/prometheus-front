import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaCoberturaComponent } from './mapa-cobertura/mapa-cobertura.component';

const routes: Routes = [
  {
    path: '',
    component: MapaCoberturaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionCuentasRoutingModule { }
