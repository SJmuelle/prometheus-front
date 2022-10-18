import { Component, OnInit } from '@angular/core';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleComponent } from './detalle/detalle.component';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-pagos',
  templateUrl: './list-pagos.component.html',
  styleUrls: ['./list-pagos.component.scss']
})
export class ListPagosComponent implements OnInit {

  listadoPropietarios: any = [];
  listadoTransportadoras: any = [];
  filtrarTabla:string='';

  constructor(public pago: ProntoPagoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consultarPropietarios();
  }

  consultarPropietarios(){
    Swal.fire({ title: 'Cargando', html: 'Buscando información de propietarios', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.pago.getPropietario().subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listadoPropietarios = response.data;
      } else {
        this.listadoPropietarios = [];
      }
    });
  }

  consultarTransportadoras(){
    this.pago.getTransportadorasPropietario().subscribe((response: any) => {
      if (response) {
        this.listadoTransportadoras = response.data;
      } else {
        this.listadoTransportadoras = [];
      }
    });
  }

  mascara(numero){
    var mask = "";
    if (numero) {
      for (let index = 1; index < numero.length - 3; index++) {
        mask +="*";
      }
      return mask + numero.slice(7, 10)
    }
  }

  abrirDetalle(item){
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '70%',
      data: {
        idPropietario: item.idPropietario, 
        totalPlanilla: item.totalPlanilla,
        saldoTotalPlanilla: item.saldoTotalPlanilla
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.consultarPropietarios();
      }
    });
  }

}
