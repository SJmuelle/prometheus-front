import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridEnlacesComponent } from './grid-enlaces/grid-enlaces.component';

const routes: Routes = [
  {
    path: '',
    component: GridEnlacesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferidosRoutingModule { }
