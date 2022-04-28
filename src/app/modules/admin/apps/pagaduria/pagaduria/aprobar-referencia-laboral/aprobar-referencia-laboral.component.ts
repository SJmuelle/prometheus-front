import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagaduriaService } from 'app/core/services/pagaduria.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toNumber } from 'lodash';

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
  monto:number = this.data.monto // almacenar el monto para validacion
  valorNum:number; // almacenar el valor digitado en el input de valor
  estado:any = 'A'; // almacenar estado de aprobado
  numPattern: any = /^(0|[1-9][0-9]*)$/
  actualizacion:any = {}; // almacenar toda la data que sera enviada a la api

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.AprobarForm.controls;
  }

  constructor(private fb: FormBuilder, public pagaduria: PagaduriaService, private dialog: MatDialogRef<AprobarReferenciaLaboralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.AprobarForm = this.fb.group({
      valor: ['', [Validators.required, Validators.pattern(this.numPattern), Validators.min(1), Validators.max(this.monto)]],
      procesoDiciplinario: ['', [Validators.required]],
      detalle: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  ngOnInit(): void {
  }

  /**
   * @description: convertir a numero el texto que se va digitando
   */
  convText(valorDeduccionEmpleado){
    const {valor} = this.AprobarForm.getRawValue();
    valorDeduccionEmpleado = Number(this.pagaduria.enviarNumero(valor))
    this.valorNum = valorDeduccionEmpleado
    if (this.valorNum>this.monto) {
      this.frm.valor.setErrors({max: true});
    }
  }

  /**
   * @description: realiza el proceso de actualizar enviando los datos requeridos
   */
  actualizarSolicitud(codigoNegocio, tipo, estado, valorDeduccionEmpleado){
    codigoNegocio = this.id
    tipo = this.tipo
    estado = this.estado
    const {valor} = this.AprobarForm.getRawValue();
    const {procesoDiciplinario} = this.AprobarForm.getRawValue();
    const {detalle} = this.AprobarForm.getRawValue();
    valorDeduccionEmpleado = Number(this.pagaduria.enviarNumero(valor));
    this.actualizacion={codigoNegocio, estado, valorDeduccionEmpleado, procesoDiciplinario, detalle, tipo}
    this.pagaduria.UpdateSolicitud(this.actualizacion).subscribe((response: any)=>{})
    Swal.fire(
      '¡Correcto!',
      `La solicitud ha sido aprobada.`,
      'success'
    )
    // console.log(this.actualizacion)
  }

  /**
   * @description: contar los caracteres restantes.
   */
  contarCaracteres(event){
    this.contador = event.target.value.length
   }


}
