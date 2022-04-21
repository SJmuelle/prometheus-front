import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {MatDialog} from '@angular/material/dialog';
import { ObligacionesComponent } from './obligaciones/obligaciones.component';
import { AprobarReferenciaLaboralComponent } from './aprobar-referencia-laboral/aprobar-referencia-laboral.component';
import { AprobarCapacidadPagoComponent } from './aprobar-capacidad-pago/aprobar-capacidad-pago.component';
import { RechazarReferenciaLaboralComponent } from './rechazar-referencia-laboral/rechazar-referencia-laboral.component';
import { RechazarCapacidadPagoComponent } from './rechazar-capacidad-pago/rechazar-capacidad-pago.component';
import { GestionSolicitudesComponent } from './gestion-solicitudes/gestion-solicitudes.component';
import { PagaduriaService } from 'app/core/services/pagaduria.service';

@Component({
  selector: 'app-pagaduria',
  templateUrl: './pagaduria.component.html',
  styleUrls: ['./pagaduria.component.scss']
})
export class PagaduriaComponent implements OnInit {

  pendiente:boolean = false;
  aprobada:boolean = false;
  rechazada:boolean = false;

  solicitudes:any =[];

  posicion:any = 'above';

  constructor(public dialog: MatDialog, public paga: PagaduriaService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/Group-192.svg'));
  }

  ngOnInit(): void {

    this.consultaSolicitudes();

  }

  /**
   * @description: metodo para abrir el modal para reactivar solicitud
   */
   AbrirReactivar(){
    const dialogRef = this.dialog.open(GestionSolicitudesComponent, {

      width: '60%'

    });

    dialogRef.afterClosed().toPromise();

  }


  /**
   * @description: metodo para cargar todas las solicitudes
   */
  consultaSolicitudes(){
    this.paga.getSolicitudes().subscribe((response: any) => {
      // console.log(response)
      if (response) {
        this.solicitudes = response.data;
        console.log(this.solicitudes)
      }
    });
  }


  /**
   * @description: metodo para abrir el modal de OBLIGACIONES A RECOGER
   */
  AbrirObligaciones(){
    const dialogRef = this.dialog.open(ObligacionesComponent);

    dialogRef.afterClosed().subscribe(result =>{
      // console.log(`Dialog result: ${result}`);
    });

  }

  /**
   * @description: metodo para abrir el modal para aprobar solicitud de tipo referencia laboral
   */
  AprobarReferenciaLaboral(){
    const dialogRef = this.dialog.open(AprobarReferenciaLaboralComponent, {

      width: '60%'

    });

    dialogRef.afterClosed().toPromise();

  }

  /**
   * @description: metodo para abrir el modal para aprobar solicitud de tipo capacidad de pago
   */
   AprobarCapacidadPago(){
    const dialogRef = this.dialog.open(AprobarCapacidadPagoComponent, {

      width: '60%'

    });

    dialogRef.afterClosed().toPromise();

  }

  /**
   * @description: metodo para abrir el modal para rechazar solicitud de tipo referencia laboral
   */
  RechazarReferenciaLaboral(){
    const dialogRef = this.dialog.open(RechazarReferenciaLaboralComponent, {

      width: '60%'

    });

    dialogRef.afterClosed().toPromise();

  }

  /**
   * @description: metodo para abrir el modal para rechazar solicitud de tipo capacidad de pago
   */
   RechazarCapacidadPago(){
    const dialogRef = this.dialog.open(RechazarCapacidadPagoComponent, {

      width: '60%'

    });

    dialogRef.afterClosed().toPromise();

  }

  /**
   * @description: metodo para abrir la tabla de solicitudes pendientes.
   */
  cpendiente(){
    if (this.pendiente==true) {
      this.pendiente=false
    } else {
      this.pendiente=true
      this.aprobada=false
      this.rechazada=false
    }
  }

  /**
   * @description: metodo para abrir la tabla de solicitudes aprobadas.
   */
  caprobada(){
    if (this.aprobada==true) {
      this.aprobada=false
    } else {
      this.aprobada=true
      this.pendiente=false
      this.rechazada=false
    }
  }

  /**
   * @description: metodo para abrir la tabla de solicitudes rechazadas.
   */
  crechazada(){
    if (this.rechazada==true) {
      this.rechazada=false
    } else {
      this.rechazada=true
      this.pendiente=false
      this.aprobada=false
    }
  }

}
