import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HojadevidaService } from 'app/services/hojadevida/hojadevida.service';

@Component({
  selector: 'app-hojadevida',
  templateUrl: './hojadevida.component.html',
  styleUrls: ['./hojadevida.component.scss']
})
export class HojadevidaComponent implements OnInit {

  formHv: FormGroup;
  datosCliente: FormGroup;
  negocios: any[];

  constructor(
    private fb: FormBuilder,
    private _hojadevidaService: HojadevidaService
  ) {
    this.formHv = this.fb.group({
      search: ['', Validators.required]
    });
    this.datosCliente = this.fb.group({
      primer_nombre: [{ value: 'Cesar', disabled: true }, Validators.required],
      segundo_nombre: [{ value: 'Augusto', disabled: true }, Validators.required],
      primer_apellido: [{ value: 'Ariza', disabled: true }, Validators.required],
      segundo_apellido: [{ value: 'Lafaurie', disabled: true }, Validators.required],
      departamento: [{ value: 'ATLANTICO', disabled: true }, Validators.required],
      ciudad: [{ value: 'BARRANQUILLA', disabled: true }, Validators.required],
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

  buscarClientes(formS: any) {
    if (this.formHv.invalid) {
      return;
    }

    // Disable the form
    console.log(formS.cedula);
    this.formHv.disable();
    this._hojadevidaService.getNegocios(formS.cedula).subscribe((response: any) => {
      this.negocios = response.data;
      this.formHv.enable();
    });
  }

  ngOnInit(): void {
    this.formHv.get('search').valueChanges.subscribe((value) => {
      if (value === '1') {
        this.formHv.addControl('cedula', new FormControl('8565112', Validators.required));
        this.formHv.addControl('cod_negocio', new FormControl(''));
      } else {
        this.addControls(this.formHv, ['cod_negocio']);
        this.removeControl(this.formHv, ['cedula']);
      }
    });

  }

  buscarInfo(form: any) {
    console.log('ejecutó');
    this._hojadevidaService.getInfoCliente(form.cod_negocio).subscribe((response: any) => {
      console.log(response.data);
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
