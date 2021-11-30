import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReferenciasService} from '../../../../../../core/services/referencias.service';
import {GenericasService} from '../../../../../../core/services/genericas.service';
import {Observable, Subscription} from 'rxjs';
import {DepartamentosCiudadesService} from '../../../../../../core/services/departamentos-ciudades.service';
import {MatSelectChange} from '@angular/material/select';
import Swal from 'sweetalert2';
import {switchMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form-detalles-referencias',
  templateUrl: './form-detalles-referencias.component.html',
  styleUrls: ['./form-detalles-referencias.component.scss']
})
export class FormDetallesReferenciasComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public datosReferencia: any = this.referenciasService.seleccionDatosReferencia.getValue();
  public estadoReferencia$: Observable<any>;
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public subscription$: Subscription;
  @Output() cerrarFormulario: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
      private fb: FormBuilder,
      private referenciasService: ReferenciasService,
      private genericaService: GenericasService,
      private departamentosCiudadService: DepartamentosCiudadesService,
      private _dialogo: MatDialog,
      private route: ActivatedRoute,
      private _matDialog: MatDialogRef<FormDetallesReferenciasComponent>
  ) { }

  ngOnInit(): void {
      this.crearFormulario();
      // this.getDetalleReferencia();
      this.getEstadosReferencias();
      this.getDepartamentos();
      this.escuchaObservable();
  }
  public onDialogo(): void {
      this._matDialog.close();
  }
  /**
   * @description: Actualiza la referencia
   */
  public onActualizar(): void {
      if (this.form.valid) {
          const datos: any = this.form.getRawValue();
          const {tipo, descripcionTipoReferencia, descripcionEstado, ...data } = datos;
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
                  this.actualizarDetalleReferencia(data);
                  Swal.fire(
                      'Completado',
                      'Información guardada con éxito',
                      'success'
                  );
              }
          });
      }
  }

  private crearFormulario(): void {
      this.form = this.fb.group({
          idReferencia:              [''],
          identificacion:            [''],
          primerNombre:              [''],
          segundoNombre:             [''],
          primerApellido:            [''],
          segundoApellido:           [''],
          nombreCompleto:            [''],
          telefono:                  [''],
          celular:                   ['',[Validators.pattern(/^[0-9]*$/)]],
          codigoDepartamento:        [''],
          codigoCiudad:              [''],
          descripcionTipoReferencia: [''],
          estado:                    [''],
          descripcionEstado:         [''],
          antiguedad:                [''],
          tipo:                      [''],
          numeroSolicitud:           ['']
      });
  }

  public seleccionDepartamento(event: MatSelectChange): void {
      const codigo: string = event.value;
      this.getCiudades(codigo);
  }

  private getEstadosReferencias(): void {
      this.estadoReferencia$ = this.genericaService.getEstadoReferencias();
  }
  /**
   * @description:
   */
  private getDepartamentos(): void {
      this.departamentos$ = this.departamentosCiudadService.getDepartamentos();
  }
  /**
   * @description
   */
  private getCiudades(codigo: string): void {
      this.ciudades$ = this.departamentosCiudadService.getCiudades(codigo);
  }
  /**
   * @description:
   */
  private escuchaObservable(): void {
      this.subscription$ = this.referenciasService.seleccionDatosReferencia.pipe(
          switchMap(({value, show}) => {
              Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
              if (show) {
                  const {numeroSolicitud, idReferencias, identificacion} = value;
                  const datos: any = {
                      numeroSolicitud: numeroSolicitud,
                      idReferencias: idReferencias,
                      identificacion: identificacion
                  };
                  return this.referenciasService.getDetalleReferencia(datos);

              }
          })
      )
      .subscribe(({data}) => {
          Swal.close();
          this.form.patchValue(data);
          if (data.codigoDepartamento) {
            this.getCiudades(data.codigoDepartamento);
          }
      });
  }
  /**
   * @description: Actualiza la referencia
   */
  private actualizarDetalleReferencia(datos: any): void {
      this.subscription$ = this.referenciasService.putDetalleReferencia(datos).subscribe(( ) => {
          this.cerrarFormulario.emit(false);
          this.referenciasService.eventos$.emit(true);
          this._matDialog.close();
      });
  }
  /**
   * @description:
   */
  private getDetalleReferencia(): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      const {numeroSolicitud, idReferencias, identificacion} = this.datosReferencia.value;
      const datos: any = {
          numeroSolicitud: numeroSolicitud,
          idReferencias: idReferencias,
          identificacion: identificacion
      };
      const show: boolean = this.datosReferencia.show;
      if (show) {
          this.referenciasService.getDetalleReferencia(datos).subscribe(({data}) => {
              Swal.close();
              console.log(data);
              this.form.patchValue(data);
          });
      }
  }
    /**
     * @description: Valida que el campo solo sea numeros
     */
  public soloNumero(field: string) {
      return this.form.controls[field].hasError('pattern');
  }

    ngOnDestroy(): void {
      this.subscription$.unsubscribe();
    }

}
