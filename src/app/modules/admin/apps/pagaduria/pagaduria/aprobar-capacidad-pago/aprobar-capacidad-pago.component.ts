import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-aprobar-capacidad-pago',
  templateUrl: './aprobar-capacidad-pago.component.html',
  styleUrls: ['./aprobar-capacidad-pago.component.scss']
})
export class AprobarCapacidadPagoComponent implements OnInit {

  AprobarForm: FormGroup;//formulario para hacer las validaciones requeridas
  contador = 0; //contar los caracteres restantes en el textarea

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.AprobarForm.controls;
  }

  constructor(private fb: FormBuilder) {
    this.AprobarForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize; //controlar el tamaño del textarea a medida que se escribe.

  ngOnInit(): void {
  }

  /**
   * @description: contar los caracteres restantes.
   */
  contarCaracteres(event){
    this.contador = event.target.value.length
   }

}
