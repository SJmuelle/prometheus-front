import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagaduriaService } from 'app/core/services/pagaduria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rechazar-capacidad-pago',
  templateUrl: './rechazar-capacidad-pago.component.html',
  styleUrls: ['./rechazar-capacidad-pago.component.scss']
})
export class RechazarCapacidadPagoComponent implements OnInit {

  RechazarForm: FormGroup; //formulario para hacer las validaciones requeridas
  contador = 0; //contar los caracteres restantes en el textarea
  id: any = this.data.id; // almacenar el codigo de solicitud
  tipo: any = this.data.tipo; // almacenar el tipo de la solicitud
  estado:any = 'R'; // almacenar estado de aprobado
  valor:any = ''; // almacenar el valor de deduccion que sera 0
  proceso:any = ''; // almacenar el valor del proceso disciplinario que sera NO
  actualizacion:any = {}; // almacenar toda la data que sera enviada a la api

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.RechazarForm.controls;
  }

  constructor(private fb: FormBuilder, private pagaduria: PagaduriaService, private dialog: MatDialogRef<RechazarCapacidadPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.RechazarForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.maxLength(500)]]
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
    const { detalle } = this.RechazarForm.getRawValue();
    this.actualizacion={codigoNegocio, estado, valorDeduccionEmpleado, procesoDiciplinario, detalle, tipo}
    this.pagaduria.UpdateSolicitud(this.actualizacion).subscribe((response: any)=>{
      // console.log("Aqui tus datos: ", response)
    })
    Swal.fire(
      '¡Correcto!',
      `La solicitud ha sido rechazada.`,
      'success'
    )
    // console.log("Aqui tus datos: ", this.actualizacion)
  }

  /**
   * @description: contar los caracteres restantes.
   */
  contarCaracteres(event){
    this.contador = event.target.value.length
   }

}
