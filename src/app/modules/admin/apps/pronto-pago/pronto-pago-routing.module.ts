import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPagosComponent } from './list-pagos/list-pagos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-pago',
        component: ListPagosComponent
      },
      {path: '**', redirectTo: 'list-pago'}
    ]
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProntoPagoRoutingModule { }
