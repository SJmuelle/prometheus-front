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
    this.consultarPropietarios();
  }

  consultarPropietarios(){
    this.pago.getPropietario().subscribe((response: any) => {
      if (response) {
        this.listado = response.data;
        console.log(this.listado)
      } else {
        this.listado = [];
      }
    });
  }

  abrirDetalle(id){
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '70%',
      data: {idPropietario: id}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
