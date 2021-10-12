import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormGestionFabricaCreditoComponent} from "./form-gestion-fabrica-credito/form-gestion-fabrica-credito.component";

const routes: Routes = [
    {
        path: '',
        component: FormGestionFabricaCreditoComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFabricaCreditoRoutingModule { }
