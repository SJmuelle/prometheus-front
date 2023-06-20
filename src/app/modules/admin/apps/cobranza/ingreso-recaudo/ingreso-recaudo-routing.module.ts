import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormIngresoRecaudoComponent } from './form-ingreso-recaudo/form-ingreso-recaudo.component';

const routes: Routes = [
  {
    path:"",
    component:FormIngresoRecaudoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRecaudoRoutingModule { }
