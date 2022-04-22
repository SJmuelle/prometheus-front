import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-solicitudes',
  templateUrl: './gestion-solicitudes.component.html',
  styleUrls: ['./gestion-solicitudes.component.scss']
})
export class GestionSolicitudesComponent implements OnInit {

  ReactivarForm: FormGroup; //formulario para hacer las validaciones requeridas
  contador = 0; //contar los caracteres restantes en el textarea

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.ReactivarForm.controls;
  }

  constructor(private fb: FormBuilder) {
    this.ReactivarForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.maxLength(500)]]
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
