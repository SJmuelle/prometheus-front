import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicrocreditoComponent } from './microcredito/microcredito.component';
import { EdicionFormularioResolver } from '../fabrica-credito-resolver';

const routes: Routes = [
  {
    path: 'microcredito',
    component: MicrocreditoComponent,
    resolve:{EdicionFormularioResolver}
  },
  {
    path: 'microcredito/:unidadNegocio/:tipoIdentificacion/:id/:num',
    component: MicrocreditoComponent,
    resolve:{EdicionFormularioResolver}
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosRoutingModule { }
