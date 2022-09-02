import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendaCarteraComponent } from './grid-agenda-cartera/grid-agenda-cartera.component';

const routes: Routes = [
  {
    path: '',
    component: GridAgendaCarteraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaGestionCarteraRoutingModule { }
