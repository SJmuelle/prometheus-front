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
  dv: string;

  seleccion = [{ value: true, viewValue: 'SI' }, { value: false, viewValue: 'NO' }];
  tipoEmpresa = [{ value: 'GRUPO', viewValue: 'Grupo' }, { value: 'TEMPORAL', viewValue: 'Temporal' }, { value: 'OTRAS', viewValue: 'Otras Empresas' }];
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
      razonSocial: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]{1,60}$')]],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]{5,20}$')]],
      dv: ['', [Validators.required]],
      municipio: [''],
      departamento: ['', Validators.required], // Agregar validación de campo requerido
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$'), Validators.maxLength(10)]],
      tipoEmpresa: [''],
      empresaAliada: [''],
      convenioEspecialTemporal: [''],
      contratoFijo: [''],
      porcentajeIngresosBrutos: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      requiereCartaLaboral: [''],
      liqSinPagaduria: ['']
    });

    this.consultaMunicipio();
  }

  public onDocumentoChange(event: any) {
    const documento = event.target.value;
    // this.form.controls.documento.setValue(documento);
    this.form.controls.dv.setValue(this.calcularDigitoVerificacion(documento));
  }
  calcularDigitoVerificacion(nit) {
    // Eliminar guiones y espacios en blanco
    nit = nit.replace(/[- ]/g, '');
    // Verificar que tenga 9 dígitos
    if (nit.length !== 9) {
      return 0;
    }
    // Verificar que el primer dígito sea 1, 2, 3, 6, 7, 8 o 9
    var primerDigito = parseInt(nit.charAt(0));
    if (![1, 2, 3, 6, 7, 8, 9].includes(primerDigito)) {
      return 0;
    }
    // Calcular el dígito de verificación
    var suma = 0;
    var pesos = [71, 67, 59, 53, 47, 43, 41, 37, 29];
    for (var i = 0; i < 8; i++) {
      suma += parseInt(nit.charAt(i)) * pesos[i];
    }
    var digitoVerificacion = 11 - (suma % 11);
    if (digitoVerificacion === 10 || digitoVerificacion === 11) {
      digitoVerificacion = 0;
    }
    // Retornar el dígito de verificación
    return digitoVerificacion;
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
    if (
      !this.form.getRawValue().razonSocial||
      !this.form.getRawValue().documento ||
      !this.form.getRawValue().dv ||
      !this.form.getRawValue().municipio ||
      !this.form.getRawValue().direccion ||
      !this.form.getRawValue().correo||
      !this.form.getRawValue().telefono 
      

    ) {

      // Mostrar mensaje de error utilizando la librería sweetalert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llene todos los campos antes de guardar.',
      });
      return;
    }
    console.log("mostrar", this.form.getRawValue());

    let data, url;

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
      if (rep.data.respuesta === 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Configuracion guardada con exito',
          }).then(() => {
              location.reload();
          });
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: rep.data.respuesta
          });
        }
    })
  }
}

