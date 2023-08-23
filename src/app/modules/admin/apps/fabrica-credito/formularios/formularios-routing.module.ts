import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicrocreditoComponent } from './microcredito/microcredito.component';
import { EdicionFormularioResolver } from '../fabrica-credito-resolver';
import { LibranzaPublicaComponent } from './libranza-publica/libranza-publica.component';

const routes: Routes = [
  {
    path: 'microcredito/:agenda',
    component: MicrocreditoComponent,
    resolve:{EdicionFormularioResolver}
  },
  {
    path: 'microcredito/:unidadNegocio/:tipoIdentificacion/:id/:num',
    component: MicrocreditoComponent,
    resolve:{EdicionFormularioResolver}
  },
  {
    path: 'libranza-publica',
    component: LibranzaPublicaComponent,
    resolve:{EdicionFormularioResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosRoutingModule { }
