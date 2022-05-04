import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.component.html',
  styleUrls: ['./agregar-comentario.component.scss']
})
export class AgregarComentarioComponent implements OnInit {

  form:FormGroup;

  public contador = 0;

  get frm() {
          return this.form.controls;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  contarCaracteres(event){
    this.contador = event.target.value.length
  }

}
