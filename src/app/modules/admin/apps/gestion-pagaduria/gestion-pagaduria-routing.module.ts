import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridListadoGestionPagaduriaComponent } from './listado-gestion-pagaduria/grid-listado-gestion-pagaduria/grid-listado-gestion-pagaduria.component';
import { ListadoGestionPagaduriaComponent } from './listado-gestion-pagaduria/listado-gestion-pagaduria.component';
import { GridListadoGestionPlazosComponent } from './listado-gestion-plazos/grid-listado-gestion-plazos/grid-listado-gestion-plazos.component';
import { GridFormularioGestionPagaduriaComponent } from './formulario-gestion-pagaduria/grid-formulario-gestion-pagaduria/grid-formulario-gestion-pagaduria.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [


  {
    path: '',
    component: ListadoGestionPagaduriaComponent,
    children: [
      {
        path: 'gestion-pagaduria',
        component: GridListadoGestionPagaduriaComponent
      },

      {
        path: 'gestion-plazos',
        component: GridListadoGestionPlazosComponent
      },

      {

        path: 'nueva-pagaduria',
        component: GridFormularioGestionPagaduriaComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]


  // imports: [MatDialogModule],
  
  // providers: [
  //   { provide: MAT_DIALOG_DATA, useValue: {} }
  // ]
})
export class GestionPagaduriaRoutingModule { }