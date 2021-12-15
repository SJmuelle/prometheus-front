import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FabricaCreditoService} from '../../../../../../core/services/fabrica-credito.service';
import {Observable, Subscription} from "rxjs";
import {DepartamentosCiudadesService} from "../../../../../../core/services/departamentos-ciudades.service";
import {MatSelectChange} from "@angular/material/select";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";
import {GenericasService} from "../../../../../../core/services/genericas.service";
import Swal from "sweetalert2";
import {
    FormularioRepresentanteInterface
} from "../../../../../../core/interfaces/formulario-fabrica-credito.interface";
import * as moment from "moment";

@Component({
  selector: 'app-form-representante-legal',
  templateUrl: './form-representante-legal.component.html',
  styleUrls: ['./form-representante-legal.component.scss']
})
export class FormRepresentanteLegalComponent implements OnInit {
  public form: FormGroup;
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public tipoDocumentos$: Observable<any>;
  public tipoVivienda$: Observable<any>;
  public nivelEstudio$: Observable<any>;
  public viveNegocio$: Observable<any>;
  public generos$: Observable<any>;
  public subscription$: Subscription;
  constructor(
      private fb: FormBuilder,
      private fabricaCreditoService: FabricaCreditoService,
      private departamentosCiudadesService: DepartamentosCiudadesService,
      private route: ActivatedRoute,
      private genericaServices: GenericasService,
      private router: Router,
  ) {
      const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
      if (numeroSolicitud) {
          this.fabricaCreditoService.getDatosTitularFabrica(numeroSolicitud).pipe(
              take(1)
          )
          .subscribe(({data}) => {
              this.form.patchValue(data);
              if (data.codigoDepartamento) {
                  this.getCiudades(data.codigoDepartamento);
              }
              if (data.codigoCiudad) {
                  this.getBarrios(data.codigoCiudad);
              }
          });
      }
  }

  ngOnInit(): void {
      this.createFormulario();
      this.getDepartamentos();
      this.getTiposDocumentos();
      this.getTiposVivienda();
      this.getNivelEstudio();
      this.getViveNegocio();
      this.getGeneros();
  }

  public onPostDatos(): void {
      if (this.form.valid) {
          const datos: FormularioRepresentanteInterface = this.form.getRawValue();
          // console.log(datos);
          const {fechaNacimiento, ...data} = datos;
          const fechaNacimientoFormato = moment(fechaNacimiento).format('YYYY-MM-DD');
          const datosFormulario: FormularioRepresentanteInterface = {
              fechaNacimiento: fechaNacimientoFormato,
              ...data
          };
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
                  this.postFormulario(datosFormulario);
                  // console.log(this.form.getRawValue());
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
    /**
     * @description: Selecciona el codigo para cargar el api barrios
     *
     */
  public seleccionCiudad(event: MatSelectChange): void {
      const codigo: string = event.value;
      this.getBarrios(codigo);
  }
  /**
   * @description: Crea formulario
   */
  private createFormulario(): void {
      this.form = this.fb.group({
          id:                      undefined,
          tipoDocumento:           [''],
          identificacion:          [''],
          primerNombre:            [''],
          segundoNombre:           [''],
          primerApellido:          [''],
          segundoApellido:         [''],
          nombreCompleto:          [''],
          telefono:                [''],
          celular:                 [''],
          email:                   [''],
          genero:                  [''],
          descripcionGenero:       [''],
          nacionalidad:            [''],
          descripcionTipoVivienda: [''],
          codigoDepartamento:      [''],
          descripcionDepartamento: [''],
          codigoCiudad:            [''],
          descripcionCiudad:       [''],
          codigoBarrio:            [''],
          descripcionBarrio:       [''],
          direccionResidencial:    [''],
          descripcionNivelEstudio: [''],
          descripcionViveNegocio:  [''],
          numeroSolicitud:         [''],
          tipo:                    [''],
          fechaNacimiento:         [''],
          tipoVivienda:            [''],
          viveEnNegocio:           [''],
          nivelEstudio:            ['']
      });
  }
    /**
     * @description: Guardado de datos fabrica
     */
  private postFormulario(datos: FormularioRepresentanteInterface): void {
      Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
      this.subscription$ = this.fabricaCreditoService.postDatosFabricaCredita(datos)
          .subscribe(() => {
              Swal.fire(
                  'Completado',
                  'Información guardada con exito',
                  'success'
              );
              this.router.navigate(['/credit-factory/agenda-completion']);
          });
  }
  /**
   *@description
   */
  private getTiposDocumentos(): void {
      this.tipoDocumentos$ = this.genericaServices.getTiposDocumentos();
  }
    /**
     * @description: Obtiene los tipos de vivienda
     */
    private getTiposVivienda(): void {
        this.tipoVivienda$ = this.genericaServices.getTipoViviendas();
    }
    /**
     * @description: Obtiene listado de vive en negocio
     */
    private getViveNegocio(): void {
        this.viveNegocio$ = this.genericaServices.getViveNegocio();
    }
    /**
     * @description: Obtiene el nivel de estudio
     */
    private getNivelEstudio(): void {
        this.nivelEstudio$ = this.genericaServices.getNivelEstudio();
    }
    /**
     * @description: Obtiene el listado de departamento
     */
    private getDepartamentos(): void {
        this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
    }
    /**
     * @description: Obtiene el listado de ciudades
     */
    private getCiudades(codigo: string): void {
        this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
    }
    /**
     * @description: Obtiene el listado de barrios
     */
    private getBarrios(codigo: string): void {
        this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
    }
    /**
     * @description: Obtiene los generos
     */
    private getGeneros(): void {
        this.generos$ = this.genericaServices.getGeneros();
    }

}
