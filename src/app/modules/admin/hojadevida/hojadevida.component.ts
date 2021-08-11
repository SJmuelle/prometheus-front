import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hojadevida',
  templateUrl: './hojadevida.component.html',
  styleUrls: ['./hojadevida.component.scss']
})
export class HojadevidaComponent implements OnInit {

  formHv: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formHv = this.fb.group({
      search: ['', Validators.required],
      cedula: ['', Validators.required],
      cod_negocio: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      segundo_apellido: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
      segmento: ['', Validators.required],
      negocicacion: ['', Validators.required],
      fecha_negociacion: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

}
