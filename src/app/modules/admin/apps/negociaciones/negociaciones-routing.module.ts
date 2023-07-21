import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NegociacionCarteraComponent } from './negociacion-cartera/negociacion-cartera.component';

const routes: Routes = [
  {
    path: '',
    component: NegociacionCarteraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NegociacionesRoutingModule { }
