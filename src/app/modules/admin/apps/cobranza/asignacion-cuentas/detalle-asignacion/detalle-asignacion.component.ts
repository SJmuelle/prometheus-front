import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { AsignacionCuentasComponent } from '../asignacion-cuentas.component';

@Component({
  selector: 'app-detalle-asignacion',
  templateUrl: './detalle-asignacion.component.html',
  styleUrls: ['./detalle-asignacion.component.scss']
})
export class DetalleAsignacionComponent implements OnInit {

  constructor(
    private _asignacionCuentasComponent:AsignacionCuentasComponent
  ) { }

  ngOnInit(): void {
    this._asignacionCuentasComponent.matDrawer.open();
  }

  
    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._asignacionCuentasComponent.matDrawer.close();
    }

}
