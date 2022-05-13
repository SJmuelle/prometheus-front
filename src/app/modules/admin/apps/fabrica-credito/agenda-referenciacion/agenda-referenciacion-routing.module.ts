import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAgendaReferenciacionComponent } from './form-agenda-referenciacion/form-agenda-referenciacion.component';
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
  {
    path: 'agenda/:num/:id/:tipo',
    component: FormAgendaReferenciacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaReferenciacionRoutingModule { }
