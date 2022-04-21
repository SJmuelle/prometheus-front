import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-solicitudes',
  templateUrl: './gestion-solicitudes.component.html',
  styleUrls: ['./gestion-solicitudes.component.scss']
})
export class GestionSolicitudesComponent implements OnInit {

  ReactivarForm: FormGroup;

  public contador = 0;

  get frm() {
    return this.ReactivarForm.controls;
  }

  constructor(private fb: FormBuilder) {
    this.ReactivarForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
  }

  contarCaracteres(event){
    this.contador = event.target.value.length
   }

}
