import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rechazar-referencia-laboral',
  templateUrl: './rechazar-referencia-laboral.component.html',
  styleUrls: ['./rechazar-referencia-laboral.component.scss']
})
export class RechazarReferenciaLaboralComponent implements OnInit {

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
