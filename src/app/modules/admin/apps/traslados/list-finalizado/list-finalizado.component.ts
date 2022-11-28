import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionComponent } from '../observacion/observacion.component';

@Component({
  selector: 'app-list-finalizado',
  templateUrl: './list-finalizado.component.html',
  styleUrls: ['./list-finalizado.component.scss']
})
export class ListFinalizadoComponent implements OnInit {

  filtrarTabla:string = '';
  listado: any[] = [
    {
      "id":"258963",
      "origen":"FINTRA",
      "monto":10000000,
      "destino":"GEOTECH",
      "cuenta":"43258967123",
      "tipo_cuenta":"Ahorros",
      "banco":"Bancolombia",
      "fecha":"2022-11-28",
      "correo":"tavosalas270@gmail.com",
      "recobro":40000
    },
    {
      "id":"258963",
      "origen":"FINTRA",
      "monto":15000000,
      "destino":"FINTRA",
      "cuenta":"41278963251",
      "tipo_cuenta":"Ahorros",
      "banco":"Commeva",
      "fecha":"2022-10-28",
      "correo":"egonzales@fintra.co",
      "recobro":60000
    }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirObservacion(){
    const dialogRef = this.dialog.open(ObservacionComponent, {
      width: '60%',
      maxHeight: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
