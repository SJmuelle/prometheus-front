import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAgendaFirmaDigitalComponent } from './grid-agenda-firma-digital/grid-agenda-firma-digital.component';

const routes: Routes = [
  {
    path: '',
    component: GridAgendaFirmaDigitalComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaFirmaDigitalRoutingModule { }
