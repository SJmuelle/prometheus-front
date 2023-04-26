import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { FormularioGestionPagaduriaComponent } from '../formulario-gestion-pagaduria.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';

@Component({
  selector: 'app-grid-formulario-gestion-pagaduria',
  templateUrl: './grid-formulario-gestion-pagaduria.component.html',
  styleUrls: ['./grid-formulario-gestion-pagaduria.component.scss']
})
export class GridFormularioGestionPagaduriaComponent implements OnInit {

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 8;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  dato: any = {};
  router: any;
  form: FormGroup;

  seleccion = [{ value: true, viewValue: 'SI' }, { value: false, viewValue: 'NO' }];
  tipoEmpresa = [{ value: 'GRUPO', viewValue: 'Grupo' }, { value: 'TEMPORAL', viewValue: 'Temporal' }, { value: 'OTRAS EMPRESAS', viewValue: 'Otras Empresas' }];
  data: any;
  datos: any = {};
  listadoDepartamento: any;
  listadoCiudades: any[];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _GestionPagaduriaService: GestionPagaduriaService,
    private _Service: UtilityService

  ) { }


  ngOnInit(): void {
    this.consultarDepartamento();

    this.form = this.fb.group({
      razonSocial: [''],
      documento: [''],
      dv: [''],
      municipio: [''],
      departamento: ['', Validators.required], // Agregar validación de campo requerido
      direccion: ['', Validators.required],
      correo: [''],
      telefono: [''],
      tipoEmpresa: [''],
      empresaAliada: [''],
      convenioEspecialTemporal: [''],
      contratoFijo: [''],
      porcentajeIngresosBrutos: [0, Validators.required],
      requiereCartaLaboral: [''],
      liqSinPagaduria: ['']
    });

    this.consultaMunicipio();
  }


  consultarDepartamento() {

    this._Service
      .getQuery(`tk/listar-departamentos`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoDepartamento = response.data;
          console.log(this.listadoDepartamento)
        } else {
          this.listadoDepartamento = [];
        }
      });
  }
  consultaMunicipio() {
    console.log(this.form.controls.departamento.value);

    if (!this.form.controls.departamento.value) {
      return;
    }

    this._Service
      .getQuery(`listar-ciudades/${this.form.controls.departamento.value}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoCiudades = response.data;
        } else {
          this.listadoCiudades = [];
        }
      });
  }

  listarBarrios(data) {
    Swal.fire({
      title: 'Cargando',
      html: 'Buscando información...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._Service
      .getQuery(`listar-barrios/${data}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listado = response.data;
        } else {
          this.listado = [];
        }
      });
  }

  crearPagaduria() {
    console.log("mostrar", this.form.getRawValue());

    let data, url;

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando nueva pagadurias',
      timer: 500000,
      didOpen: () => {
        // Swal.showLoading();
      },
    }).then((result) => { });
    data={
      razonSocial: this.form.getRawValue().razonSocial,
      documento: this.form.getRawValue().documento,
      dv: this.form.getRawValue().dv,
      municipio: this.form.getRawValue().municipio,
      direccion: this.form.getRawValue().direccion,
      correo: this.form.getRawValue().correo,
      telefono: this.form.getRawValue().telefono,
      tipoEmpresa: this.form.getRawValue().tipoEmpresa,
      empresaAliada: this.form.getRawValue().empresaAliada,
      convenioEspecialTemporal: this.form.getRawValue().convenioEspecialTemporal,
      contratoFijo: this.form.getRawValue().contratoFijo,
      porcentajeIngresosBrutos: this.form.getRawValue().porcentajeIngresosBrutos,
      requiereCartaLaboral:this.form.getRawValue().requiereCartaLaboral,
      liqSinPagaduria: this.form.getRawValue().liqSinPagaduria,
    }
    this._GestionPagaduriaService.postCrear(data).subscribe(rep => {
      console.log(rep)
    })
  }

}

