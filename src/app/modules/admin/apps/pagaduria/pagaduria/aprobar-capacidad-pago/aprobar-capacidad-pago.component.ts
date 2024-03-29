import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagaduriaService } from 'app/core/services/pagaduria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobar-capacidad-pago',
  templateUrl: './aprobar-capacidad-pago.component.html',
  styleUrls: ['./aprobar-capacidad-pago.component.scss']
})
export class AprobarCapacidadPagoComponent implements OnInit {

  AprobarForm: FormGroup;//formulario para hacer las validaciones requeridas
  contador = 0; //contar los caracteres restantes en el textarea
  id: any = this.data.id; // almacenar el codigo de solicitud
  tipo: any = this.data.tipo; // almacenar el tipo de la solicitud
  estado:any = 'A'; // almacenar estado de aprobado
  valor:any = ''; // almacenar el valor de deduccion que sera 0
  proceso:any = ''; // almacenar el valor del proceso disciplinario que sera NO
  actualizacion:any = {}; // almacenar toda la data que sera enviada a la api

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.AprobarForm.controls;
  }

  constructor(private fb: FormBuilder, private pagaduria: PagaduriaService, private dialog: MatDialogRef<AprobarCapacidadPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.AprobarForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(500)]]
    })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize; //controlar el tamaño del textarea a medida que se escribe.

  ngOnInit(): void {
  }

  /**
   * @description: realiza el proceso de actualizar enviando los datos requeridos
   */
   actualizarSolicitud(codigoNegocio, tipo, estado, valorDeduccionEmpleado, procesoDiciplinario){
    codigoNegocio = this.id
    tipo = this.tipo
    estado = this.estado
    valorDeduccionEmpleado = 0
    procesoDiciplinario = 'NO'
    const { detalle } = this.AprobarForm.getRawValue();
    this.actualizacion={codigoNegocio, estado, valorDeduccionEmpleado, procesoDiciplinario, detalle, tipo}
    this.pagaduria.UpdateSolicitud(this.actualizacion).subscribe((response: any)=>{
      if (response) {
        Swal.fire(
          '¡Correcto!',
          'Se ha aprobado exitosamente la solicitud.',
          'success'
        ).then((result)=>{
          if(result){
            this.dialog.close();
          }
        })
        setTimeout(() => {
          this.dialog.close();
        }, 10000);
      }
    })
  }

  /**
   * @description: contar los caracteres restantes.
   */
  contarCaracteres(event){
    this.contador = event.target.value.length
   }

}
