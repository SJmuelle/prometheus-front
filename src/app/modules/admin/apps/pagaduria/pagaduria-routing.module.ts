import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagaduriaComponent } from './pagaduria/pagaduria.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'par',
        component: PagaduriaComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagaduriaRoutingModule { }
