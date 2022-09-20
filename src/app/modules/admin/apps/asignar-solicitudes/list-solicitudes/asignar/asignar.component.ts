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
    this.data.asesor_nuevo=this.asignarForm.value.analista;
    this.asigService.postAsesores(this.data).subscribe((res: any) => {
      if (res) {
        if (this.data.numero_solicitud.length > 1) {
          Swal.fire(
            '¡Correcto!',
            'Las solicitudes han sido asignadas al usuario '+this.data.asesor_nuevo+' de forma exitosa.',
            'success'
          )
        } else {
            Swal.fire(
              '¡Correcto!',
              'La solicitud N° '+this.data.numero_solicitud[0]+' ha sido asignado al usuario '+this.data.asesor_nuevo+' de forma exitosa.',
              'success'
            )
        }
        this.dialogRef.close();
      } else {
        if (this.data.numero_solicitud.length > 1) {
          Swal.fire(
            'Error!',
            'Las solicitudes no han podido ser asignadas, porfavor intente mas tarde.',
            'error'
          )
        } else {
          Swal.fire(
            'Error!',
            'La solicitud N° '+this.data.numero_solicitud[0]+' no pudo ser asignada, porfavor intente mas tarde.',
            'error'
          )
        }
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
