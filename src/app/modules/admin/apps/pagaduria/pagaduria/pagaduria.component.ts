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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagaduria',
  templateUrl: './pagaduria.component.html',
  styleUrls: ['./pagaduria.component.scss']
})
export class PagaduriaComponent implements OnInit {

  solicitudes:any =[]; //para almacenar las solicitudes consultadas
  posicion:any = 'above'; //posicion del texto para el tooltip
  tipo:any = 'RF'; // cargar por defecto las solicitudes de tipo referencia laboral
  estado:any = 'P'; // cargar por defecto las solicitudes en estado pendiente
  solicitudForm: FormGroup; //formulario para hacer las validaciones requeridas

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.solicitudForm.controls;
  }

  constructor(public dialog: MatDialog, 
              public pagaduria: PagaduriaService,
              private fb: FormBuilder, 
              iconRegistry: MatIconRegistry, 
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/Group-192.svg'));
    this.solicitudForm = this.fb.group({
      tipo: ['', [Validators.required]],
      estado:['']
    });
  }

  ngOnInit(): void {
    this.consultaSolicitudes();
  }

  /**
   * @description: metodo para cargar todas las solicitudes
   */
   consultaSolicitudes(){
    this.pagaduria.getSolicitudesFilter(this.tipo, this.estado).subscribe((response: any) => {
      console.log(response)
      if (response) {
        this.solicitudes = response.data;
        console.log(this.solicitudes)
      }
    });
  }

  /**
   * @description: metodo para que la variable estado tome un valor de P.
   */
  pendiente(estado){
    this.estado = estado;
    console.log('Aqui tu estado: ', this.estado)
    // this.pagaduria.getSolicitudesFilter(tipo, estado).subscribe((response: any) => {
    //   console.log(response)
    //   if (response) {
    //     this.solicitudes = response.data;
    //     console.log(this.solicitudes)
    //   }
    // });
  }

  /**
   * @description: metodo para que la variable estado tome un valor de A.
   */
   aprobada(estado){
    this.estado = estado;
    console.log('Aqui tu estado: ', this.estado)
    // this.pagaduria.getSolicitudesFilter(tipo, estado).subscribe((response: any) => {
    //   console.log(response)
    //   if (response) {
    //     this.solicitudes = response.data;
    //     console.log(this.solicitudes)
    //   }
    // });
  }

  /**
   * @description: metodo para que la variable estado tome un valor de R.
   */
   rechazada(estado){
    this.estado = estado;
    console.log('Aqui tu estado: ', this.estado)
    // this.pagaduria.getSolicitudesFilter(tipo, estado).subscribe((response: any) => {
    //   console.log(response)
    //   if (response) {
    //     this.solicitudes = response.data;
    //     console.log(this.solicitudes)
    //   }
    // });
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
   * @description: metodo para abrir el modal de OBLIGACIONES A RECOGER
   */
  AbrirObligaciones(){
    const dialogRef = this.dialog.open(ObligacionesComponent);
    dialogRef.afterClosed().subscribe(result =>{});
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
  cpendiente(){}

  /**
   * @description: metodo para abrir la tabla de solicitudes aprobadas.
   */
  caprobada(){}

  /**
   * @description: metodo para abrir la tabla de solicitudes rechazadas.
   */
  crechazada(){}

}
