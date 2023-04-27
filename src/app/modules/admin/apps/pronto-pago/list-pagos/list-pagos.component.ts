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
  idTransportadora:string='';
  porcentajeMinimo:string='';
  porcentajeMaximo:string='';

  constructor(public pago: ProntoPagoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consultarTransportadoras();
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

  consultarPropietarios(id, minimo, maximo){
    Swal.fire({ title: 'Cargando', html: 'Buscando información de propietarios', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.pago.getPropietario(id).subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listadoPropietarios = response.data;
        this.idTransportadora = id;
        this.porcentajeMinimo = minimo;
        this.porcentajeMaximo = maximo;
      } else {
        this.listadoPropietarios = [];
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
      maxHeight: '95vh',
      data: {
        idPropietario: item.idPropietario,
        identificacion: item.identificacion,
        nombrePropietario: item.nombrePropietario, 
        contacto: item.contacto,
        email: item.email,
        idTransportadora: this.idTransportadora, 
        totalPlanilla: item.totalPlanilla,
        saldoTotalPlanilla: item.saldoTotalPlanilla,
        minimo: this.porcentajeMinimo,
        maximo: this.porcentajeMaximo
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.consultarPropietarios(this.idTransportadora, this.porcentajeMinimo, this.porcentajeMaximo);
    });
  }

}
