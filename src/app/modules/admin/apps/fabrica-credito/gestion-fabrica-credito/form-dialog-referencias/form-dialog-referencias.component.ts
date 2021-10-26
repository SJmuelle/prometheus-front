import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DepartamentosCiudadesService} from "../../../../../../core/services/departamentos-ciudades.service";
import {Observable, Subscription} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {GenericasService} from "../../../../../../core/services/genericas.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReferenciasService} from "../../../../../../core/services/referencias.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-dialog-referencias',
  templateUrl: './form-dialog-referencias.component.html',
  styleUrls: ['./form-dialog-referencias.component.scss']
})
export class FormDialogReferenciasComponent implements OnInit {
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public tiposReferencia$: Observable<any>;
  public form: FormGroup;
  public subscription$: Subscription;
  constructor(
      private departamentosCiudadService: DepartamentosCiudadesService,
      private genericaServices: GenericasService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private referenciasService: ReferenciasService,
  ) {
      this.crearFormulario();
      const numeroSolicitud: string = data.numeroSolicitud;
      this.form.controls.numeroSolicitud.setValue(numeroSolicitud);
  }

  ngOnInit(): void {
      this.getDepartamentos();
      this.getTiposReferencia();
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
            identificacion:     [''],
            primerNombre:       [''],
            segundoNombre:      [''],
            primerApellido:     [''],
            segundoApellido:    [''],
            nombreCompleto:     [''],
            tipo:               [''],
            parentesco:         [''],
            telefono:           [''],
            celular:            [''],
            codigoPais:         [''],
            codigoDepartamento: [''],
            codigoCiudad:       [''],
            codigoBarrio:       [''],
            direccion:          [''],
            antiguedad:         [''],
        });
    }
    /**
     * @description: Crea una referencia
     */
    private postReferencia(datos: any): void {
        this.subscription$ = this.referenciasService.postReferencia(datos).subscribe(() => {

        })
    }

}
