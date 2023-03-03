import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioCreditoMicro } from 'app/core/interfaces/formulario-fabrica-credito.interface';
import { AgendaCompletacionService } from 'app/core/services/agenda-completacion.service';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { DirectionsComponent } from 'app/shared/modal/directions/directions.component';
import moment from 'moment';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogDecisionComponent } from '../../form-dialog-decision/form-dialog-decision.component';
import { FormDialogoChecklistComponent } from '../../form-dialogo-checklist/form-dialogo-checklist.component';
import { GridDocumentacionComponent } from '../../grid-documentacion/grid-documentacion.component';

@Component({
  selector: 'form-gestion-fabrica-fabrica-micro',
  templateUrl: './form-gestion-fabrica-fabrica-micro.component.html',
  styleUrls: ['./form-gestion-fabrica-fabrica-micro.component.scss']
})
export class FormGestionFabricaFabricaMicroComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<any> = new Subject<any>();
  public departamentos$: Observable<any>;
  public departamentosNacimiento$: Observable<any>;
  public departamentosExpedicion$: Observable<any>;
  public departamentosNegocio$: Observable<any>;
  public ciudades$: Observable<any>;
  public ciudadesNacimiento$: Observable<any>;
  public ciudadesNegocio$: Observable<any>;
  public barrios$: Observable<any>;
  public barriosNegocio$: Observable<any>;
  public tipoDocumentos$: Observable<any>;
  public generos$: Observable<any>;
  public tipoVivienda$: Observable<any>;
  public nivelEstudio$: Observable<any>;
  public viveNegocio$: Observable<any>;
  public declarante$: Observable<any>;
  public camaraComercio$: Observable<any>;
  public form: FormGroup;
  public subscription$: Subscription;
  public verComentarios: boolean = false;
  public verCentrales: boolean = false;
  public verDevoluciones: boolean = false;
  public minimizarComentarios: boolean = false;
  public minimizarDevoluciones: boolean = false;
  public minimizarCentrales: boolean = false;
  public esVerComentarios: boolean = false;
  public tipoDocumento: string = '';
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public estado: string = '';
  public agenda_fabrica: string = '';
  public redeonlyForm: any;
  public animacionVer: boolean = true;
  public dialog_a_mostrar: string = '';
  public tipoEstadoCivil$: Observable<any>;
  public tipoCredito$: Observable<any>;
  public tipoContrato$: Observable<any>;
  public tipoCuentaBancaria$: Observable<any>;
  public tipoPagaduria$: Observable<any>;
  public destinoCredito$: Observable<any>;
  public estrato$: Observable<any>;
  public ciudadesExpedicion$: Observable<any>;
  public pagaduria$: Observable<any>;
  public entidadBancaria$: Observable<any>;
  public aplicaIngresos$: Observable<any>;
  public tipoVia$: Observable<any>;
  public tipoViaNegocio$: Observable<any>;
  public salarioBasico: number;
  public fabricaDatos;
  unidadNegocio: any;
  public permisoEditar: boolean = false;
  constructor(
    private agendaCompletacionService: AgendaCompletacionService,
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private departamentosCiudadesService: DepartamentosCiudadesService,
    private router: Router,
    private genericaServices: GenericasService,
    private _dialog: MatDialog,
    public utility: UtilityService,
    public _permisosService: PermisosService

  ) {
    if (!this.numeroSolicitud) {
      return;
    } else {
      this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
    }
  }

  ngOnInit(): void {
    this.createFormulario();
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
    this.listenFormulario();
    this.getTiposEstadosCivil();
    this.getTipoCredito();
    this.getTipoContrato();
    this.getDestinoCredito();
    this.getEstrato();
    this.getDepartamentoExpedicion();
    this.getAplicaIngresos();
    this.getTipoCuentaBancaria();
    this.getEntidadBancaria();
    this.getPagaduria()
    this.getSalarioBasico()
    this.getTipoVia();
    this.gettipoViaNegocio();
    this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()
    if (this.permisoEditar) {
      this.form.disable();
    }
  }


  // private cargueInicial() {
  //   let data = {
  //     entidad: "CONFIG-MICRO",
  //     unidadNegocio: 1
  //   };
  //   this._formularioCreditoService.cargueInicial(data).subscribe((resp: any) => {
  //     if (resp) {
  //       this.dataInicial = resp.data
  //     }
  //   })
  // }




  /**
   * @description:
   */
  private getTipoVia(): void {
    this.tipoVia$ = this.genericaServices.getTipoVia();
  }
  /**
* @description:
*/
  private gettipoViaNegocio(): void {
    this.tipoViaNegocio$ = this.genericaServices.getTipoVia();
  }





  /**
   * @description:
   */
  public onPostDatos(): void {
    const datos: FormularioCreditoMicro = this.form.getRawValue();
    const { numeroHijos, barrioResidencia, antiguedadActividad, personasACargo, fechaNacimiento, fechaExpedicion, fechaDesvinculacionPublico, fechaDesvinculacionExpuesta, ...data } = datos;
    const fechaNacimientoFormato = moment(fechaNacimiento.toString()).format('YYYY-MM-DD');
    const fechaExpedicionFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
    const fechaDesvinculacionPublicoFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
    const fechaDesvinculacionExpuestaFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
    const numeroHijosFormato = Number(numeroHijos);
    const barrioResidenciaFormato = Number(barrioResidencia);
    const antiguedadActividadFormato = Number(antiguedadActividad);
    const personasACargoFormato = Number(personasACargo);
    // delete data.otrosIngresos;
    const datosFormularios: FormularioCreditoMicro = {
      fechaNacimiento: fechaNacimientoFormato,
      fechaExpedicion: fechaExpedicionFormato,
      fechaDesvinculacionPublico: fechaDesvinculacionPublicoFormato,
      fechaDesvinculacionExpuesta: fechaDesvinculacionExpuestaFormato,
      numeroHijos: numeroHijosFormato,
      barrioResidencia: barrioResidenciaFormato,
      antiguedadActividad: antiguedadActividadFormato,
      personasACargo: personasACargoFormato,
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
      }
    });
  }

  /**
   * @description: Obtiene la data para cargar al formulario
   */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        // console.log(data);
        this.form.patchValue(data);
        this.agenda_fabrica = data.agenda;
        this.unidadNegocio = data.unidadNegocio;
        this.fabricaDatos = data;
        this.dialog_a_mostrar = ((data.cantidadCheckList != data.totalCheckList) ? 'CHECKLIST' : 'SIGUIENTE');
        if (data.tipoDocumento === 'NIT') {
          const digitoVerificacion: string = this.calcularDigitoVerificacion(data.identificacion);
          const diitoString: string = digitoVerificacion.toString();
          this.form.controls.digitoVerificacion.setValue(diitoString);
        }
        if (data.codigoDepartamento) {
          this.getCiudades(data.codigoDepartamento);
        }
        if (data.codigoDepartamentoNacimiento) {
          this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
        }
        if (data.codigoDepartamentoNegocio) {
          this.getCiudadesNegocio(data.codigoDepartamentoNegocio);
        }
        if (data.codigoDepartamentoExpedicion) {
          this.getCiudadesExpedicion(data.codigoDepartamentoExpedicion);
        }
        if (data.codigoCiudad) {
          this.getBarrios(data.codigoCiudad);
        }
        if (data.codigoCiudadNegocio) {
          this.getBarriosNegocio(data.codigoCiudadNegocio);
        }
        if (data.comprasSemanales) {
          this.form.controls['comprasSemanales'].setValue(this.utility.formatearNumero(String(this.form.value.comprasSemanales)));
        }
        if (data.otrosIngresos) {
          this.form.controls['otrosIngresos'].setValue(this.utility.formatearNumero(String(this.form.value.otrosIngresos)));
        }
        if (data.ingresos) {
          this.form.controls['ingresos'].setValue(this.utility.formatearNumero(String(this.form.value.ingresos)));
        }
        if (data.ventasMensuales) {
          this.form.controls['ventasMensuales'].setValue(this.utility.formatearNumero(String(this.form.value.ventasMensuales)));
        }
        if (data.activos) {
          this.form.controls['activos'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.cupoTotal) {
          this.form.controls['cupoTotal'].setValue(this.utility.formatearNumero(String(this.form.value.cupoTotal)));
        }
        if (data.cupoReservado) {
          this.form.controls['cupoReservado'].setValue(this.utility.formatearNumero(String(this.form.value.cupoReservado)));
        }
        if (data.cupoDisponible) {
          this.form.controls['cupoDisponible'].setValue(this.utility.formatearNumero(String(this.form.value.cupoDisponible)));
        }
        if (data.salarioBasico) {
          this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.form.value.salarioBasico)));
        }
        if (data.descuentoNomina) {
          this.form.controls['descuentoNomina'].setValue(this.utility.formatearNumero(String(this.form.value.descuentoNomina)));
        }
        if (data.valorSolicitado) {
          this.form.controls['valorSolicitado'].setValue(this.utility.formatearNumero(String(this.form.value.valorSolicitado)));
        }
        if (data.valorSolicitado) {
          this.form.controls['valorSolicitadoWeb'].setValue(this.utility.formatearNumero(String(this.form.value.valorSolicitadoWeb)));
        }
        // this.form.controls['aplicaEmbargo'].setValue(this.form.value.aplicaEmbargo=='N'?'No aplica':'Si aplica')
        // form.value.valorSolicitado
        if (data.comisionesHorasExtras) {
          this.form.controls['comisionesHorasExtras'].setValue(this.utility.formatearNumero(String(this.form.value.comisionesHorasExtras)));
        }
        if (data.cupoDisponible) {
          this.form.controls['cupoDisponible'].setValue(this.utility.formatearNumero(String(this.form.value.cupoDisponible)));
        }
        //envian en int y el select es string
        if (data.estrato) {
          this.form.controls['estrato'].setValue(this.form.value.estrato.toString());
        }

        //envian en int y el select es string
        if (data.tipoContrato) {
          this.form.controls['tipoContrato'].setValue(this.form.value.tipoContrato.toString());
        }
        //envian en int y el select es string
        if (data.tipoCuentaBancaria) {
          this.form.controls['tipoCuentaBancaria'].setValue(this.form.value.tipoCuentaBancaria.toString());
        }
        //envian en int y el select es string
        if (data.entidadBancaria) {
          this.form.controls['entidadBancaria'].setValue(this.form.value.entidadBancaria.toString());
        }
        //envian en int y el select es string
        if (data.pagaduria) {
          this.form.controls['pagaduria'].setValue(this.form.value.pagaduria.toString());
        }

        this.tipoDocumento = data.tipoDocumento;
        const datosDocumentos: any = {
          numeroSolicitud: datosSolicitud.numeroSolicitud,
          tipoDocumento: this.tipoDocumento
        };
        this.fabricaCreditoService.seleccionDatos.next({ data: datosDocumentos });
        this.estado = data.descripcionEstado;
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
* @description: Departamento de expedicion
*/
  public seleccionDepartamentoExpedicion(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudadesExpedicion(codigo);
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
* @description:
*/
  private getDepartamentoExpedicion(): void {
    this.departamentosExpedicion$ = this.departamentosCiudadesService.getDepartamentos();
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
* @description: Obtiene listado de ciudades negocio
*/
  private getCiudadesExpedicion(codigo: string): void {
    this.ciudadesExpedicion$ = this.departamentosCiudadesService.getCiudades(codigo);
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
 * @description: Obtiene los tipos de estados civiles
 */
  private getTiposEstadosCivil(): void {
    this.tipoEstadoCivil$ = this.genericaServices.getTipoEstadoCivil();
  }

  /**
   * @description: Obtiene los tipos de estados civiles
   */
  private getTipoCuentaBancaria(): void {
    this.tipoCuentaBancaria$ = this.genericaServices.getTipoCuentaBancaria();
  }
  /**
  * @description: Obtiene los tipos de estados civiles
  */
  private getTipoCredito(): void {
    this.tipoCredito$ = this.genericaServices.getTipoCredito();
  }
  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getDestinoCredito(): void {
    this.destinoCredito$ = this.genericaServices.getDestinoCredito();
  }
  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getEstrato(): void {
    this.estrato$ = this.genericaServices.getestrato();
  }
  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getPagaduria(): void {
    this.pagaduria$ = this.genericaServices.getPagadurias();
  }
  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getTipoContrato(): void {
    this.tipoContrato$ = this.genericaServices.getTipoContrato();
  }
  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getEntidadBancaria(): void {
    this.entidadBancaria$ = this.genericaServices.getEntidadBancaria();
  }
  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getAplicaIngresos(): void {
    this.aplicaIngresos$ = this.genericaServices.getAplicaIngresos();
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
   * @description: Guardado de datos fabrica
   */
  private postFormularioFabrica(datos: FormularioCreditoMicro): void {
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

  /**
   * @description: Calcula el digito de verificacion
   */
  private calcularDigitoVerificacion(data): string {
    let vpri; let x; let y; let z;

    // Se limpia el Nit
    data = data.replace(/\s/g, ''); // Espacios
    data = data.replace(/,/g, ''); // Comas
    data = data.replace(/\./g, ''); // Puntos
    data = data.replace(/-/g, ''); // Guiones

    // Se valida el nit
    if (isNaN(data)) {
      // console.log('El nit/cédula \'' + data + '\' no es válido(a).');
      return '';
    };

    // Procedimiento
    vpri = new Array(16);
    z = data.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;
    for (let i = 0; i < z; i++) {
      y = (data.substr(i, 1));
      // console.log ( y + "x" + vpri[z-i] + ":" ) ;

      x += (y * vpri[z - i]);
      // console.log ( x ) ;
    }

    y = x % 11;
    // console.log ( y ) ;

    return (y > 1) ? 11 - y : y;
  }

  /**
   * @description :creando el formulario
   */
  private createFormulario(): void {
    this.form = this.fb.group({
      numeroSolicitud: [''],
      tipo: [''],
      tipoDocumento: [''],
      identificacion: [''],
      nombreCompleto: [''],
      celular: [''],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      estadoCivil: [''],
      email: [''],
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
      codigoDepartamento: [''],
      codigoCiudad: [''],
      barrioResidencia: [''],
      direccionResidencial: [''],
      direccionTipoVia: [''],
      direccionViaPrincipal: [''],
      direccionNumeroVia: [''],
      direccionDistanciaVia: [''],
      direccionComplemento: [''],
      tipoVivienda: [''],
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
      legalCargoPublico: [''],
      cargoPublico: [''],
      entidadPublico: [''],
      vinculadoActualPublico: [''],
      fechaDesvinculacionPublico: [''],
      legalPersonalExpuesta: [''],
      vinculacionExpuesta: [''],
      nombreExpuesta: [''],
      tipoIdentificacionExpuesta: [''],
      identificacionExpuesta: [''],
      nacionalidadExpuesta: [''],
      entidadExpuesta: [''],
      cargoExpuesta: [''],
      vinculadoActualExpuesta: [''],
      fechaDesvinculacionExpuesta: [''],
      legalDesarrollaActividadApnfd: [''],
      legalCargoPartidoPolitico: [''],
      legalOperacionCriptomoneda: [''],
      tipoOperacionCriptomoneda: [''],
      legalOperacionExtranjera: [''],
      tipoOperacionExtranjera: [''],
      declaroIngresoDeclaracionAuto: [''],
      otroIngresoDeclaracionAuto: [''],
      autoricacionDatosPersonalClaracionAuto: [''],
      clausulaAnticurrupcionClaracionAuto: [''],
      plazo: [''],
      modificadaSolicitud: [''],
      valorSolicitado: [''],
      destinoCredito: [''],
    });
  }

  /**
   * @description: Escucha los cambios del formulario
   */
  public listenFormulario(): void {
    this.form.controls.tipoDocumento.valueChanges.subscribe((tipo) => {
      if (tipo === 'NIT') {
        this.form.controls.primerNombre.setValidators(Validators.nullValidator);
        this.form.controls.primerApellido.setValidators(Validators.nullValidator);
      }
    });
  }


  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getSalarioBasico(): void {
    this.genericaServices.getSalarioBasico().subscribe(({ data }) => {
      this.salarioBasico = Number(data.salarioMinimo)
    })
  }




  /**
   * @description: Valida que el campo solo sea numeros
   */
  public soloNumero(field: string) {
    return this.form.controls[field].hasError('pattern');
  }

  /**
   * @description: Valida que el campo solo sea numeros
   */
  public irAtras() {
    switch (this.agenda_fabrica) {
      case 'CO':
        this.redireccionar('agenda-completion');
        break;
      case 'RE':
        this.redireccionar('agenda-referencing');
        break;
      default:
        this.redireccionar('agenda-comercial');
        break;
    }
  }

  /**
   * @description: Redireciona a la grid de cada agenda
   */
  private redireccionar(data: any) {
    this.router.navigate(['/credit-factory/' + data]);
  }


  public validacion(tipo: string) {
    if (this.form.controls['aplicaIngresos'].value == 'N') {
      this.form.controls['otrosIngresos'].setValue("0");
      this.form.controls['ingresos'].setValue("0");
      this.form.controls['descripcionOtrosIngresos'].setValue("");
    }
    let mensaje = "¿Estás seguro de editar el campo de "
    switch (tipo) {
      case 'S':
        mensaje += ' <b> salario</b>';
        break;
      case 'D':
        mensaje += '<b> descuento de nómina</b>';
        break;
      case 'C':
        mensaje += ' <b> comisiones por horas extras</b>';
        break;
      case 'AI':
        mensaje += ' <b> ingresos adicionales</b>';
        break;
      case 'IA':
        mensaje += ' <b> valor de los ingresos adicionales</b>';
        break;
      case 'PL':
        mensaje += ' <b> plazo del crédito</b>';
        break;
      case 'MO':
        mensaje += ' <b> valor del monto solicitado</b>';
        break;
      case 'PA':
        mensaje += ' <b> empresa en la que trabaja</b>';
        break;
      case 'TC':
        mensaje += ' <b> tipo de contrato</b>';
        break;
      case 'FV':
        mensaje += ' <b> fecha de vinculación</b>';
        break;
      case 'GEN':
        mensaje += ' <b> género </b>';
        break;
      case 'FEN':
        mensaje += ' <b> fecha de nacimiento</b>';
        break;
      default:
        break;
    }

    if ((tipo == 'PA') || (tipo == 'TC') || (tipo == 'FV') || (tipo == 'GEN') || (tipo == 'FEN')) {
      mensaje += "?, Este campo modifica el motor de decisión y políticas SARC.";
    } else {
      mensaje += "?, Este campo actualiza la capacidad de pago del cliente.";
    }
    if (tipo != 'AI' && tipo != 'IA') {
      Swal.fire({
        title: 'Guardar información',
        html: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#a3a0a0',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          let salarioBasicoForm = Number(this.utility.enviarNumero(this.form.value.salarioBasico));
          if (this.salarioBasico > salarioBasicoForm) {
            Swal.fire({
              icon: 'warning',
              title: 'Validación de campo',
              text: "El salario ingresado no puede ser menor al SLMV.",
            });
            this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico)));
            return
          }
          let sum =
            Number(this.utility.enviarNumero(this.form.value.salarioBasico))
            +
            // Number(this.utility.enviarNumero(this.form.value.descuentoNomina))
            // +
            Number(this.utility.enviarNumero(this.form.value.comisionesHorasExtras))
            +
            Number(this.utility.enviarNumero(this.form.value.otrosIngresos))
            ;
          this.form.controls['ingresos'].setValue(this.utility.formatearNumero(String(sum)));

        } else {
          switch (tipo) {
            case 'S':
              this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico)));
              break;
            case 'D':
              this.form.controls['descuentoNomina'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.descuentoNomina)));
              break;
            case 'C':
              this.form.controls['comisionesHorasExtras'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.comisionesHorasExtras)));
              break;
            case 'AI':
              this.form.controls['aplicaIngresos'].setValue(this.fabricaDatos.aplicaIngresos);
              break;
            case 'IA':
              this.form.controls['otrosIngresos'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.otrosIngresos)));
              break;
            case 'PL':
              this.form.controls['plazo'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.plazo)));
              break;
            case 'MO':
              this.form.controls['monto'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.monto)));
              break;
            case 'PA':
              this.form.controls['pagaduria'].setValue(String(this.fabricaDatos.pagaduria));
              break;
            case 'TC':
              this.form.controls['tipoContrato'].setValue(String(this.fabricaDatos.tipoContrato));
              break;
            case 'FV':
              this.form.controls['fechaVinculacion'].setValue(String(this.fabricaDatos.fechaVinculacion));
              break;
            case 'GEN':
              this.form.controls['genero'].setValue(String(this.fabricaDatos.genero));
              break;
            case 'FEN':
              this.form.controls['fechaNacimiento'].setValue(String(this.fabricaDatos.fechaNacimiento));
              break;
            default:
              break;
          }
        }
      });
    }

    let sum =
      Number(this.utility.enviarNumero(this.form.value.salarioBasico))
      +
      // Number(this.utility.enviarNumero(this.form.value.descuentoNomina))
      // +
      Number(this.utility.enviarNumero(this.form.value.comisionesHorasExtras))
      +
      Number(this.utility.enviarNumero(this.form.value.otrosIngresos))
      ;
    this.form.controls['ingresos'].setValue(this.utility.formatearNumero(String(sum)));

  }


  get primerNombre(): ValidatorFn {
    return this.form.controls.primerNombre.errors?.required ||
      (this.form.controls.primerNombre.dirty ||
        this.form.controls.primerNombre.touched);
  }
  get primerApellido(): ValidatorFn {
    return this.form.controls.primerApellido.errors?.required ||
      (this.form.controls.primerApellido.dirty ||
        this.form.controls.primerApellido.touched);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
    // this.agendaCompletacionService.resetSeleccionAgenda();
  }


}
