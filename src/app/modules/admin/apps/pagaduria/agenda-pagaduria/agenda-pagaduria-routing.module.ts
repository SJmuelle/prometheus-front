import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCreditosComponent } from './listado-creditos/listado-creditos.component';
import { DetalleCreditoComponent } from './detalle-credito/detalle-credito.component';

const routes: Routes = [
  {
    path:"",
    component:ListadoCreditosComponent
  },
  {
    path: 'detalleCreditoPagaduria/:num/:id/:estado',
    component: DetalleCreditoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaPagaduriaRoutingModule { }
