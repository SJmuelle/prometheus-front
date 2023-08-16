import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAperturaCajaComponent } from './form-apertura-caja/form-apertura-caja.component';

const routes: Routes = [
  {
    path: "",
    component: FormAperturaCajaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AperturaCajaRoutingModule { }
