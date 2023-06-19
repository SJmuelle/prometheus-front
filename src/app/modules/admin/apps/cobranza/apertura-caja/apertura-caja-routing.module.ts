import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioAperturaComponent } from './formulario-apertura/formulario-apertura.component';

const routes: Routes = [
  {
    path: "",
    component: FormularioAperturaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AperturaCajaRoutingModule { }
