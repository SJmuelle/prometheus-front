import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicrocreditoComponent } from './microcredito/microcredito.component';

const routes: Routes = [
  {
    path: 'microcredito',
    component: MicrocreditoComponent
  },
  {
    path: 'microcredito/:unidadNegocio/:tipoIdentificacion/:id/:num',
    component: MicrocreditoComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosRoutingModule { }
