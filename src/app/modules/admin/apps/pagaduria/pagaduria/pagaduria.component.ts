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
import { result } from 'lodash';
import Swal from 'sweetalert2';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-pagaduria',
  templateUrl: './pagaduria.component.html',
  styleUrls: ['./pagaduria.component.scss']
})
export class PagaduriaComponent implements OnInit {

  solicitudes:any =[]; //para almacenar las solicitudes consultadas
  posicion:string = 'above'; //posicion del texto para el tooltip
  tipo:string; // cargar el tipo de solicitudes
  estado:string = 'P'; // cargar por defecto las solicitudes de pagaduria en estado pendiente
  mostrar:boolean = false; // mostrar la tabla y botones una vez se selecciones un tipo.
  filtrarTabla:string=''; // filtrar la tabla
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
      tipo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // this.consultaSolicitudes();
  }

  descargarArchivo(id:any){
    this.pagaduria.descargarArchivos(id).subscribe((response:any)=>{
      if(response) {
        const archivo = response.data[0].filepath.split(',');
        const extension = 'pdf'
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = `data:application/${extension};base64,${archivo}`;
        link.target = '_self';
        link.download = response.data[0].filename
        link.click();
        Swal.close();
      }
    }) 
  }


  /**
   * @description: metodo para filtrar por tipo las solicitudes
   */
   buscarPorTipo(tipo){
    // const {tipo} = this.solicitudForm.getRawValue();
    this.tipo = tipo;
    this.mostrar = true;
    this.consultaSolicitudes();
  }

  /**
   * @description: metodo para cargar todas las solicitudes
   */
   consultaSolicitudes(){
    Swal.fire({ title: 'Cargando', html: 'Buscando solicitudes', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.pagaduria.getSolicitudesFilter(this.tipo, this.estado).subscribe((response: any) => {
      Swal.close();
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
    this.consultaSolicitudes();
  }

  /**
   * @description: metodo para que la variable estado tome un valor de A.
   */
   aprobada(estado){
    this.estado = estado;
    this.consultaSolicitudes();
  }

  /**
   * @description: metodo para que la variable estado tome un valor de R.
   */
   rechazada(estado){
    this.estado = estado;
    this.consultaSolicitudes();
  }

  /**
   * @description: metodo para abrir el modal para reactivar solicitud
   */
   AbrirReactivar(id:any, tipo:any){
    const dialogRef = this.dialog.open(GestionSolicitudesComponent, {
      width: '60%',
      data: {id:id, tipo:tipo}
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.consultaSolicitudes();
    })
  }


  /**
   * @description: metodo para abrir el modal de OBLIGACIONES A RECOGER
   */
  AbrirObligaciones(numero:any){
    this.pagaduria.getObligaciones(numero).subscribe((response: any) => {
      const dialogRef = this.dialog.open(ObligacionesComponent, {
        width: '60%',
        data: {numero:numero}
      });
      dialogRef.afterClosed().toPromise();
    });    
  }

  /**
   * @description: metodo para abrir el modal para aprobar solicitud de tipo referencia laboral
   */
  AprobarReferenciaLaboral(id:any, tipo:string, monto:number){
    const dialogRef = this.dialog.open(AprobarReferenciaLaboralComponent, {
      width: '60%',
      data: {id:id, tipo:tipo, monto:monto}
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.consultaSolicitudes();
    })
  }

  /**
   * @description: metodo para abrir el modal para aprobar solicitud de tipo capacidad de pago
   */
   AprobarCapacidadPago(id:any, tipo:any){
    const dialogRef = this.dialog.open(AprobarCapacidadPagoComponent, {
      width: '60%',
      data: {id:id, tipo:tipo}
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.consultaSolicitudes();
    })
  }

  /**
   * @description: metodo para abrir el modal para rechazar solicitud de tipo referencia laboral
   */
  RechazarReferenciaLaboral(id:any, tipo:any){
    const dialogRef = this.dialog.open(RechazarReferenciaLaboralComponent, {
      width: '60%',
      data: {id:id, tipo:tipo}
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.consultaSolicitudes();
    })
  }

  /**
   * @description: metodo para abrir el modal para rechazar solicitud de tipo capacidad de pago
   */
   RechazarCapacidadPago(id:any, tipo:any){
    const dialogRef = this.dialog.open(RechazarCapacidadPagoComponent, {
      width: '60%',
      data: {id:id, tipo:tipo}
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.consultaSolicitudes();
    })
  }

}
