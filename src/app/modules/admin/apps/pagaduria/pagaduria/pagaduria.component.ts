import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ObligacionesComponent } from './obligaciones/obligaciones.component';
import { AprobarReferenciaLaboralComponent } from './aprobar-referencia-laboral/aprobar-referencia-laboral.component';
import { AprobarCapacidadPagoComponent } from './aprobar-capacidad-pago/aprobar-capacidad-pago.component';
import { RechazarReferenciaLaboralComponent } from './rechazar-referencia-laboral/rechazar-referencia-laboral.component';
import { RechazarCapacidadPagoComponent } from './rechazar-capacidad-pago/rechazar-capacidad-pago.component';
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

  datos:any =[];
  solicitudes:any =[];

  posicion:any = 'above';

  constructor(public dialog: MatDialog, public paga: PagaduriaService) { }

  ngOnInit(): void {
    
    this.datos = [
      {
        identificacion: 1,
        nombres: "Tavo",
        apellidos: "Salas",
        solicitud: 10,
        fecha: "27/03/2022",
        monto: 2500000,
        plazo: 24,
        valor: 100000,
        destino: "Libre inversion"
      },
      {
        identificacion: 1,
        nombres: "Tavo",
        apellidos: "Salas",
        solicitud: 10,
        fecha: "27/03/2022",
        monto: 2500000,
        plazo: 24,
        valor: 100000,
        destino: "Compra de cartera"
      }
    ]

    this.consultaSolicitudes();

  }

  consultaSolicitudes(){
    this.paga.getSolicitudes().subscribe((response: any) => {
      // console.log(response)
      if (response) {
        this.solicitudes = response.data;
        console.log(this.solicitudes)
      }
    });
  }

  AbrirObligaciones(){
    const dialogRef = this.dialog.open(ObligacionesComponent);

    dialogRef.afterClosed().subscribe(result =>{
      // console.log(`Dialog result: ${result}`);
    });

  }

  AprobarReferenciaLaboral(){
    const dialogRef = this.dialog.open(AprobarReferenciaLaboralComponent, {

      width: '60%'

    });

    dialogRef.afterClosed().toPromise();

  }

  RechazarReferenciaLaboral(){
    const dialogRef = this.dialog.open(RechazarReferenciaLaboralComponent, {

      width: '60%'

    });

    dialogRef.afterClosed().toPromise();

  }

  cpendiente(){
    if (this.pendiente==true) {
      this.pendiente=false
    } else {
      this.pendiente=true
      this.aprobada=false
      this.rechazada=false
    }
  }

  caprobada(){
    if (this.aprobada==true) {
      this.aprobada=false
    } else {
      this.aprobada=true
      this.pendiente=false
      this.rechazada=false
    }
  }

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
