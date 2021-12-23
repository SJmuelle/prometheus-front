import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DepartamentosCiudadesService} from "../../../../../../core/services/departamentos-ciudades.service";
import {Observable, Subscription} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {GenericasService} from "../../../../../../core/services/genericas.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReferenciasService} from "../../../../../../core/services/referencias.service";
import Swal from "sweetalert2";
import {DirectionsComponent} from "../../../../../../shared/modal/directions/directions.component";

@Component({
  selector: 'app-form-dialog-referencias',
  templateUrl: './form-dialog-referencias.component.html',
  styleUrls: ['./form-dialog-referencias.component.scss']
})
export class FormDialogReferenciasComponent implements OnInit, OnDestroy {
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public tiposReferencia$: Observable<any>;
  public form: FormGroup;
  public subscription$: Subscription;
  constructor(
      private departamentosCiudadService: DepartamentosCiudadesService,
      private genericaServices: GenericasService,
      private _dialog: MatDialogRef<FormDialogReferenciasComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private referenciasService: ReferenciasService,
      private matDialog: MatDialog
  ) {
      this.crearFormulario();
      const numeroSolicitud: string = data.numeroSolicitud;
      this.form.controls.numeroSolicitud.setValue(numeroSolicitud);
  }

  ngOnInit(): void {
      this.getDepartamentos();
      this.getTiposReferencia();
      this.estadoFormulario();
  }

  public onCerrar(): void {
      this._dialog.close();
  }

  public openModalDirection(): void {
      const dialogRef = this.matDialog.open(DirectionsComponent, {
          // width: '250px',
          disableClose: false
      });

      dialogRef.afterClosed().subscribe((res) => {
          // this.formTab1.controls['direccionNegocio'].setValue(res);
      });
  }

  public onGuardar(): void {
      if (this.form.valid) {
        const datos: any = this.form.getRawValue();
          Swal.fire({
              title: 'Guardar información',
              text: '¿Está seguro de guardar información?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#a3a0a0',
              confirmButtonText: 'Guardar',
              cancelButtonText: 'Cancelar'
          }).then((result) => {
              if (result.isConfirmed) {
                  this.postReferencia(datos);
                  Swal.fire(
                      'Completado',
                      'Información guardada con éxito',
                      'success'
                  );
              }
          });

      }else {
          this.form.markAllAsTouched();
      }
  }

  public seleccionDepartamento(event: MatSelectChange): void {
      const codigo: string = event.value;
      this.getCiudades(codigo);
  }

  public seleccionCiudad(event: MatSelectChange): void {
      const codigo: string = event.value;
      this.getBarrios(codigo);
  }
    /**
     * @description: Obtiene el listado de departamento
     */
    private getTiposReferencia(): void {
        this.tiposReferencia$ = this.genericaServices.getTiposReferencias();
    }
    /**
     * @description: Obtiene el listado de departamento
     */
    private getDepartamentos(): void {
        this.departamentos$ = this.departamentosCiudadService.getDepartamentos();
    }
    /**
     * @description: Obtiene el listado de ciudades
     */
    private getCiudades(codigo: string): void {
        this.ciudades$ = this.departamentosCiudadService.getCiudades(codigo);
    }
    /**
     * @description: Obtiene el listado de barrios
     */
    private getBarrios(codigo: string): void {
        this.barrios$ = this.departamentosCiudadService.getBarrios(codigo);
    }

    private crearFormulario(): void {
        this.form = this.fb.group({
            numeroSolicitud:    [''],
            primerNombre:       ['', [Validators.required]],
            segundoNombre:      [''],
            primerApellido:     ['', [Validators.required]],
            segundoApellido:    [''],
            nombreCompleto:     [''],
            tipo:               ['seleccione',],
            parentesco:         [''],
            telefono:           ['', [Validators.pattern(/^[0-9]*$/)]],
            celular:            ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            codigoPais:         [''],
            codigoDepartamento: ['seleccione'],
            codigoCiudad:       ['seleccione'],
            codigoBarrio:       ['seleccione'],
            direccion:          [''],
            antiguedad:         [''],
        });
    }
    /**
     * @description: Crea una referencia
     */
    private postReferencia(datos: any): void {
        const {tipo,
            numeroSolicitud,
            identificacion,
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            nombreCompleto,
            parentesco,
            telefono,
            celular,
            codigoPais,
            codigoDepartamento,
            codigoCiudad,
            codigoBarrio,
            direccion,
            antiguedad

        } = datos;
        const formPersonal = {
            numeroSolicitud: Number(numeroSolicitud),
            identificacion:  identificacion,
            primerNombre:    primerNombre,
            segundoNombre:   segundoNombre,
            primerApellido:  primerApellido,
            segundoApellido: segundoApellido,
            nombreCompleto:  `${primerNombre +' '}${segundoNombre? segundoNombre + ' ' : ''}${primerApellido && segundoApellido? primerApellido + ' ': primerApellido}${segundoApellido? segundoApellido : ''}`,
            tipo:            tipo,
            parentesco:      parentesco,
            telefono:        telefono,
            celular:         celular,
            codigoPais:      codigoPais,
            codigoDepartamento: codigoDepartamento,
            codigoCiudad:       codigoCiudad,
            codigoBarrio:       codigoBarrio,
            direccion:          direccion,
            antiguedad:         antiguedad,
        };
        const formComercial = {
            numeroSolicitud: Number(numeroSolicitud),
            identificacion:  identificacion,
            primerNombre:    primerNombre,
            segundoNombre:   segundoNombre,
            primerApellido:  primerApellido,
            segundoApellido: segundoApellido,
            nombreCompleto:  nombreCompleto,
            tipo:            tipo,
            parentesco:      parentesco,
            telefono:        telefono,
            celular:         celular,
            codigoPais:      codigoPais,
            codigoDepartamento: codigoDepartamento,
            codigoCiudad:       codigoCiudad,
            codigoBarrio:       codigoBarrio,
            direccion:          direccion,
            antiguedad:         antiguedad,
        };
        if (tipo === 'P') {
            this.subscription$ = this.referenciasService.postReferencia(formPersonal).subscribe(() => {
                this.onCerrar();
                this.referenciasService.eventos$.emit(true);
            });
        }else {
            this.subscription$ = this.referenciasService.postReferencia(formComercial).subscribe(() => {
                this.onCerrar();
                this.referenciasService.eventos$.emit(true);
            });
        }
    }

    private estadoFormulario(): void {
        this.form.controls['tipo'].setValue('P');
        this.subscription$ = this.form.controls['tipo'].valueChanges.subscribe((tipo) => {
            if (tipo === 'P') {
                this.form.controls['nombreCompleto'].setValue('');
                this.form.controls['nombreCompleto'].clearValidators();
                this.form.controls['codigoDepartamento'].setValue('');
                this.form.controls['codigoCiudad'].setValue('');
                this.form.controls['codigoBarrio'].setValue(0);
                this.form.controls['direccion'].setValue('');
                this.form.controls['celular'].setValue('');
                this.form.controls['primerNombre'].setValidators(Validators.required);
                this.form.controls['primerApellido'].setValidators(Validators.required);
                this.form.controls['celular'].setValidators(Validators.required);
                this.form.controls['codigoDepartamento'].clearValidators();
                this.form.controls['codigoCiudad'].clearValidators();
                this.form.controls['codigoBarrio'].clearValidators();
                this.form.controls['antiguedad'].clearValidators();
            }else {
                this.form.controls['primerNombre'].setValue('');
                this.form.controls['segundoNombre'].setValue('');
                this.form.controls['primerApellido'].setValue('');
                this.form.controls['segundoApellido'].setValue('');
                this.form.controls['celular'].setValue('');
                this.form.controls['primerNombre'].clearValidators();
                this.form.controls['primerApellido'].clearValidators();
                this.form.controls['nombreCompleto'].setValidators(Validators.required);
                this.form.controls['codigoDepartamento'].setValidators(Validators.required);
                this.form.controls['celular'].setValidators(Validators.required);
                this.form.controls['codigoCiudad'].setValidators(Validators.required);
                this.form.controls['codigoBarrio'].setValidators(Validators.required);
                this.form.controls['antiguedad'].setValidators(Validators.required);
            }
            this.form.controls['primerNombre'].updateValueAndValidity();
            this.form.controls['primerApellido'].updateValueAndValidity();
            this.form.controls['codigoDepartamento'].updateValueAndValidity();
            this.form.controls['codigoBarrio'].updateValueAndValidity();
            this.form.controls['codigoCiudad'].updateValueAndValidity();
            this.form.controls['nombreCompleto'].updateValueAndValidity();
            this.form.controls['antiguedad'].updateValueAndValidity();
            this.form.controls['celular'].updateValueAndValidity();
        });
    }
    /**
     * @description: Valida que el campo solo sea numeros
     */
    public soloNumero(field: string) {
        return this.form.controls[field].hasError('pattern');
    }

    public campoRequerido(field: string) {
        return this.form.controls[field].errors && this.form.controls[field].touched;
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
