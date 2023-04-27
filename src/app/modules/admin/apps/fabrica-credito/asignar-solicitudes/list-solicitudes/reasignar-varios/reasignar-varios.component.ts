import { Component, Inject, OnInit } from '@angular/core';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reasignar-varios',
  templateUrl: './reasignar-varios.component.html',
  styleUrls: ['./reasignar-varios.component.scss']
})
export class ReasignarVariosComponent implements OnInit {

  reasignarForm: FormGroup;
  asesores: any[] = [];
  asesorActual: any[] = [];
  dataEnviar: any[] = [];

  constructor(public asigService: AsignarSolicitudesService, private fb: FormBuilder, public dialogRef: MatDialogRef<ReasignarVariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.reasignarForm = this.fb.group({
        analista: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.consultarAsesores();
    this.asesorActual = this.data.asesoresActuales
  }

  guardarAnalista(){
    this.data.enviar.asesorNuevo=this.reasignarForm.value.analista;
    this.asigService.updateAsesores(this.data.enviar).subscribe((res: any) => {
      if (res) {
        if (this.data.enviar.details.length > 1) {
          Swal.fire(
            '¡Correcto!',
            'Las solicitudes han sido asignadas al usuario '+this.data.enviar.asesorNuevo+' de forma exitosa.',
            'success'
          )
        } else {
            Swal.fire(
              '¡Correcto!',
              'La solicitud N° '+this.data.enviar.details[0].numeroSolicitud+' ha sido asignado al usuario '+this.data.enviar.asesorNuevo+' de forma exitosa.',
              'success'
            )
        }
        this.dialogRef.close(true);
      } else {
        if (this.data.enviar.details.length > 1) {
          Swal.fire(
            'Error!',
            'Las solicitudes no han podido ser asignadas, porfavor intente mas tarde.',
            'error'
          )
        } else {
          Swal.fire(
            'Error!',
            'La solicitud N° '+this.data.enviar.details[0].numeroSolicitud+' no pudo ser asignada, porfavor intente mas tarde.',
            'error'
          )
        }
      }
    })
  }

  cerrar(){
    Swal.fire({
      title: '¿Borrar las solicitudes seleccionadas?',
      icon: 'question',
      html:
        'Si presiona <b>Si</b> debera seleccionar nuevamente las solicitudes ',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(true);
      } else if (result.isDenied) {
        this.dialogRef.close(false);
      }
    })
  }

  consultarAsesores(){
    this.asigService.getAsesores().subscribe((res: any) => {
      if (res) {
        this.asesores = res.data;
      }else{
        this.asesores = [];
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
