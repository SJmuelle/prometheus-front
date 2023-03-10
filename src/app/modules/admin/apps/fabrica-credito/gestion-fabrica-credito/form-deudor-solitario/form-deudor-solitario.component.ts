import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { FormularioCreditoMicro, FormularioDeudorSolidarioInterface } from 'app/core/interfaces/formulario-fabrica-credito.interface';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-deudor-solitario',
  templateUrl: './form-deudor-solitario.component.html',
  styleUrls: ['./form-deudor-solitario.component.scss']
})
export class FormDeudorSolitarioComponent implements OnInit {

  public parentescos$: Observable<any>;
  public tipoDocumentos$: Observable<any>;
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public tipoVia$: Observable<any>;
  public tipoVivienda$: Observable<any>;
  public subscription$: Subscription;
  public dataInicial: any
  public unSubscribe$: Subject<any> = new Subject<any>();
  //variables iniciales
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public formDeudorSolidario: FormGroup;
  fechaActual: any = moment().locale("co");
  constructor(
    private fb: FormBuilder,
    private genericaServices: GenericasService,
    private departamentosCiudadesService: DepartamentosCiudadesService,
    private route: ActivatedRoute,
    private fabricaCreditoService: FabricaCreditoService,
    private _formularioCreditoService: FormularioCreditoService,
  ) {
    if (!this.numeroSolicitud) {
      return;
    } else {
      this.getInformacionCodeudorSolidario(this.numeroSolicitud, this.identificacion);
    }
  }

  ngOnInit(): void {
    this.createFormulario();

    // Carga de lista de valores
    this.getParentesco();
    this.getTiposDocumentos();
    this.getDepartamentos();
    this.getTipoVia();
    this.getTiposVivienda();
    this.cargueInicial();
  }

  /**
     * @description :creando el formulario
     */
  private createFormulario(): void {
    this.formDeudorSolidario = this.fb.group({
      creditoTitularLineas: [''],
      fechaIngresoFabrica: [''],
      emision: [''],
      tipoDocumento: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombreCompleto: [''],
      celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
      descripcionTipoCredito: [''],
      primerNombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      descripcionEstado: [''],
      descripcionSubestado: [''],
      segundoNombre: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      primerApellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      segundoApellido: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      estadoCivil: [''],
      email: ['', [Validators.required, Validators.email]],
      genero: [''],
      nacionalidad: [''],
      fechaNacimiento: [''],
      nivelEstudio: [''],
      numeroHijos: [''],
      personasACargo: [''],
      fechaExpedicion: [''],
      codigoDepartamentoExpedicion: [''],
      codigoCiudadExpedicion: [''],
      estrato: [''],
      codigoDepartamento: ['', [Validators.required]],
      codigoCiudad: ['', Validators.required],
      barrioResidencia: ['', Validators.required],
      direccionResidencial: [''],
      direccionTipoVia: ['', [Validators.required]],
      direccionViaPrincipal: ['', [Validators.required, Validators.min(0)]],
      direccionNumeroVia: ['', [Validators.required, Validators.min(0)]],
      direccionDistanciaVia: ['', [Validators.required]],
      direccionComplemento: [''],
      tipoVivienda: ['', Validators.required],
      annosTiempoResidencia: [''],
      mesesTiempoResidencia: [''],
      tipoActividad: [''],
      actividadEconomica: [''],
      actividadEspecifica: [''],
      antiguedadActividad: [''],
      antiguedadNegocio: [''],
      camaraComercio: [''],
      tieneRut: [''],
      nitNegocio: [''],
      nombreNegocio: [''],
      codigoDepartamentoNegocio: [''],
      codigoCiudadNegocio: [''],
      codigoBarrioNegocio: [''],
      segmento: [''],
      direccionNegocio: [''],
      direccionNegocioVia: [''],
      direccionNegocioPrincipal: [''],
      direccionNegocioNroVia: [''],
      direccionNegocioDistanciaVia: [''],
      direccionNegocioCompleto: [''],
      telefonoNegocio: [''],
      tipoLocal: [''],
      antiguedadLocal: [''],
      nombreArrendador: [''],
      celularArrendador: [''],
      tipoUbicacionNegocio: [''],
      numeroEmpleados: [''],
      nombreAtiendeNegocio: [''],
      tieneOtrosPuntos: [''],
      tipoDocumentoConyuge: [''],
      identificacionConyuge: [''],
      nombreCompletoConyuge: [''],
      celularConyuge: [''],
      primerNombreConyuge: [''],
      segundoNombreConyuge: [''],
      primerApellidoConyuge: [''],
      segundoApellidoConyuge: [''],
      emailConyuge: [''],
      tipoEmpleoConyuge: [''],
      nombreEmpresaConyuge: [''],
      cargoConyuge: [''],
      salarioConyuge: [''],
      telefonoEmpresaConyuge: [''],
      poseeCuentaBancaria: [''],
      tipoCuentaBancaria: [''],
      entidadBancaria: [''],
      numeroCuentaBancaria: [''],
      autorizacionBanco: [''],
      tipoDeudor: [''],
      legalCargoPublico: ['', Validators.required],
      entidadPublico: [''],
      vinculadoActualPublico: [''],
      fechaDesvinculacionPublico: [''],
      legalPersonalExpuesta: ['', Validators.required],
      tiposTercerosSolicitud: [''],
      vinculacionExpuesta: [''],
      familiarDePersonaExpuestaPyP: [''],
      cargoRecursosPartidoPolitico: [''],
      nombreExpuesta: [''],
      tipoIdentificacionExpuesta: [''],
      identificacionExpuesta: [''],
      nacionalidadExpuesta: [''],
      entidadExpuesta: [''],
      cargoExpuesta: [''],
      vinculadoActualExpuesta: [''],
      fechaDesvinculacionExpuesta: [''],
      legalDesarrollaActividadApnfd: ['', Validators.required],
      legalCargoPartidoPolitico: ['', Validators.required],
      legalOperacionCriptomoneda: ['', Validators.required],
      tipoOperacionCripto: [''],
      tipoOperacionCriptomoneda: [''],
      legalOperacionExtranjera: ['', Validators.required],
      tipoOperacionExtranjera: [''],
      declaroIngresoDeclaracionAuto: ['', Validators.required],
      otroIngresoDeclaracionAuto: [''],
      autoricacionDatosPersonalClaracionAuto: [''],
      clausulaAnticurrupcionClaracionAuto: [''],
      plazo: [''],
      descripcionTipo: [''],
      titularMicro: [''],
      aplicaCodeudor: [''],
      valorSolicitadoWeb: [''],
      creditoCodeudorLineas: [''],
      modificadaSolicitud: [''],
      valorSolicitado: [''],
      destinoCredito: [''],
      codeudorMicro: [''],
      codigoBarrio: [''],
      cargoPublico: [''],
      entidad: [''],
      vinculadoActualmente: [''],
      fechaDesvinculacion: [''],
      parentesco: ['', Validators.required],
    });
  }

  /**
   * @description: Obtiene la data para cargar al formulario
   */
  private getInformacionCodeudorSolidario(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.fabricaCreditoService.getInformacionTipoTercero(numeroSolicitud, 'S').pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        console.log(data);
        this.formDeudorSolidario.patchValue(data);
        if (data.codigoDepartamento) {
          this.getCiudades(data.codigoDepartamento);
        }
        if (data.codigoCiudad) {
          this.getBarrios(data.codigoCiudad);
        }
      });
  }

  private cargueInicial() {
    let data = {
      entidad: "CONFIG-MICRO",
      unidadNegocio: 1
    };
    this._formularioCreditoService.cargueInicial(data).subscribe((resp: any) => {
      if (resp) {
        this.dataInicial = resp.data
      }
    })
  }
  /**
     * @description: Selecciona el codigo para cargar el api ciudades
     *
     */
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
    * @description: Obtiene el listado de parentesco
    */
  private getParentesco(): void {
    this.parentescos$ = this.genericaServices.getParetensco();
  }

  /**
    * @description: Obtiene el listado de tipo de documentos
    */
  private getTiposDocumentos(): void {
    this.tipoDocumentos$ = this.genericaServices.getTiposDocumentos();
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
    // this.formDeudorSolidario.controls.codigoBarrio.setValue('');
    // this.formDeudorSolidario.controls.codigoBarrio.setValue("");
  }

  /**
   * @description: Obtiene el listado de barrios
   */
  private getBarrios(codigo: string): void {
    this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
  }

  /**
   * @description:
   */
  private getTipoVia(): void {
    this.tipoVia$ = this.genericaServices.getTipoVia();
  }


  /**
   * @description: Obtiene los tipos de vivienda
   */
  private getTiposVivienda(): void {
    this.tipoVivienda$ = this.genericaServices.getTipoViviendas();
  }

  public validationPost(): void {
    console.log(this.formDeudorSolidario.valid);

    if (this.formDeudorSolidario.invalid) {
      this.formDeudorSolidario.markAllAsTouched();
      // console.log(this.formDeudorSolidario, this.formDeudorSolidario.valid);
      Object.keys(this.formDeudorSolidario.controls).forEach(key => {
        // Get errors of every form control
        // console.log(this.formDeudorSolidario.get(key).errors, key);
      });
    } else {
      this.onPostDatos();
    }
  }

  /**
       * @description:
       */
  public onPostDatos(): void {
    this.formDeudorSolidario.controls.fechaDesvinculacionPublico.setValue(moment(this.formDeudorSolidario.controls.fechaDesvinculacionPublico.value.toString()).format('YYYY-MM-DD'));
    this.formDeudorSolidario.controls.fechaDesvinculacionExpuesta.setValue(moment(this.formDeudorSolidario.controls.fechaDesvinculacionExpuesta.value.toString()).format('YYYY-MM-DD'));
    let data = {
      tipo: 'S',
      recurso: "tab-actualizar-solidario-microcredito",
      numeroSolicitud: Number(this.numeroSolicitud),
      ...this.formDeudorSolidario.value
    }

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
        this.postFormularioDeudorSolidario(data);
      }
    });
  }

  /**
     * @description: Guardado de datos fabrica
     */
  private postFormularioDeudorSolidario(datos: FormularioCreditoMicro): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.subscription$ = this.fabricaCreditoService.postDatosFabricaCredita(datos)
      .subscribe(() => {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
        );
        setTimeout(() => {
          location.reload()
        }, 1000);
        //   this.router.navigate(['/credit-factory/agenda-completion']);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.msg,
        });
      });
  }

}
