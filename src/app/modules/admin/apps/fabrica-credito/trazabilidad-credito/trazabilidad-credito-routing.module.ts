import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetalleTrazabilidadComponent } from './detalle-trazabilidad/detalle-trazabilidad.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaComponent
  },
  {
    path: 'detalle-trazabilidad/:num/:id',
    component: DetalleTrazabilidadComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrazabilidadCreditoRoutingModule { }
