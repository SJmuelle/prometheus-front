import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendaReferenciacionComponent } from './grid-agenda-referenciacion/grid-agenda-referenciacion.component';
import { GridTipoReferenciacionComponent } from './grid-tipo-referenciacion/grid-tipo-referenciacion.component';

const routes: Routes = [
  {
    path: '',
    component: GridAgendaReferenciacionComponent
  },
  {
    path: ':num/:id',
    component: GridTipoReferenciacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaReferenciacionRoutingModule { }
