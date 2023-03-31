import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionCuentasModule } from './asignacion-cuentas/asignacion-cuentas.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'asignacion-cuentas',
        loadChildren: () => AsignacionCuentasModule,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobranzaRoutingModule { }
