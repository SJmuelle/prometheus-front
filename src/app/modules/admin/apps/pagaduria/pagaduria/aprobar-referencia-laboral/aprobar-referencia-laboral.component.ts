import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { PagaduriaService } from 'app/core/services/pagaduria.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aprobar-referencia-laboral',
  templateUrl: './aprobar-referencia-laboral.component.html',
  styleUrls: ['./aprobar-referencia-laboral.component.scss']
})
export class AprobarReferenciaLaboralComponent implements OnInit {

  AprobarForm: FormGroup;//formulario para hacer las validaciones requeridas
  contador = 0; //contar los caracteres restantes en el textarea
  id: any = this.data.id; // almacenar el codigo de solicitud
  tipo: any = this.data.tipo; // almacenar el tipo de la solicitud
  estado:any = 'A'; // almacenar estado de aprobado
  actualizacion:any = {}; // almacenar toda la data que sera enviada a la api

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.AprobarForm.controls;
  }

  constructor(private fb: FormBuilder, private pagaduria: PagaduriaService, private dialog: MatDialogRef<AprobarReferenciaLaboralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.AprobarForm = this.fb.group({
      valorDeduccionEmpleado: ['', [Validators.required, Validators.min(1)]],
      procesoDiciplinario: ['', [Validators.required]],
      detalle: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize; //controlar el tamaño del textarea a medida que se escribe.

  ngOnInit(): void {
    console.log(this.data)
  }

  /**
   * @description: realiza el proceso de actualizar enviando los datos requeridos
   */
  actualizarSolicitud(codigoNegocio, tipo, estado){
    codigoNegocio = this.id
    tipo = this.tipo
    estado = this.estado
    const { valorDeduccionEmpleado } = this.AprobarForm.getRawValue();
    const { procesoDiciplinario } = this.AprobarForm.getRawValue();
    const { detalle } = this.AprobarForm.getRawValue();
    this.actualizacion={codigoNegocio, estado, valorDeduccionEmpleado, procesoDiciplinario, detalle, tipo}
    this.pagaduria.UpdateSolicitud(this.actualizacion).subscribe((response: any)=>{
      // console.log("Aqui tus datos: ", response)
    })
    Swal.fire(
      '¡Correcto!',
      `La solicitud ha sido aprobada.`,
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
