import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendaComiteComercialComponent } from './grid-agenda-comite-comercial/grid-agenda-comite-comercial.component';

const routes: Routes = [{
  path: '',
  component: GridAgendaComiteComercialComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaComiteComercialRoutingModule { }
