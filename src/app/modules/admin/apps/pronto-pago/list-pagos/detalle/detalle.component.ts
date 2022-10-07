import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  listado: any = [];
  details: any = [];
  allComplete: boolean = false;

  constructor(public pago: ProntoPagoService, public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.consultarTransportadoras()
  }

  consultarTransportadoras() {
    this.pago.getTransportadoras(this.data.idPropietario).subscribe((response: any) => {
      if (response) {
        this.listado = response.data;
        this.listado.map(x =>  {
          return x['selected'] = false
        });
      } else {
        this.listado = [];
      }
    });
  }

  agregarPlanilla(item, event) {
    let id = {
      "idProntoPago": item
    }
    if (event.checked == false) {
      const dataBuscar = this.details.filter(id => id.idProntoPago == item);
      let idxSoli = this.details.indexOf(dataBuscar[0]);
      this.details.splice(idxSoli, 1);
    } else {
      this.details.push(id);
    }
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listado == null) {
      return;
    }
    this.listado.map(x =>  {
      return x.selected = completed
    });
    console.log(this.listado);
  }

  aceptar() {
    let data = {
      "details": this.details
    }
    this.pago.postAceptar(data).subscribe((response: any) => {
      if (response) {
        if (this.details.length > 1) {
          Swal.fire(
            '¡Correcto!',
            'Las planillas han sido aceptadas de forma exitosa.',
            'success'
          )
        } else {
          Swal.fire(
            '¡Correcto!',
            'La planilla ha sido aceptada de forma exitosa.',
            'success'
          )
        }
        this.dialogRef.close(true);
      } else {
        Swal.fire(
          'Error!',
          'El proceso no ha podido llevarse a cabo, por favor intente mas tarde.',
          'error'
        )
        this.dialogRef.close(true);
      }
    }, error => {
      Swal.fire(
        'Error!',
        'El proceso no ha podido llevarse a cabo, por favor intente mas tarde.',
        'error'
      )
      this.dialogRef.close(true);
    });
  }

  rechazar() {
    this.pago.postRechazar(this.details).subscribe((response: any) => {
      if (response) {
        if (this.details.length > 1) {
          Swal.fire(
            '¡Correcto!',
            'Las planillas han sido rechazadas de forma exitosa.',
            'success'
          )
        } else {
          Swal.fire(
            '¡Correcto!',
            'La planilla ha sido rechazada de forma exitosa.',
            'success'
          )
        }
        this.dialogRef.close(true);
      } else {
        Swal.fire(
          'Error!',
          'El proceso no ha podido llevarse a cabo, por favor intente mas tarde.',
          'error'
        )
        this.dialogRef.close(true);
      }
    }, error => {
      Swal.fire(
        'Error!',
        'El proceso no ha podido llevarse a cabo, por favor intente mas tarde.',
        'error'
      )
      this.dialogRef.close(true);
    });
  }

  confirmarAcepto() {
    Swal.fire({
      title: '¿Seguro de aceptar las planillas?',
      icon: 'question',
      html: 'Si presiona <b>No</b> debera seleccionar nuevamente las planillas para el proceso',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.aceptar();
      } else if (result.isDenied) {
        this.details = [];
        this.consultarTransportadoras();
      }
    })
  }

  confirmarRechazo() {
    Swal.fire({
      title: '¿Seguro de rechazar las planillas?',
      icon: 'question',
      html: 'Si presiona <b>No</b> debera seleccionar nuevamente las planillas para el proceso',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.rechazar();
      } else if (result.isDenied) {
        this.details = [];
        this.consultarTransportadoras();
      }
    })
  }


  cambiarFecha(date) {
    if (date) {
      moment.locale('es');
      return moment(date).format('MMMM D YYYY')
    }
    return 'No registra';
  }



}
