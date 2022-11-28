import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalleDeudaComponent } from './detalle-deuda/detalle-deuda.component';

@Component({
  selector: 'app-debiendo',
  templateUrl: './debiendo.component.html',
  styleUrls: ['./debiendo.component.scss']
})
export class DebiendoComponent implements OnInit {

  listado: any[] = [
    {
      "empresa":"FINTRA",
      "monto":10000000,
    },
    {
      "empresa":"GEOTECH",
      "monto":11000000,
    },
    {
      "empresa":"SELECTRIK",
      "monto":12000000,
    },
    {
      "empresa":"FINTRA LOGISTICS",
      "monto":13000000,
    },
    {
      "empresa":"COBRANZA",
      "monto":14000000,
    }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirDetalle(){
    const dialogRef = this.dialog.open(DetalleDeudaComponent, {
      width: '30%',
      maxHeight: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
