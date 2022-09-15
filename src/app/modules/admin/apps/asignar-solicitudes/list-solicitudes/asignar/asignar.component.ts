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

  constructor(public asigService: AsignarSolicitudesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AsignarComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.asignarForm = this.fb.group({
        analista: ['', [Validators.required]]
      });
    }

  ngOnInit() {
    this.consultarAsesores();
  }

  guardarAnalista(){
    this.data.asesor_nuevo=this.asignarForm.value.analista;
    this.asigService.postAsesores(this.data).subscribe((res: any) => {
      if (res) {
        Swal.fire(
          '¡Correcto!',
          'La solicitud N° '+this.data.numero_solicitud+' ha sido asignado al usuario '+this.data.asesor_nuevo+' de forma exitosa.',
          'success'
        )
        this.dialogRef.close();
      } else {
        Swal.fire(
          'Error!',
          'La solicitud N° '+this.data.numero_solicitud+' no pudo ser asignada, porfavor intente mas tarde.',
          'error'
        )
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
