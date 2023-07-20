import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionBarriosComponent } from './asignacion-barrios.component';

const routes: Routes = [{
  path: '', component: AsignacionBarriosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionBarriosRoutingModule { }
