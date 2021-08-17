import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hojadevida',
  templateUrl: './hojadevida.component.html',
  styleUrls: ['./hojadevida.component.scss']
})
export class HojadevidaComponent implements OnInit {

  formHv: FormGroup;
  datosCliente: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formHv = this.fb.group({
      search: ['', Validators.required]
    });
    this.datosCliente = this.fb.group({
      primer_nombre: ['Cesar', Validators.required],
      segundo_nombre: ['Augusto', Validators.required],
      primer_apellido: ['Ariza', Validators.required],
      segundo_apellido: ['Lafaurie', Validators.required],
      departamento: ['ATL', Validators.required],
      ciudad: ['BQ', Validators.required],
      barrio: ['Robles', Validators.required],
      direccion: ['Calle  64b # 15 - 26', Validators.required],
      telefono: [3182294783, Validators.required],
      celular: [3182294783, Validators.required],
      email: ['cesariza2014@gmail.com', Validators.required],
      segmento: ['', Validators.required],
      tipo_negociacion: ['', Validators.required],
      fecha_negociacion: ['', Validators.required]
    });
  }

  compareObjects(o1: any, o2: any) {
    if (o1 === o2) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.formHv.get('search').valueChanges.subscribe((value) => {
      if (value == 1) {
        this.addControls(this.formHv, ['cedula', 'cod_negocio']);
      } else {
        this.addControls(this.formHv, ['cod_negocio']);
        this.removeControl(this.formHv, ['cedula']);
      }
    });
  }

  /**
   * Metodo para eliminar controles al formulario
   *
   * @param form Formulario al cual se va eliminar el control
   * @param arrayName Lista de nombre de controles para eliminar al formulario
   */
  removeControl(form: FormGroup, arrayName: Array<string>) {
    arrayName.forEach(name => form.removeControl(name));
  }


  /**
   * Metodo para agregar controles al formulario
   *
   * @param form Formulario al cual se va agregar el control
   * @param arrayName Lista de nombre de controles para agregar al formulario
   */
  addControls(form, arrayName: Array<string>) {
    arrayName.forEach(name => form.addControl(name, new FormControl('', Validators.required)));
  }
  get f() { return this.formHv.controls; }
}
