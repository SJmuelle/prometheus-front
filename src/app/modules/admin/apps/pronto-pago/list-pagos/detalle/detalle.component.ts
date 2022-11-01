import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';
import { PorcentajeComponent } from './porcentaje/porcentaje.component';
import { MatDialog } from '@angular/material/dialog';
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
  planillas: any = [];
  factoring: any = [];
  allComplete: boolean = false;
  countPlanilla: number = 0;
  total: number = 0;

  constructor(public pago: ProntoPagoService, public dialog: MatDialog, public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {dialogRef.disableClose = true}

  ngOnInit(): void {
    this.consultarTransportadoras()
    console.log(this.data)
    if (this.data.email=='') {
      this.data.email = 'N/A'
    }
  }

  consultarTransportadoras() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información de planillas', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.pago.getTransportadoras(this.data.idPropietario, this.data.idTransportadora).subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listado = response.data;
        console.log(this.listado)
      } else {
        this.listado = [];
      }
    });
  }

  cambiarPorcentaje(){
    const dialogRef = this.dialog.open(PorcentajeComponent, {
      width: '20%',
      data: {
        minimo: this.data.minimo,
        maximo: this.data.maximo,
        planilla: this.factoring
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.consultarTransportadoras();
      this.details = [];
      this.factoring = [];
      this.allComplete = false;
      this.countPlanilla = 0;
      this.total = 0;
    });
  }

  agregarPlanilla(item, event) {
    let id = {
      "idProntoPago": item.idProntoPago
    }
    let planilla = {
      "planilla":item.planilla
    }
    if (event.checked == false) {
      const dataBuscar = this.details.filter(id => id.idProntoPago == item.idProntoPago);
      const buscarPlanilla = this.planillas.filter(pla => pla.planilla == item.planilla);
      let idx = this.details.indexOf(dataBuscar[0]);
      let idxPla = this.planillas.indexOf(buscarPlanilla[0])
      this.details.splice(idx, 1);
      this.factoring.splice(idx, 1);
      this.planillas.splice(idxPla, 1);
      item.check = false;
      this.countPlanilla = this.countPlanilla - 1;
      this.total = this.total - item.valorPlanilla;
    } else {
      this.details.push(id);
      this.factoring.push(id);
      this.planillas.push(planilla)
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
      this.total = this.data.saldoTotalPlanilla;
      for (const item of this.listado) {
        this.details.push(
          {
            "idProntoPago": item.idProntoPago
          }
        )
        this.factoring.push({
          "idProntoPago": item.idProntoPago
        })
      }
    }else{
      this.details = [];
      this.factoring = [];
      this.planillas = [];
      this.countPlanilla = 0;
      this.total = 0;
    }
    this.listado.forEach(t => (t.check = completed));
  }

  comentar(op) {
    Swal.fire({
      title: 'Ingrese comentario',
      input: 'textarea',
      inputAttributes: {
          autocapitalize: 'off',
      },
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }).then((result)=>{
      console.log(result)
      if (result.isConfirmed) {
        if (result.value.length<1) {
          Swal.fire(
            'Aviso',
            'El comentario es obligatorio',
            'error'
          );
        }

        if (result.value.length<10) {
          Swal.fire(
            'Aviso',
            'El comentario tener al menos 10 caracteres',
            'error'
          );
        }

        if (result.value.length>10) {
          let trazabilidad = {
            "idPropietario": this.data.idPropietario,
            "idTransportadora": this.data.idTransportadora,
            "details": this.planillas,
            "valorTotalNegociacion": this.total,
            "actividad": op,
            "comentario": result.value.toString()
          }
          Swal.fire({
            title: 'Cargando',
            html: 'Enviado comentario',
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 500000,
            didOpen: () => {
              Swal.showLoading();
              this.pago.postTrazabilidad(trazabilidad).subscribe((response:any)=>{
                Swal.close();
                if (response) {
                  Swal.fire(
                    '¡Correcto!',
                    'Comentario guardado.',
                    'success'
                  )
  
                  if (trazabilidad.actividad=='A') {
                    this.aceptar()
                  }else{
                    this.rechazar()
                  }
                  
                }else{
                  Swal.fire(
                    '¡Error!',
                    'No se pudo guardar el comentario, intente mas tarde.',
                    'error'
                  )
                }
              })
            }
          })
        }
      }else{
        this.setAll(false);
        this.consultarTransportadoras();
      }
    })
  }

  aceptar(){
    let data = {
      "details": this.details
    }
    Swal.fire({
      title: 'Cargando',
      html: 'Enviando planillas',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
        this.pago.postAceptar(data).subscribe((response: any) => {
          Swal.close();
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
    })
  }

  rechazar() {
    let data = {
      "details": this.details
    }
    Swal.fire({
      title: 'Cargando',
      html: 'Enviando planillas',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
        this.pago.postRechazar(data).subscribe((response: any) => {
          Swal.close();
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
      }})
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
        this.comentar('A');
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
        this.comentar('R');
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
