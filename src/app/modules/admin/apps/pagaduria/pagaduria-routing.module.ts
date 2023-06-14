import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagaduriaComponent } from './pagaduria/pagaduria.component';
import { AgendaPagaduriaModule } from './agenda-pagaduria/agenda-pagaduria.module';
import { GestionPagaduriaModule } from './gestion-pagaduria/gestion-pagaduria.module';
import { GestionMontoPlazoModule } from './gestion-monto-plazo/gestion-monto-plazo.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'par',
        component: PagaduriaComponent
      },
      {
        path: 'agenda-pagaduria',
        loadChildren: () => AgendaPagaduriaModule
      },
      {
        path: 'parametria',
        loadChildren: () => GestionPagaduriaModule
      },
      {
        path: 'plazo/parametria',
        loadChildren: () => GestionMontoPlazoModule
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagaduriaRoutingModule { }
