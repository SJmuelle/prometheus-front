import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-aprobar-referencia-laboral',
  templateUrl: './aprobar-referencia-laboral.component.html',
  styleUrls: ['./aprobar-referencia-laboral.component.scss']
})
export class AprobarReferenciaLaboralComponent implements OnInit {

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
      confirmar: ['', [Validators.required, Validators.min(1)]],
      proceso: ['', [Validators.required]],
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
