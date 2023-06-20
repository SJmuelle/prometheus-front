import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormActualizacionComponent } from './form-actualizacion/form-actualizacion.component';

const routes: Routes = [
  {
    path:"",
    component: FormActualizacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizacionDatosRoutingModule { }
