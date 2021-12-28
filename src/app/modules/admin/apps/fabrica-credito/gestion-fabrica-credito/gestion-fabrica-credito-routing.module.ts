import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormGestionFabricaCreditoComponent} from './form-gestion-fabrica-credito/form-gestion-fabrica-credito.component';
import {GridComentariosComponent} from './grid-comentarios/grid-comentarios.component';

const routes: Routes = [
    {
        path: 'commentaries/:num',
        component: GridComentariosComponent
    },
    {
        path: ':num/:id',
        component: FormGestionFabricaCreditoComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFabricaCreditoRoutingModule { }
