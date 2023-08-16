import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConsignacionesComponent } from './form-consignaciones/form-consignaciones.component';

const routes: Routes = [
  {
    path:"",
    component: FormConsignacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsignacionesRoutingModule { }
