import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { FormularioCreditoMicro } from 'app/core/interfaces/formulario-fabrica-credito.interface';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { UtilityService } from 'app/resources/services/utility.service';
import moment from 'moment';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';

@Component({
    selector: 'form-gestion-fabrica-fabrica-micro',
    templateUrl: './form-gestion-fabrica-fabrica-micro.component.html',
    styleUrls: ['./form-gestion-fabrica-fabrica-micro.component.scss']
})
export class FormGestionFabricaFabricaMicroComponent implements OnInit, OnDestroy {
    //variables iniciales
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    //cancelar subsicripciones
    public unSubscribe$: Subject<any> = new Subject<any>();
    public form: FormGroup;
    public subscription$: Subscription;
    public salarioBasico: number;
    public fabricaDatos;
    public unidadNegocio: any;
    public permisoEditar: boolean = false;
    public dataInicial: any
    public ciudades$: Observable<any>;
    public ciudadesNacimiento$: Observable<any>;
    public ciudadesNegocio$: Observable<any>;
    public barrios$: Observable<any>;
    public barriosNegocio$: Observable<any>;
    public ciudadesExpedicion$: Observable<any>;

    constructor(
        private fabricaCreditoService: FabricaCreditoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        public utility: UtilityService,
        public _permisosService: PermisosService,
        private _formularioCreditoService: FormularioCreditoService,
    ) {
        this.cargueInicial();
        this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
    }

    ngOnInit(): void {
        this.createFormulario();
        this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()
        if (this.permisoEditar) {
            this.form.disable();
        }
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
     * @description:
     */
    public onPostDatos(): void {
        const datos: FormularioCreditoMicro = this.form.getRawValue();
        const { numeroHijos, barrioResidencia, antiguedadActividad, valorSolicitado, plazo, personasACargo, fechaNacimiento, fechaExpedicion, fechaDesvinculacionPublico, fechaDesvinculacionExpuesta, estrato, ...data } = datos;
        const fechaNacimientoFormato = moment(fechaNacimiento.toString()).format('YYYY-MM-DD');
        const fechaExpedicionFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
        const fechaDesvinculacionPublicoFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
        const fechaDesvinculacionExpuestaFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
        const numeroHijosFormato = Number(numeroHijos);
        const barrioResidenciaFormato = Number(barrioResidencia);
        const antiguedadActividadFormato = Number(antiguedadActividad);
        const personasACargoFormato = Number(personasACargo);
        const estratoFormato = Number(estrato)
        const valorSolicitadoFormato = Number(valorSolicitado)
        const plazoFormato = Number(plazo);
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
            estrato: estratoFormato,
            valorSolicitado: valorSolicitadoFormato,
            plazo: plazoFormato,
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


        this.fabricaCreditoService.getInformacionTipoTercero(numeroSolicitud, 'T').pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                Swal.close();
                this.form.patchValue(data);

                if (data.codigoDepartamento) {
                    this.getCiudades(data.codigoDepartamento);
                }
                if (data.codigoDepartamentoNacimiento) {
                    this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
                }
                if (data.codigoDepartamentoNegocio) {
                    this.getCiudadesNegocio(data.codigoDepartamentoNegocio);
                }
                if (data.codigoCiudad) {
                    this.getBarrios(data.codigoCiudad);
                }
                if (data.codigoCiudadNegocio) {
                    this.getBarriosNegocio(data.codigoCiudadNegocio);
                }
            });

        const datosSolicitud: any = {
            numeroSolicitud: numeroSolicitud,
            identificacion: identificacion
        }
        this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                Swal.close();
                // este dato no llega de la anterior api endpoint


                this.form.patchValue({
                    descripcionTipo: data.descripcionTipo,
                    codigoBarrio: data.codigoBarrio
                });
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data.fabricaDatos;
            });
    }

    /**
     * @description: Departamento de nacimiento
     */
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
     * @description :creando el formulario
     */
    private createFormulario(): void {
        this.form = this.fb.group({
            numeroSolicitud: [''],
            tipo: [''],
            creditoTitularLineas: [''],
            fechaIngresoFabrica: [''],
            emision: [''],
            tipoDocumento: [''],
            identificacion: [''],
            nombreCompleto: [''],
            celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            tipoCredito: [''],
            primerNombre: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
            descripcionEstado: [''],
            descripcionSubestado: [''],
            segundoNombre: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
            primerApellido: [''],
            segundoApellido: [''],
            estadoCivil: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            genero: ['', [Validators.required]],
            nacionalidad: ['', [Validators.required]],
            fechaNacimiento: [''],
            nivelEstudio: ['', [Validators.required]],
            numeroHijos: ['', [Validators.required, Validators.minLength(0)]],
            personasACargo: ['', [Validators.required, Validators.minLength(0)]],
            fechaExpedicion: ['', [Validators.required]],
            codigoDepartamentoExpedicion: ['', Validators.required],
            codigoCiudadExpedicion: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
            codigoDepartamento: ['', [Validators.required]],
            codigoCiudad: [''],
            barrioResidencia: ['', Validators.required],
            direccionResidencial: ['', [Validators.required]],
            direccionTipoVia: ['', [Validators.required]],
            direccionViaPrincipal: ['', [Validators.required]],
            direccionNumeroVia: ['', [Validators.required]],
            direccionDistanciaVia: ['', [Validators.required]],
            direccionComplemento: [''],
            tipoVivienda: ['', Validators.required],
            annosTiempoResidencia: [''],
            mesesTiempoResidencia: [''],
            tipoActividad: [''],
            actividadEconomica: ['', Validators.required],
            actividadEspecifica: ['', Validators.required],
            antiguedadActividad: [''],
            antiguedadNegocio: [''],
            camaraComercio: ['', [Validators.required]],
            tieneRut: [''],
            nitNegocio: [''],
            nombreNegocio: [''],
            codigoDepartamentoNegocio: ['', [Validators.required]],
            codigoCiudadNegocio: ['', Validators.required],
            codigoBarrioNegocio: ['', Validators.required],
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
            plazo: ['', [Validators.required, Validators.minLength(0)]],
            descripcionTipo: [''],
            titularMicro: [''],
            aplicaCodeudor: [''],
            valorSolicitadoWeb: [''],
            creditoCodeudorLineas: [''],
            modificadaSolicitud: [''],
            valorSolicitado: ['', [Validators.required, Validators.minLength(0)]],
            destinoCredito: ['', [Validators.required]],
            codeudorMicro: [''],
            codigoBarrio: ['', [Validators.required]],
            datosCargoPublico: [''],
            entidad: [''],
            vinculadoActualmente: [''],
            fechaDesvinculacion: ['']
        });
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
    }


}
