import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { OfertaService } from 'app/core/services/oferta.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { DirectionsBasicComponent } from 'app/shared/modal/directions-basic/directions-basic.component';
import { Subscription, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'LIBRANZA-NATURAL-TITULAR',
  templateUrl: './titular.component.html',
  styleUrls: ['./titular.component.scss']
})
export class LibranzaTitularComponent implements OnInit {
  @Input() currentStep: number;

  // currentStep = 1;
  @ViewChild('editor') editor;
  public form: FormGroup;
  public formOferta: FormGroup;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public undadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
  public identificacion: string = this.route.snapshot.paramMap.get('id');

  public subscription$: Subscription;
  public unSubscribe$: Subject<any> = new Subject<any>();
  public departamentos$: Observable<any>;
  public departamentosNacimiento$: Observable<any>;
  public departamentosNegocio$: Observable<any>;
  public ciudades$: Observable<any>;
  public ciudadesNacimiento$: Observable<any>;
  public ciudadesNegocio$: Observable<any>;
  public barrios$: Observable<any>;
  public barriosNegocio$: Observable<any>;
  public tipoDocumentos$: Observable<any>;
  public generos$: Observable<any>;
  public tipoVivienda$: Observable<any>;
  public destinoCredito$: Observable<any>;
  public nivelEstudio$: Observable<any>;
  public viveNegocio$: Observable<any>;
  public declarante$: Observable<any>;
  public camaraComercio$: Observable<any>;
  public fabricaDatos: any;
  public MostrarfabricaDatos: boolean = false;
  //variablkes de oferta
  // public numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
  public listadoOferta$: Observable<any>;
  public capacidadPago$: Observable<any>;
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };
  mensajeQuill: any;
  // consulta todos los datos de la solicitud 
  public datosCompletoSolicitud: any;
  mostrarDepartamento: boolean;
  mostrarCiudad: boolean;
  mostrarBarrio: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fabricaCreditoService: FabricaCreditoService,
    public utility: UtilityService,
    private fb: FormBuilder,
    private departamentosCiudadesService: DepartamentosCiudadesService,
    private genericaServices: GenericasService,
    private _dialog: MatDialog,
    private ofertaService: OfertaService
  ) {
    this.createFormulario();
    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);

  }

  ngOnInit(): void {
    // this.createFormulario();
    this.getDepartamentos();
    this.getDepartamentoNacimiento();
    this.getDepartamentoNegocio();
    this.getTiposDocumentos();
    this.getGeneros();
    this.getTiposVivienda();
    this.getNivelEstudio();
    this.getViveNegocio();
    this.getDeclarante();
    this.getCamaraComercio();
    this.getDestinoCredito();
    this.getListadoOferta(Number(this.numeroSolicitud));
    this.getCapacidadPago(Number(this.numeroSolicitud));
    this.getTodosFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);

    // this.getFabricaCreditoAgenda(Number(this.numeroSolicitud));
    // this.listenFormulario();
  }

  /**
 * @description: Valida que el campo solo sea numeros
 */
  public soloNumero(field: string) {
    return this.form.controls[field].hasError('pattern');
  }

  /**
 * @description :modal de direcion
 */
  public openModalDirection(): void {
    const dialogRef = this._dialog.open(DirectionsBasicComponent, {
      width: '60%',
      data: {
        direccion: '',
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      const dataModal: any = res;
      if (dataModal.viaNombre != undefined) {
        this.form.controls.direccionResidenciaCorregido.setValue(
          (dataModal.viaNombre == undefined
            ? ''
            : `${dataModal.viaNombre}`) +
          (dataModal.callePrincipal == undefined
            ? ''
            : ` ${dataModal.callePrincipal}`) +
          (dataModal.numero == undefined
            ? ''
            : ` # ${dataModal.numero}`) +
          (dataModal.numero2 == undefined
            ? ''
            : ` - ${dataModal.numero2}`) +
          (dataModal.complemento == undefined
            ? ''
            : ` ${dataModal.complemento}`));
      }
    });
  }

  /**
* @description :modal direcionn negocio
*/
  public openModalNegocio(): void {
    const dialogRef = this._dialog.open(DirectionsBasicComponent, {
      width: '60%',
      data: {
        direccion: '',
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      const dataModal: any = res;
      if (dataModal.viaNombre != undefined) {
        this.form.controls.direccionNegocioCorregido.setValue(
          (dataModal.viaNombre == undefined
            ? ''
            : `${dataModal.viaNombre}`) +
          (dataModal.callePrincipal == undefined
            ? ''
            : ` ${dataModal.callePrincipal}`) +
          (dataModal.numero == undefined
            ? ''
            : ` # ${dataModal.numero}`) +
          (dataModal.numero2 == undefined
            ? ''
            : ` - ${dataModal.numero2}`) +
          (dataModal.complemento == undefined
            ? ''
            : ` ${dataModal.complemento}`));
      }
    });
  }

  logChange($event) {
    console.log(this.editor);
    //console.log($event);
    this.mensajeQuill = $event.text;
  }

  /**
 * @description :creando el formulario
 */
  private createFormulario(): void {
    this.form = this.fb.group({
      antiguedadNegocio: ['', [Validators.pattern(/^[0-9]*$/)]],
      antiguedadNegocioCorregido: ['', [Validators.pattern(/^[0-9]*$/)]],
      antiguedadNegocioValida: [''],
      recurso: [''],
      antiguedadNegocioValida_bool: Boolean,
      barrioNegocio: [''],
      barrioNegocioValida: [''],
      barrioNegocioValida_bool: Boolean,
      barrioNegocioCorregido: [''],
      barrioResidencia: [''],
      barrioResidenciaCorregido: [''],
      barrioResidenciaValida: [''],
      barrioResidenciaValida_bool: Boolean,
      camaraComercio: [''],
      camaraComercio_bool: Boolean,
      camaraComercioCorregido: [''],
      camaraComercioValida: [''],
      camaraComercioValida_bool: Boolean,
      celular: [''],
      ciudadNegocio: [''],
      ciudadNegocioCorregido: [''],
      ciudadNegocioValida: [''],
      ciudadNegocioValida_bool: Boolean,
      ciudadResidencia: [''],
      ciudadResidenciaCorregido: [''],
      ciudadResidenciaValida: [''],
      ciudadResidenciaValida_bool: Boolean,
      comprasSemento: [''],
      correoElectronico: [''],
      correoElectronicoCorregido: ['', [Validators.email]],
      correoElectronicoValida: [''],
      correoElectronicoValida_bool: Boolean,
      departamentoNegocio: [''],
      departamentoNegocioCorregido: [''],
      departamentoNegocioValida: [''],
      departamentoNegocioValida_bool: Boolean,
      departamentoResidencia: [''],
      departamentoResidenciaCorregido: [''],
      departamentoResidenciaValida: [''],
      departamentoResidenciaValida_bool: Boolean,
      dineroAhorradoMensual: [''],
      dineroAhorradoMensualValida: [''],
      dineroAhorradoMensualValida_bool: Boolean,
      dineroEfectivoActual: [''],
      dineroPorCobrarActual: [''],
      dineroProveedores: [''],
      direccionNegocio: [''],
      direccionNegocioCorregido: [''],
      direccionNegocioValida: [''],
      direccionNegocioValida_bool: Boolean,
      direccionResidencia: [''],
      direccionResidenciaCorregido: [''],
      direccionResidenciaValida: [''],
      direccionResidenciaValida_bool: Boolean,
      idReferencia: [''],
      inventarioActual: [''],
      nitNegocio: [''],
      nitNegocioCorregido: [''],
      comprasCemento: [''],
      nitNegocioValida: [''],
      nitNegocioValida_bool: Boolean,
      nombreCompleto: [''],
      nombreNegocio: [''],
      numeroSolicitud: this.numeroSolicitud.toString(),
      pagoEmpleados: [''],
      pagoEnArriendo: [''],
      pagoServicioPublico: [''],
      tieneEmpleado: [''],
      tipoLocal: [''],
      tipoReferencia: [''],
      totalActivo: [''],
      totalActivoValida: [''],
      totalActivoValida_bool: Boolean,
      unidadNegocio: [''],
      validacionCentrales: [''],
      valorTotalCuotasCreditos: [''],
      vendeCredito: [''],
      ventaMensual: [''],
      ventaMensualCorregido: [''],
      ventaMensualValida: [''],
      ventaMensualValida_bool: Boolean,
      viveEnNegocio: [''],
      numeroFormularioValida: [''],
      numeroFormularioValida_bool: Boolean,
      telefonoContactoValida: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      telefonoContactoValida_bool: Boolean,
      telefonoContacto: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      telefonoContactoCorregido: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      telefonoContactoObservacion: [''],
      descripcionBarrio: [''],
      descripcionBarrioCorregido: [''],
      descripcionBarrioNegocio: [''],
      descripcionBarrioNegocioCorregido: [''],
      descripcionCiudad: [''],
      descripcionCiudadCorregida: [''],
      descripcionCiudadNegocio: [''],
      descripcionCiudadNegocioCorregida: [''],
      descripcionDepartamento: [''],
      descripcionDepartamentoCorregido: [''],
      descripcionDepartamentoNegocio: [''],
      descripcionDepartamentoNegocioCorregido: [''],
      totalActivoCorregidos: [''],
      tieneEmpleadoValida_bool: Boolean,
      nombreNegocioValida_bool: Boolean,
      referenciaValidada: [""],
      referenciaValidada_bool:[""],

      otroDestinoCredito: [''],
      motivoObligaciones: [''],

      destinoCreditoCorregido:[''],
      destinoCreditoCorregido_bool: Boolean,
      destinoCredito: [''],
      descripcionDestinoCredito: [''],
      destinoCreditoValida:[''],
      fechaNacimiento:[''],
      fechaNacimientoValida:[''],
      fechaNacimientoValida_bool: Boolean,
      fechaNacimientoCorregido:[''],
      comentarioValidacion:['']
    });
    this.formOferta = this.fb.group({
      valorSolicitado: [''],
      plazo: [''],
      salarioBasico: [''],
      otrosIngresos: [''],
      comisionesHorasExtras: [''],
      descuentoNomina: [''],
      numeroSolicitud: Number(this.numeroSolicitud),
    })
  }

  /**
   * {
    "numeroSolicitud":185376,
    "tipo":"T",
    "identificacion":"1110178226"
}
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      "numeroSolicitud": this.numeroSolicitud,
      "tipo": "T",
      "identificacion": this.identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgendaReferenciacion(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        // debugger;
        console.log(data);
        this.MostrarfabricaDatos = true;
        this.fabricaDatos = data
        this.form.patchValue(data);
        if (data.departamentoResidencia) {
          this.getCiudades(data.departamentoResidencia);
          this.form.controls['departamentoResidenciaValida_bool'].setValue(this.form.value.departamentoResidenciaValida == 'S' ? true : false)
          this.mostrarDepartamento = true;
          if (data.ciudadResidencia) {
            this.getBarrios(data.ciudadResidencia);
            this.form.controls['ciudadResidenciaValida_bool'].setValue(this.form.value.departamentoResidenciaValida == 'S' ? true : false)
            this.mostrarDepartamento = true;
            this.mostrarCiudad = true;
          } else {
            this.form.controls['ciudadResidenciaValida_bool'].setValue(false);
            this.form.controls['barrioResidenciaValida_bool'].setValue(false);
          }
        } else {
          this.form.controls['departamentoResidenciaValida_bool'].setValue(false);
          this.form.controls['ciudadResidenciaValida_bool'].setValue(false);
          this.form.controls['barrioResidenciaValida_bool'].setValue(false);
          this.mostrarDepartamento = false;
          this.mostrarCiudad = false;
          this.mostrarBarrio=false
          this.mostrarDepartamento = false;
        }
        if (data.departamentoResidenciaCorregido) {
          this.getCiudades(data.departamentoResidenciaCorregido);
          if (data.ciudadResidenciaCorregido) {
            this.getBarrios(data.ciudadResidenciaCorregido);
          }
        }

        if (data.codigoDepartamentoNacimiento) {
          this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
        }


        if (data.destinoCredito) {
          this.form.controls['destinoCredito'].setValue(data.destinoCredito);
        }
        if (data.destinoCreditoCorregido) {
          this.form.controls['destinoCreditoCorregido'].setValue(data.destinoCreditoCorregido);
        }
        if (data.antiguedadNegocio) {
          this.form.controls['antiguedadNegocio'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.antiguedadNegocioCorregido) {
          this.form.controls['antiguedadNegocioCorregido'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.comprasSemento) {
          this.form.controls['comprasSemento'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroAhorradoMensual) {
          this.form.controls['dineroAhorradoMensual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroEfectivoActual) {
          this.form.controls['dineroEfectivoActual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroPorCobrarActual) {
          this.form.controls['dineroPorCobrarActual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroProveedores) {
          this.form.controls['dineroProveedores'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.inventarioActual) {
          this.form.controls['inventarioActual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.pagoEmpleados) {
          this.form.controls['pagoEmpleados'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.pagoEnArriendo) {
          this.form.controls['pagoEnArriendo'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.pagoServicioPublico) {
          this.form.controls['pagoServicioPublico'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.totalActivo) {
          this.form.controls['totalActivo'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.valorTotalCuotasCreditos) {
          this.form.controls['valorTotalCuotasCreditos'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.ventaMensual) {
          this.form.controls['ventaMensual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.ventaMensualCorregido) {
          this.form.controls['ventaMensualCorregido'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        this.form.controls['antiguedadNegocioValida_bool'].setValue(this.form.value.antiguedadNegocioValida == 'N' ? false : true)
        this.form.controls['barrioNegocioValida_bool'].setValue(this.form.value.barrioNegocioValida == 'N' ? false : true)
        // this.form.controls['barrioResidenciaValida_bool'].setValue(this.form.value.barrioResidenciaValida == 'N' ? false : true)
        this.form.controls['camaraComercio_bool'].setValue(this.form.value.camaraComercio == 'N' ? false : true)
        this.form.controls['camaraComercioValida_bool'].setValue(this.form.value.camaraComercioValida == 'N' ? false : true)
        this.form.controls['ciudadNegocioValida_bool'].setValue(this.form.value.ciudadNegocioValida == 'N' ? false : true)
        // this.form.controls['ciudadResidenciaValida_bool'].setValue(this.form.value.ciudadResidenciaValida == 'N' ? false : true)
        this.form.controls['correoElectronicoValida_bool'].setValue(this.form.value.correoElectronicoValida == 'N' ? false : true)
        this.form.controls['departamentoNegocioValida_bool'].setValue(this.form.value.departamentoNegocioValida == 'N' ? false : true)
        this.form.controls['dineroAhorradoMensualValida_bool'].setValue(this.form.value.dineroAhorradoMensualValida == 'N' ? false : true)
        this.form.controls['direccionNegocioValida_bool'].setValue(this.form.value.direccionNegocioValida == 'N' ? false : true)
        this.form.controls['direccionResidenciaValida_bool'].setValue(this.form.value.direccionResidenciaValida == 'N' ? false : true)
        this.form.controls['nitNegocioValida_bool'].setValue(this.form.value.nitNegocioValida == 'N' ? false : true)
        this.form.controls['totalActivoValida_bool'].setValue(this.form.value.totalActivoValida == 'N' ? false : true)
        this.form.controls['ventaMensualValida_bool'].setValue(this.form.value.ventaMensualValida == 'N' ? false : true)
        this.form.controls['numeroFormularioValida_bool'].setValue(this.form.value.numeroFormularioValida == 'N' ? false : true)
        this.form.controls['telefonoContactoValida_bool'].setValue(this.form.value.telefonoContactoValida == 'N' ? false : true)
        this.form.controls['tieneEmpleadoValida_bool'].setValue(this.form.value.tieneEmpleadoValida == 'N' ? false : true)
        this.form.controls['nombreNegocioValida_bool'].setValue(this.form.value.nombreNegocioValida == 'N' ? false : true)
        this.form.controls['destinoCreditoCorregido_bool'].setValue(this.form.value.destinoCreditoValida == 'N' ? false : true)

      });
  }

  public seleccionDepartamento(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudades(codigo);
  }
  /**
   * @description: Departamento de nacimiento
   */
  public seleccionDepartamentoNacimiento(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudadesNacimiento(codigo);
  }
  /**
   * @description: Departamento de negocio
   */
  public seleccionDepartamentoNegocio(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudadesNegocio(codigo);
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
   * @description: Selecciona el codigo para cargar el api barrios
   */
  public seleccionCiudadNegocio(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getBarriosNegocio(codigo);
  }
  /**
   * @description: Obtiene el listado de departamento
   */
  private getDepartamentos(): void {
    this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
  }
  /**
   * @description: Obtiene listado de departamento nacimiento
   */
  private getDepartamentoNacimiento(): void {
    this.departamentosNacimiento$ = this.departamentosCiudadesService.getDepartamentos();
  }
  /**
   * @description:
   */
  private getDepartamentoNegocio(): void {
    this.departamentosNegocio$ = this.departamentosCiudadesService.getDepartamentos();
  }
  /**
   * @description: Obtiene el listado de ciudades
   */
  private getCiudades(codigo: string): void {
    this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
  }
  /**
   * @description: Obtiene listado de ciudades nacimiento
   */
  private getCiudadesNacimiento(codigo: string): void {
    this.ciudadesNacimiento$ = this.departamentosCiudadesService.getCiudades(codigo);
  }
  /**
   * @description: Obtiene listado de ciudades negocio
   */
  private getCiudadesNegocio(codigo: string): void {
    this.ciudadesNegocio$ = this.departamentosCiudadesService.getCiudades(codigo);
  }
  /**
   * @description: Obtiene el listado de barrios
   */
  private getBarrios(codigo: string): void {
    this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
  }
  /**
   * @description: Obtiene el listado de barrios del negocio
   */
  private getBarriosNegocio(codigo: string): void {
    this.barriosNegocio$ = this.departamentosCiudadesService.getBarrios(codigo);
  }
  /**
   * @description: Obtiene los tipos de documentos
   */
  private getTiposDocumentos(): void {
    this.tipoDocumentos$ = this.genericaServices.getTiposDocumentos();
  }
  /**
   * @description: Obtiene los generos
   */
  private getGeneros(): void {
    this.generos$ = this.genericaServices.getGeneros();
  }
  /**
   * @description: Obtiene los tipos de vivienda
   */
  private getTiposVivienda(): void {
    this.tipoVivienda$ = this.genericaServices.getTipoViviendas();
  }
  /**
   * @description: Obtiene el nivel de estudio
   */
  private getNivelEstudio(): void {
    this.nivelEstudio$ = this.genericaServices.getNivelEstudio();
  }
  /**
   * @description: Obtiene listado de vive en negocio
   */
  private getViveNegocio(): void {
    this.viveNegocio$ = this.genericaServices.getViveNegocio();
  }
  /**
   * @description: Obtiene el listado de declarantes
   */
  private getDeclarante(): void {
    this.declarante$ = this.genericaServices.getDeclarante();
  }
  /**
   * @description:
   */
  private getCamaraComercio(): void {
    this.camaraComercio$ = this.genericaServices.getCamaraComercio();
  }
  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getDestinoCredito(): void {
    this.destinoCredito$ = this.genericaServices.getDestinoCredito();
  }

  // onPostDatos() {
  //   Swal.fire({
  //     title: 'Guardar información',
  //     text: '¿Está seguro de guardar información?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#a3a0a0',
  //     confirmButtonText: 'Guardar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Completado',
  //         'Información guardada con éxito',
  //         'success'
  //       );
  //     }
  //   });
  // }

  /**
  * @description:
  */
  public onPostDatos(): void {
    const datos: any = this.form.getRawValue();
    const { ...data } = datos;
    const antiguedadNegocio = Number(this.utility.enviarNumero(this.form.value.antiguedadNegocio));
    const antiguedadNegocioCorregido = Number(this.utility.enviarNumero(this.form.value.antiguedadNegocioCorregido));
    const comprasSemento = Number(this.utility.enviarNumero(this.form.value.comprasSemento));
    const dineroAhorradoMensual = Number(this.utility.enviarNumero(this.form.value.dineroAhorradoMensual));
    const dineroEfectivoActual = Number(this.utility.enviarNumero(this.form.value.dineroEfectivoActual));
    const dineroPorCobrarActual = Number(this.utility.enviarNumero(this.form.value.dineroPorCobrarActual));
    const dineroProveedores = Number(this.utility.enviarNumero(this.form.value.dineroProveedores));
    const inventarioActual = Number(this.utility.enviarNumero(this.form.value.inventarioActual));
    const pagoEmpleados = Number(this.utility.enviarNumero(this.form.value.pagoEmpleados));
    const pagoEnArriendo = Number(this.utility.enviarNumero(this.form.value.pagoEnArriendo));
    const pagoServicioPublico = Number(this.utility.enviarNumero(this.form.value.pagoServicioPublico));
    const totalActivo = Number(this.utility.enviarNumero(this.form.value.totalActivo));
    const unidadNegocio = this.form.value.unidadNegocio;
    const valorTotalCuotasCreditos = Number(this.utility.enviarNumero(this.form.value.valorTotalCuotasCreditos));
    const ventaMensual = Number(this.utility.enviarNumero(this.form.value.ventaMensual));
    const ventaMensualCorregido = Number(this.utility.enviarNumero(this.form.value.ventaMensualCorregido));
    const antiguedadNegocioValida = this.form.value.antiguedadNegocioValida_bool == true ? 'S' : 'N';
    const barrioNegocioValida = this.form.value.barrioNegocioValida_bool == true ? 'S' : 'N';
    const barrioResidenciaValida = this.form.value.barrioResidenciaValida_bool == true ? 'S' : 'N';
    const camaraComercio = this.form.value.camaraComercio_bool == true ? 'S' : 'N';
    const camaraComercioValida = this.form.value.camaraComercioValida_bool == true ? 'S' : 'N';
    const ciudadNegocioValida = this.form.value.ciudadNegocioValida_bool == true ? 'S' : 'N';
    const ciudadResidenciaValida = this.form.value.ciudadResidenciaValida_bool == true ? 'S' : 'N';
    const correoElectronicoValida = this.form.value.correoElectronicoValida_bool == true ? 'S' : 'N';
    const departamentoNegocioValida = this.form.value.departamentoNegocioValida_bool == true ? 'S' : 'N';
    const departamentoResidenciaValida = this.form.value.departamentoResidenciaValida_bool == true ? 'S' : 'N';
    const dineroAhorradoMensualValida = this.form.value.dineroAhorradoMensualValida_bool == true ? 'S' : 'N';
    const direccionNegocioValida = this.form.value.direccionNegocioValida_bool == true ? 'S' : 'N';
    const direccionResidenciaValida = this.form.value.direccionResidenciaValida_bool == true ? 'S' : 'N';
    const nitNegocioValida = this.form.value.nitNegocioValida_bool == true ? 'S' : 'N';
    const totalActivoValida = this.form.value.totalActivoValida_bool == true ? 'S' : 'N';
    const ventaMensualValida = this.form.value.ventaMensualValida_bool == true ? 'S' : 'N';
    const numeroFormularioValida = this.form.value.numeroFormularioValida_bool == true ? 'S' : 'N';
    const telefonoContactoValida = this.form.value.telefonoContactoValida_bool == true ? 'S' : 'N';
    const tieneEmpleadoValida = this.form.value.tieneEmpleadoValida_bool == true ? 'S' : 'N';
    const nombreNegocioValida = this.form.value.nombreNegocioValida_bool == true ? 'S' : 'N';
    // const referenciaValidada = this.form.value.referenciaValidada_bool;
    // debugger;
    delete data.antiguedadNegocio;
    delete data.antiguedadNegocioCorregido;
    delete data.comprasSemento;
    delete data.dineroAhorradoMensual;
    delete data.dineroEfectivoActual;
    delete data.dineroPorCobrarActual;
    delete data.dineroProveedores;
    delete data.inventarioActual;
    delete data.numeroSolicitud;
    delete data.pagoEmpleados;
    delete data.pagoEnArriendo;
    delete data.pagoServicioPublico;
    delete data.totalActivo;
    // delete data.unidadNegocio;
    delete data.valorTotalCuotasCreditos;
    delete data.ventaMensual;
    delete data.ventaMensualCorregido;
    delete data.numeroSolicitud;
    delete data.antiguedadNegocioValida_bool;
    delete data.barrioNegocioValida_bool;
    delete data.barrioResidenciaValida_bool;
    delete data.camaraComercio_bool;
    delete data.camaraComercioValida_bool;
    delete data.ciudadNegocioValida_bool;
    delete data.ciudadResidenciaValida_bool;
    delete data.correoElectronicoValida_bool;
    delete data.departamentoNegocioValida_bool;
    delete data.departamentoResidenciaValida_bool;
    delete data.dineroAhorradoMensualValida_bool;
    delete data.direccionNegocioValida_bool;
    delete data.direccionResidenciaValida_bool;
    delete data.nitNegocioValida_bool;
    delete data.totalActivoValida_bool;
    delete data.ventaMensualValida_bool;
    delete data.numeroFormularioValida_bool;
    delete data.telefonoContactoValida_bool;
    delete data.tieneEmpleadoValida_bool;
    delete data.nombreNegocioValida_bool;
    delete data.referenciaValidada_bool;
    delete data.antiguedadNegocioValida;
    delete data.barrioNegocioValida;
    delete data.barrioResidenciaValida;
    delete data.camaraComercio;
    delete data.camaraComercioValida;
    delete data.ciudadNegocioValida;
    delete data.ciudadResidenciaValida;
    delete data.correoElectronicoValida;
    delete data.departamentoNegocioValida;
    delete data.departamentoResidenciaValida;
    delete data.dineroAhorradoMensualValida;
    delete data.direccionNegocioValida;
    delete data.direccionResidenciaValida;
    delete data.nitNegocioValida;
    delete data.totalActivoValida;
    delete data.ventaMensualValida;
    delete data.numeroFormularioValida;
    delete data.telefonoContactoValida;
    delete data.tieneEmpleadoValida;
    delete data.nombreNegocioValida;
    const datosFormularios: any = {
      numeroSolicitud: this.numeroSolicitud.toString(),
      antiguedadNegocio: antiguedadNegocio,
      antiguedadNegocioCorregido: antiguedadNegocioCorregido,
      comprasSemento: comprasSemento,
      dineroAhorradoMensual: dineroAhorradoMensual,
      dineroEfectivoActual: dineroEfectivoActual,
      dineroPorCobrarActual: dineroPorCobrarActual,
      dineroProveedores: dineroProveedores,
      inventarioActual: inventarioActual,
      pagoEmpleados: pagoEmpleados,
      pagoEnArriendo: pagoEnArriendo,
      pagoServicioPublico: pagoServicioPublico,
      totalActivo: totalActivo,
      // unidadNegocio: unidadNegoci}
      valorTotalCuotasCreditos: valorTotalCuotasCreditos,
      ventaMensual: ventaMensual,
      ventaMensualCorregido: ventaMensualCorregido,
      antiguedadNegocioValida: antiguedadNegocioValida,
      barrioNegocioValida: barrioNegocioValida,
      barrioResidenciaValida: barrioResidenciaValida,
      camaraComercio: camaraComercio,
      camaraComercioValida: camaraComercioValida,
      ciudadNegocioValida: ciudadNegocioValida,
      ciudadResidenciaValida: ciudadResidenciaValida,
      correoElectronicoValida: correoElectronicoValida,
      departamentoNegocioValida: departamentoNegocioValida,
      departamentoResidenciaValida: departamentoResidenciaValida,
      dineroAhorradoMensualValida: dineroAhorradoMensualValida,
      direccionNegocioValida: direccionNegocioValida,
      direccionResidenciaValida: direccionResidenciaValida,
      nitNegocioValida: nitNegocioValida,
      totalActivoValida: totalActivoValida,
      ventaMensualValida: ventaMensualValida,
      numeroFormularioValida: numeroFormularioValida,
      telefonoContactoValida: telefonoContactoValida,
      tieneEmpleadoValida: tieneEmpleadoValida,
      nombreNegocioValida: nombreNegocioValida,
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
        this.postFormularioFabrica(datosFormularios);
        console.log(this.form.getRawValue());
        console.log(datosFormularios);
      }
    });

  }

  /**
 * @description: Guardado de datos fabrica
 */
  private postFormularioFabrica(datos: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.subscription$ = this.fabricaCreditoService.postDatosFabricaCreditoReferenciacion(datos)
      .subscribe(() => {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
        ).then((result) => {
          if (result) {
            this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
          }
        })
        setTimeout(() => {
          this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
        }, 1000);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.msg,
        });
      });
  }

  // opciones de oficerta

  private getListadoOferta(numeroSolicitud: number): void {
    this.listadoOferta$ = this.ofertaService.getListadoOferta(numeroSolicitud);
  }
  private getCapacidadPago(numeroSolicitud: number): void {
    this.capacidadPago$ = this.ofertaService.getCapacidadPago(numeroSolicitud);
  }
  public SelectOferta(item: any): void {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      identificacion: item.identificacion,
      idRegistro: item.idOpcion
    }

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.ofertaService
      .SelectOferta(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.getListadoOferta(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }
  public recalcularOferta(): void {
    let data = {
      valorSolicitado: Number(this.utility.enviarNumero(this.formOferta.value.valorSolicitado)),
      plazo: Number(this.utility.enviarNumero(this.formOferta.value.plazo)),
      salarioBasico: Number(this.utility.enviarNumero(this.formOferta.value.salarioBasico)),
      otrosIngresos: Number(this.utility.enviarNumero(this.formOferta.value.otrosIngresos)),
      comisionesHorasExtras: Number(this.utility.enviarNumero(this.formOferta.value.comisionesHorasExtras)),
      descuentoNomina: Number(this.utility.enviarNumero(this.formOferta.value.descuentoNomina)),
      numeroSolicitud: Number(this.numeroSolicitud),
    }

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.ofertaService
      .recalcularOferta(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.getListadoOferta(Number(this.numeroSolicitud));
          this.getCapacidadPago(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }


  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  private getTodosFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        this.datosCompletoSolicitud = data;
        this.llenarDatosFormOferta(data);
      });
  }

  private llenarDatosFormOferta(data) {
    if (data.valorSolicitado) {
      this.formOferta.controls['valorSolicitado'].setValue(this.utility.formatearNumero(String(data.valorSolicitado)));
    }
    if (data.plazo) {
      this.formOferta.controls['plazo'].setValue(this.utility.formatearNumero(String(data.plazo)));
    }
    if (data.salarioBasico) {
      this.formOferta.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(data.salarioBasico)));
    }
    if (data.otrosIngresos) {
      this.formOferta.controls['otrosIngresos'].setValue(this.utility.formatearNumero(String(data.otrosIngresos)));
    }
    if (data.comisionesHorasExtras) {
      this.formOferta.controls['comisionesHorasExtras'].setValue(this.utility.formatearNumero(String(data.comisionesHorasExtras)));
    }
    if (data.descuentoNomina) {
      this.formOferta.controls['descuentoNomina'].setValue(this.utility.formatearNumero(String(data.descuentoNomina)));
    }
  }
}
