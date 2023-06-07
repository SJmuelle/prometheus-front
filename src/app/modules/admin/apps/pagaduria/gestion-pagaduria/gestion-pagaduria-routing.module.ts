import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPagaduriasComponent } from './listado-pagadurias/listado-pagadurias.component';
import { DetallePagaduriaComponent } from './detalle-pagaduria/detalle-pagaduria.component';
import { CanDeactivateGestionPagaduria } from './gestion-pagaduria-guards';

const routes: Routes = [
  {
    path:"gestion-pagaduria",
    component:ListadoPagaduriasComponent,
    children: [
      {
        path: ':pagaduria',
        component: DetallePagaduriaComponent,
        canDeactivate: [CanDeactivateGestionPagaduria]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionPagaduriaRoutingModule { }
