import { Component, Inject, OnInit } from '@angular/core';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-varios',
  templateUrl: './asignar-varios.component.html',
  styleUrls: ['./asignar-varios.component.scss']
})
export class AsignarVariosComponent implements OnInit {

  asignarForm: FormGroup;
  asesores: any[] = [];
  solicitudes: any[] = [];
  dataEnviar: any[] = [];

  constructor(public asigService: AsignarSolicitudesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AsignarVariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.asignarForm = this.fb.group({
        analista: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.consultarAsesores();
    this.solicitudes = this.data.details
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

}
