import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaCoberturaComponent } from './mapa-cobertura/mapa-cobertura.component';
import { AsignacionCuentasComponent } from './asignacion-cuentas.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
  {
    path: '',
    component: AsignacionCuentasComponent,
    children: [
      {
        path: 'mapa',
        component: MapaCoberturaComponent,
      },
      {
        path: 'listado',
        component: ListadoComponent,
      },
      {path: '**', redirectTo: 'listado'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionCuentasRoutingModule { }
