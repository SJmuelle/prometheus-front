import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionComponent } from './observacion/observacion.component';

@Component({
  selector: 'app-list-solicitud',
  templateUrl: './list-solicitud.component.html',
  styleUrls: ['./list-solicitud.component.scss']
})
export class ListSolicitudComponent implements OnInit {

  filtrarTabla:string = '';
  listado: any[] = [
    {
      "id":"258963",
      "empresa":"FINTRA",
      "monto":10000000,
      "destino":"GEOTECH",
      "cuenta":"43258967123",
      "tipo_cuenta":"Ahorros",
      "banco":"Bancolombia",
      "fecha":"2022-11-28",
      "correo":"tavosalas270@gmail.com",
      "aprobar":"S"
    },
    {
      "id":"258963",
      "empresa":"FINTRA",
      "monto":15000000,
      "destino":"FINTRA",
      "cuenta":"41278963251",
      "tipo_cuenta":"Ahorros",
      "banco":"Commeva",
      "fecha":"2022-10-28",
      "correo":"egonzales@fintra.co",
      "aprobar":"N"
    }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.listado)
  }

  abrirObservacion(){
    const dialogRef = this.dialog.open(ObservacionComponent, {
      width: '60%',
      maxHeight: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
