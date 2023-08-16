import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormActualizacionDataComponent } from './form-actualizacion-data/form-actualizacion-data.component';
const routes: Routes = [
  {
    path:"",
    component: FormActualizacionDataComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizacionDatosRoutingModule { }
