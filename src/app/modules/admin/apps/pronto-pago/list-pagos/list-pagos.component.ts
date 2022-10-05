import { Component, OnInit } from '@angular/core';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DetalleComponent } from './detalle/detalle.component';
import moment from 'moment';

@Component({
  selector: 'app-list-pagos',
  templateUrl: './list-pagos.component.html',
  styleUrls: ['./list-pagos.component.scss']
})
export class ListPagosComponent implements OnInit {

  listado: any = [];

  constructor(public pago: ProntoPagoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consultarTransportadoras();
  }

  consultarTransportadoras(){
    this.pago.getTransportadoras().subscribe((response: any) => {
      if (response) {
        this.listado = response;
        console.log(this.listado)
      } else {
        this.listado = [];
      }
    });
  }

  abrirDetalle(){
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
