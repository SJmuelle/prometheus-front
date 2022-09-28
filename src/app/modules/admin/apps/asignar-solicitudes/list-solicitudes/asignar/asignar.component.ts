import { Component, Inject, OnInit } from '@angular/core';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {

  asignarForm: FormGroup;
  asesores: any[] = [];
  dataEnviar: any[] = [];

  constructor(public asigService: AsignarSolicitudesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AsignarComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.asignarForm = this.fb.group({
        analista: ['', [Validators.required]]
      });
    }

  ngOnInit() {
    this.consultarAsesores();
    console.log(this.data)
  }

  guardarAnalista(){
    this.data.asesorNuevo=this.asignarForm.value.analista;
    this.asigService.postAsesores(this.data).subscribe((res: any) => {
      if (res) {
        if (this.data.details.length > 1) {
          Swal.fire(
            '¡Correcto!',
            'Las solicitudes han sido asignadas al usuario '+this.data.asesorNuevo+' de forma exitosa.',
            'success'
          )
        } else {
            Swal.fire(
              '¡Correcto!',
              'La solicitud N° '+this.data.details[0].numeroSolicitud+' ha sido asignado al usuario '+this.data.asesorNuevo+' de forma exitosa.',
              'success'
            )
        }
        this.dialogRef.close(true);
      } else {
        if (this.data.details.length > 1) {
          Swal.fire(
            'Error!',
            'Las solicitudes no han podido ser asignadas, porfavor intente mas tarde.',
            'error'
          )
        } else {
          Swal.fire(
            'Error!',
            'La solicitud N° '+this.data.details[0].numeroSolicitud+' no pudo ser asignada, porfavor intente mas tarde.',
            'error'
          )
        }
      }
    })
  }

  cerrar(){
    if (this.data.details.length > 1) {
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
    } else {
      this.dialogRef.close(true);
    }
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

}
