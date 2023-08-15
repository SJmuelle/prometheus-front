import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { AsignacionCuentasComponent } from '../asignacion-cuentas.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CobranzaService } from 'app/core/services/cobranza.service';

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
    private _cobranzaService: CobranzaService,
    private route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    this._asignacionCuentasComponent.matDrawer.open();
    this._activatedRoute.params.subscribe((param) => {
      this.numeroSolicitud = param.numeroSolicitud;
      this._cobranzaService.cuentasAsignadas$.subscribe((res) => {
        this.listado = res;
        this.credito = this.listado.find(data => data.numero_solicitud == this.numeroSolicitud);
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