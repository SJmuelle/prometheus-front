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
      primer_nombre: [{ value: 'Cesar', disabled: true }, Validators.required],
      segundo_nombre: [{ value: 'Augusto', disabled: true }, Validators.required],
      primer_apellido: [{ value: 'Ariza', disabled: true }, Validators.required],
      segundo_apellido: [{ value: 'Lafaurie', disabled: true }, Validators.required],
      departamento: [{ value: 'ATL', disabled: true }, Validators.required],
      ciudad: [{ value: 'BQ', disabled: true }, Validators.required],
      barrio: [{ value: 'Robles', disabled: true }, Validators.required],
      direccion: [{ value: 'Calle  64b # 15 - 26', disabled: true }, Validators.required],
      telefono: [{ value: 3182294783, disabled: true }, Validators.required],
      celular: [{ value: 3182294783, disabled: true }, Validators.required],
      email: [{ value: 'cesariza2014@gmail.com', disabled: true }, Validators.required],
      segmento: [{ value: '', disabled: true }, Validators.required],
      tipo_negociacion: [{ value: '', disabled: true }, Validators.required],
      fecha_negociacion: [{ value: '', disabled: true }, Validators.required]
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
