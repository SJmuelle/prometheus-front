import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rechazar-capacidad-pago',
  templateUrl: './rechazar-capacidad-pago.component.html',
  styleUrls: ['./rechazar-capacidad-pago.component.scss']
})
export class RechazarCapacidadPagoComponent implements OnInit {

  RechazarForm: FormGroup;

  public contador = 0;

  get frm() {
    return this.RechazarForm.controls;
  }

  constructor(private fb: FormBuilder) {
    this.RechazarForm = this.fb.group({
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
