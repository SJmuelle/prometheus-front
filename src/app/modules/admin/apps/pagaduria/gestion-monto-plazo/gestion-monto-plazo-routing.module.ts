import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPlazosComponent } from './listado-plazos/listado-plazos.component';
import { DetallePlazoComponent } from './detalle-plazo/detalle-plazo.component';
import { CanDeactivateGestionPlazo } from './gestion-plazo-guards';

const routes: Routes = [
  {
  path:"gestion-plazo",
  component:ListadoPlazosComponent,
  children: [
    {
      path: ':tipoContrato',
      component: DetallePlazoComponent,
      canDeactivate: [CanDeactivateGestionPlazo]
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMontoPlazoRoutingModule { }
