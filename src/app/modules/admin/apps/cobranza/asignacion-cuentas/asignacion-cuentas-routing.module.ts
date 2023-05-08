import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionCuentasComponent } from './asignacion-cuentas.component';
import { DetalleAsignacionComponent } from './detalle-asignacion/detalle-asignacion.component';
import { CanDeactivateAsignacionDetalles } from './asignacion-cuentas.guards';

const routes: Routes = [
  {
    path: '',
    component: AsignacionCuentasComponent,
    children: [
      {
        path: ':idNegocio',
        component: DetalleAsignacionComponent,
        canDeactivate:[CanDeactivateAsignacionDetalles]
      },
    ],
   
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionCuentasRoutingModule { }
