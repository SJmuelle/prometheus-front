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
  listadoTrue: any = [];
  listadoFalse: any = [];
  details: any = [];
  allComplete: boolean = false;
  countPlanilla: number = 0;
  total: number = 0;

  constructor(public pago: ProntoPagoService, public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.consultarTransportadoras()
    console.log(this.data)
  }

  consultarTransportadoras() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información de planillas', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.pago.getTransportadoras(this.data.idPropietario).subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listado = response.data;
      } else {
        this.listado = [];
      }
    });
  }

  agregarPlanilla(item, event) {
    let id = {
      "idProntoPago": item.idProntoPago
    }
    if (event.checked == false) {
      const dataBuscar = this.details.filter(id => id.idProntoPago == item.idProntoPago);
      let idxSoli = this.details.indexOf(dataBuscar[0]);
      this.details.splice(idxSoli, 1);
      item.check = false;
      this.countPlanilla = this.countPlanilla - 1;
      this.total =  this.total - item.valorPlanilla;
    } else {
      this.details.push(id);
      item.check = true;
      this.countPlanilla = this.countPlanilla + 1;
      this.total =  this.total + item.valorPlanilla;
    }

    if (this.details.length >= this.listado.length) {
      this.allComplete = true;
    } else {
      this.allComplete = false;
    }
  }

  updateAllComplete() {
    this.allComplete = this.listado != null && this.listado.every(t => (t.check));
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listado == null) {
      return;
    }
    if (this.allComplete == true) {
      this.details = [];
      this.countPlanilla = this.listado.length;
      for (const item of this.listado) {
        this.details.push(
          {
            "idProntoPago": item.idProntoPago
          }
        )
      }
    }else{
      this.details = [];
      this.countPlanilla = 0;
    }
    this.listado.forEach(t => (t.check = completed));
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
    let data = {
      "details": this.details
    }
    this.pago.postRechazar(data).subscribe((response: any) => {
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
        this.setAll(false);
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
        this.setAll(false);
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
