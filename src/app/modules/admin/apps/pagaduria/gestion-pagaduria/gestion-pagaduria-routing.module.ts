import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPagaduriasComponent } from './listado-pagadurias/listado-pagadurias.component';

const routes: Routes = [
  {
    path:"gestion-pagaduria",
    component:ListadoPagaduriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionPagaduriaRoutingModule { }
