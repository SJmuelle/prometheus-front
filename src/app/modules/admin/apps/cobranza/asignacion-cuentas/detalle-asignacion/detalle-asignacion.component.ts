import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { AsignacionCuentasComponent } from '../asignacion-cuentas.component';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-detalle-asignacion',
  templateUrl: './detalle-asignacion.component.html',
  styleUrls: ['./detalle-asignacion.component.scss']
})
export class DetalleAsignacionComponent implements OnInit {
  listado: any[];
  numeroSolicitud: string ;
  credito:any={};
  constructor(
    private _asignacionCuentasComponent: AsignacionCuentasComponent,
    private _cajaVirtualService: CajaVirtualService,
    private route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    this._asignacionCuentasComponent.matDrawer.open();
    this._activatedRoute.params.subscribe((param) => {
      this.numeroSolicitud = param.numeroSolicitud;
      this._cajaVirtualService.cuentasAsignadas$.subscribe((res) => {
        this.listado = res;
        this.credito = this.listado.find(data => data.numeroSolicitud == this.numeroSolicitud);
      });
    });

  }


  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._asignacionCuentasComponent.matDrawer.close();
  }



}
