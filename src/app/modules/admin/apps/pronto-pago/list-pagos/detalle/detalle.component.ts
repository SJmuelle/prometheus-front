import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';
import moment from 'moment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  listado: any = [];
  allComplete:boolean = false;

  constructor(public pago: ProntoPagoService, public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.consultarTransportadoras()
    console.log("Id propietario ",this.data.idPropietario)
  }

  consultarTransportadoras(){
    this.pago.getTransportadoras(this.data.idPropietario).subscribe((response: any) => {
      if (response) {
        this.listado = response.data;
        for (let index = 0; index < this.listado.length; index++) {
          const element = this.listado[index];
          this.listado[index].item.nuevoValor = "nuevo valor";
        }
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

  updateAllComplete() {
    this.allComplete = this.listado != null && this.listado.every(t => (t.chequeado));
  }

  someComplete(): boolean {
    if (this.listado== null) {
      return false;
    }
    return this.listado.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listado == null) {
      return;
    }
    this.listado.forEach(t => (t.chequeado = completed));
  }



}
