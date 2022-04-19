import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-aprobar-capacidad-pago',
  templateUrl: './aprobar-capacidad-pago.component.html',
  styleUrls: ['./aprobar-capacidad-pago.component.scss']
})
export class AprobarCapacidadPagoComponent implements OnInit {

  AprobarForm: FormGroup;

  public contador = 0;

  get frm() {
    return this.AprobarForm.controls;
  }

  constructor(private fb: FormBuilder) {
    this.AprobarForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
  }

  contarCaracteres(event){
    this.contador = event.target.value.length
   }

}
