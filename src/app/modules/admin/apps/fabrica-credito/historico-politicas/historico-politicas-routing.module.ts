import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoPoliticasComponent } from './historico-politicas.component';

const routes: Routes = [{
  path: '', component: HistoricoPoliticasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoPoliticasRoutingModule { }
