import { Component, OnInit } from '@angular/core';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';
import moment from 'moment';

@Component({
  selector: 'app-list-pagos',
  templateUrl: './list-pagos.component.html',
  styleUrls: ['./list-pagos.component.scss']
})
export class ListPagosComponent implements OnInit {

  listado: any = [];

  constructor(public pago: ProntoPagoService) { }

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

  cambiarFecha(date) {
    if (date) {
      moment.locale('es');
      return moment(date).format('MMMM D YYYY')
    }
    return 'No registra';
  }

}
