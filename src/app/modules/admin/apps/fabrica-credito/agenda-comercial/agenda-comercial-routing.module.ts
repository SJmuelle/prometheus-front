import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendaComercialComponent } from "./grid-agenda-comercial/grid-agenda-comercial.component";

const routes: Routes = [
  {
    path: '',
    component: GridAgendaComercialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaComercialRoutingModule { }
