import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
import { FuseValidators } from '@fuse/validators';

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
    public dataGeneralIncial: any;
    public permisoEditar: boolean = false;
    public dataInicial: any
    public ciudades$: Observable<any>;
    public ciudadesNacimiento$: Observable<any>;
    public ciudadesNegocio$: Observable<any>;
    public barrios$: Observable<any>;
    public barriosNegocio$: Observable<any>;
    public ciudadesExpedicion$: Observable<any>;
    public actividadEconomica: any;
    fechaActual: any = moment().locale("co");

    constructor(
        private fabricaCreditoService: FabricaCreditoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        public utility: UtilityService,
        public _permisosService: PermisosService,
        private _formularioCreditoService: FormularioCreditoService,
    ) {
        this.createFormulario();

    }

    ngOnInit(): void {
        this.cargueInicial();
        this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
        this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()
        if (this.permisoEditar) {
            this.form.disable();
        }
        this.addValidation()
    }

    private cargueInicial() {
        let data = {
            entidad: "CONFIG-MICRO",
            unidadNegocio: 1
        };
        this._formularioCreditoService.cargueInicial(data).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data
                console.log(resp.data, "data fabrica fabrica");
            }
        })
    }


    public validationPost(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            console.log(this.form, this.form.valid);
            Object.keys(this.form.controls).forEach(key => {
                // Get errors of every form control
                console.log(this.form.get(key).errors, key);
            });
        } else {
            this.onPostDatos();
        }
    }

    /**
     * @description:
     */
    public onPostDatos(): void {
        const datos: FormularioCreditoMicro = this.form.getRawValue();
        const { numeroHijos, autorizacionBanco,telefonoNegocio, barrioResidencia, antiguedadActividad, valorSolicitado, plazo, personasACargo, fechaDesvinculacionExpuesta, fechaDesvinculacionPublico, fechaNacimiento, fechaExpedicion, estrato, ...data } = datos;
        const fechaNacimientoFormato = moment(fechaNacimiento.toString()).format('YYYY-MM-DD');
        const fechaExpedicionFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
        const fechaDesvinculacionPublicoFormato = fechaDesvinculacionPublico ? moment(fechaDesvinculacionPublico.toString()).format('YYYY-MM-DD') : "0099-01-01";
        const fechaDesvinculacionExpuestaFormato = fechaDesvinculacionExpuesta ? moment(fechaDesvinculacionExpuesta.toString()).format('YYYY-MM-DD'): "0099-01-01";
        const numeroHijosFormato = Number(numeroHijos);
        const barrioResidenciaFormato = Number(barrioResidencia);
        const antiguedadActividadFormato = Number(antiguedadActividad);
        const personasACargoFormato = Number(personasACargo);
        const estratoFormato = Number(estrato)
        const valorSolicitadoFormato = Number(valorSolicitado)
        const plazoFormato = Number(plazo);
        const autorizacionBancoFormato = autorizacionBanco ? 'S' : 'N';
        const modificadaSolicitudFormato = valorSolicitadoFormato;
        const telefonoNegocioFormato = telefonoNegocio.toString();
        // delete data.otrosIngresos; modificadaSolicitud 
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
            autorizacionBanco: autorizacionBancoFormato,
            plazo: plazoFormato,
            modificadaSolicitud:'N',
            telefonoNegocio: telefonoNegocioFormato,
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
                this.dataGeneralIncial = data;
                console.log(data);
                this.form.patchValue(data);
                this.form.controls.autorizacionBanco.setValue(this.form.controls.autorizacionBanco.value  === 'S')
                console.log('Form valid', this.form.valid);

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
                if (data.estrato) {
                    this.form.controls.estrato.setValue(data.estrato.toString());
                }
                if (data.codigoDepartamentoExpedicion) {
                    this.getCiudadesExpedicion(data.codigoDepartamentoExpedicion);
                }
                if(data.tipoActividad){
                    this.getActividadEconomica();   
                }
            });

        const datosSolicitud: any = {
            numeroSolicitud: numeroSolicitud,
            identificacion: identificacion
        }
        this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                Swal.close();
                this.form.patchValue({
                    descripcionTipo: data.descripcionTipo,
                    codigoBarrio: data.codigoBarrio
                });
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data;
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

    private getActividadEconomica():void{
        const tipoActividad = this.form.controls.tipoActividad.value;
        const nivelEstudio = this.form.controls.nivelEstudio.value;
        const camaraComercio = this.form.controls.camaraComercio.value;

        if(tipoActividad && nivelEstudio && camaraComercio){
            this._formularioCreditoService.cargueActividadEconomica(nivelEstudio,tipoActividad,camaraComercio).subscribe(res => {
                this.actividadEconomica = res.data
                console.log(this.actividadEconomica, "Actividad economica");
            });
        }

        
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

    public validacionCampos(campo: string, modificado: string, variable: string, type: String): void {
        let mensaje = `<p>¿Estás seguro de editar el campo de <strong>${campo}</strong>?, ${modificado}.</p>`;
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
                console.log(this.form.controls[variable].value);

            } else {
                console.log('denegado')
                if(type === "INTEGER"){

                    this.form.controls[variable].setValue(Number(this.dataGeneralIncial[variable]));
                }
                if(type === "STRING"){
                    this.form.controls[variable].setValue(this.dataGeneralIncial[variable].toString());
                }
            }
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
            descripcionTipoCredito: [''],
            primerNombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
            descripcionEstado: [''],
            descripcionSubestado: [''],
            segundoNombre: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
            primerApellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
            segundoApellido: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
            estadoCivil: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            genero: ['', [Validators.required]],
            nacionalidad: ['', [Validators.required]],
            fechaNacimiento: ['', [Validators.required, this.validatedDate.bind(this)]],
            nivelEstudio: ['', [Validators.required]],
            numeroHijos: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            personasACargo: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            fechaExpedicion: ['', [Validators.required,this.validatedDate.bind(this)]],
            codigoDepartamentoExpedicion: ['', Validators.required],
            codigoCiudadExpedicion: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
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
            annosTiempoResidencia: ['', [Validators.required, Validators.minLength(0), Validators.min(0)]],
            mesesTiempoResidencia: ['', [Validators.required, Validators.minLength(0), Validators.min(0)]],
            tipoActividad: ['', Validators.required],
            actividadEconomica: ['', Validators.required],
            actividadEspecifica: ['', Validators.required],
            antiguedadActividad: ['', [Validators.required, Validators.minLength(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            antiguedadNegocio: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            camaraComercio: ['', [Validators.required]],
            tieneRut: [''],
            nitNegocio: [''],
            nombreNegocio: ['', Validators.required],
            codigoDepartamentoNegocio: ['', [Validators.required]],
            codigoCiudadNegocio: ['', Validators.required],
            codigoBarrioNegocio: ['', Validators.required],
            segmento: [''],
            direccionNegocio: [''],
            direccionNegocioVia: ['', Validators.required],
            direccionNegocioPrincipal: ['', Validators.required],
            direccionNegocioNroVia: ['', Validators.required],
            direccionNegocioDistanciaVia: ['', Validators.required],
            direccionNegocioCompleto: [''],
            telefonoNegocio: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.minLength(7), Validators.maxLength(10)]],
            tipoLocal: ['', Validators.required],
            tipoLocalCalulado: [''],
            antiguedadLocal: ['', Validators.required],
            nombreArrendador: [''],
            celularArrendador: [''],
            tipoUbicacionNegocio: ['', Validators.required],
            numeroEmpleados: ['', [Validators.required]],
            nombreAtiendeNegocio: ['', Validators.required],
            tieneOtrosPuntos: ['', Validators.required],
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
            poseeCuentaBancaria: ['', Validators.required],
            tipoCuentaBancaria: [''],
            entidadBancaria: [''],
            numeroCuentaBancaria: [''],
            autorizacionBanco: [''],
            tipoDeudor: ['', Validators.required],
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
            plazo: ['', [Validators.required, Validators.minLength(0)]],
            descripcionTipo: [''],
            titularMicro: [''],
            aplicaCodeudor: [''],
            valorSolicitadoWeb: ['', [Validators.required, Validators.min(0)]],
            creditoCodeudorLineas: [''],
            modificadaSolicitud: [''],
            valorSolicitado: ['', [Validators.required, Validators.minLength(0)]],
            destinoCredito: ['', [Validators.required]],
            codeudorMicro: [''],
            codigoBarrio: ['', [Validators.required]],
            declaraRenta: ['', [Validators.required]],
            cargoPublico: [''],
            entidad: [''],
            vinculadoActualmente: [''],
            fechaDesvinculacion: [''],
            actividadNoDesignada:[''],
            ubicacionNegocioCalculado: [''],
            tipoVereda: ['', Validators.required],
            descripcionVereda: ['', Validators.required],
            tipoVeredaNegocio: ['', Validators.required],
            descripcionVeredaNegocio: ['', Validators.required]
        },
        );
    }


    public validacion(tipo: string) {
        if (this.form.controls['aplicaIngresos']?.value == 'N') {
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
        this.form.controls['ingresos']?.setValue(this.utility.formatearNumero(String(sum)));

    }

    // validaciones dinamicas
    public addValidation() {
        // Camara de comercio form
        this.form.get('camaraComercio').valueChanges.subscribe((e: string) => {
            if (e === 'S') {
                this.form.get('tieneRut')?.setValidators([Validators.required])
                this.form.get('tieneRut')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('nitNegocio')?.setValidators([Validators.required, Validators.minLength(10), Validators.max(9999999999)])
                this.form.get('nitNegocio')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('tieneRut')?.setValidators(null)
                this.form.get('tieneRut')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('nitNegocio')?.setValidators(null)
                this.form.get('nitNegocio')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        // Arriendo local form
        this.form.get('tipoLocal').valueChanges.subscribe((e: number) => {
            if (Number(e) === 2) {
                this.form.get('nombreArrendador')?.setValidators([Validators.required, Validators.maxLength(30)])
                this.form.get('nombreArrendador')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('celularArrendador')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.minLength(7), Validators.maxLength(10)])
                this.form.get('celularArrendador')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('nombreArrendador')?.setValidators(null)
                this.form.get('nombreArrendador')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('celularArrendador')?.setValidators(null)
                this.form.get('celularArrendador')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        // Empleo conyuge empleado form
        this.form.get('tipoEmpleoConyuge').valueChanges.subscribe((e: string) => {
            if (e === 'EPLDO') {
                this.form.get('nombreEmpresaConyuge')?.setValidators([Validators.required])
                this.form.get('nombreEmpresaConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoConyuge')?.setValidators([Validators.required])
                this.form.get('cargoConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('salarioConyuge')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('salarioConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('telefonoEmpresaConyuge')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('telefonoEmpresaConyuge')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('nombreEmpresaConyuge')?.setValidators(null)
                this.form.get('nombreEmpresaConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoConyuge')?.setValidators(null)
                this.form.get('cargoConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('salarioConyuge')?.setValidators(null)
                this.form.get('salarioConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('telefonoEmpresaConyuge')?.setValidators(null)
                this.form.get('telefonoEmpresaConyuge')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // posee cuenta bancaria
        this.form.get('poseeCuentaBancaria').valueChanges.subscribe((e: string) => {
            if (e === 'S') {
                this.form.get('entidadBancaria')?.setValidators([Validators.required])
                this.form.get('entidadBancaria')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoCuentaBancaria')?.setValidators([Validators.required])
                this.form.get('tipoCuentaBancaria')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('numeroCuentaBancaria')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.min(0)])
                this.form.get('numeroCuentaBancaria')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('entidadBancaria')?.setValidators(null)
                this.form.get('entidadBancaria')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoCuentaBancaria')?.setValidators(null)
                this.form.get('tipoCuentaBancaria')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('numeroCuentaBancaria')?.setValidators(null)
                this.form.get('numeroCuentaBancaria')?.disable({ emitEvent: true, onlySelf: true })
            }

            if(e === 'N'){
                this.form.get('autorizacionBanco')?.setValidators([Validators.requiredTrue])
                this.form.get('autorizacionBanco')?.enable({ emitEvent: true, onlySelf: true })
            }else{
                this.form.get('autorizacionBanco')?.setValidators(null)
                this.form.get('autorizacionBanco')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // operacion Extranjera moneda Form
        this.form.get('legalOperacionExtranjera').valueChanges.subscribe((e: string) => {
            if (e === 'S') {
                this.form.get('tipoOperacionExtranjera')?.setValidators([Validators.required])
                this.form.get('tipoOperacionExtranjera')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('tipoOperacionExtranjera')?.setValidators(null)
                this.form.get('tipoOperacionExtranjera')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // operacion cripto moneda Form
        this.form.get('legalOperacionCriptomoneda').valueChanges.subscribe((e: string) => {
            if (e === 'S') {
                this.form.get('tipoOperacionCriptomoneda')?.setValidators([Validators.required])
                this.form.get('tipoOperacionCriptomoneda')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('tipoOperacionCriptomoneda')?.setValidators(null)
                this.form.get('tipoOperacionCriptomoneda')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // cargo publico 
        this.form.get('legalCargoPublico').valueChanges.subscribe((e: string) => {
            if (e === 'S') {
                this.form.get('cargoPublico')?.setValidators([Validators.required, Validators.maxLength(80)])
                this.form.get('cargoPublico')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadPublico')?.setValidators([Validators.required, Validators.maxLength(150)])
                this.form.get('entidadPublico')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualPublico')?.setValidators([Validators.required])
                this.form.get('vinculadoActualPublico')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('cargoPublico')?.setValidators(null)
                this.form.get('cargoPublico')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadPublico')?.setValidators(null)
                this.form.get('entidadPublico')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualPublico')?.setValidators(null)
                this.form.get('vinculadoActualPublico')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        this.form.get('vinculadoActualPublico').valueChanges.subscribe((e: string) => {
            if (e === 'N') {
                this.form.get('fechaDesvinculacionPublico')?.setValidators([Validators.required,this.validatedDate.bind(this)])
                this.form.get('fechaDesvinculacionPublico')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('fechaDesvinculacionPublico')?.setValidators(null)
                this.form.get('fechaDesvinculacionPublico')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // Datos cargo publico familiar 
        this.form.get('legalPersonalExpuesta').valueChanges.subscribe((e: string) => {
            if (e === 'S') {
                this.form.get('vinculacionExpuesta')?.setValidators([Validators.required, Validators.max(50)])
                this.form.get('vinculacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('nombreExpuesta')?.setValidators([Validators.required, Validators.maxLength(100)])
                this.form.get('nombreExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoIdentificacionExpuesta')?.setValidators([Validators.required])
                this.form.get('tipoIdentificacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionExpuesta')?.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('identificacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('nacionalidadExpuesta')?.setValidators([Validators.required])
                this.form.get('nacionalidadExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadExpuesta')?.setValidators([Validators.required, Validators.maxLength(150)])
                this.form.get('entidadExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoExpuesta')?.setValidators([Validators.required, Validators.maxLength(80)])
                this.form.get('cargoExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualExpuesta')?.setValidators([Validators.required])
                this.form.get('vinculadoActualExpuesta')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('vinculacionExpuesta')?.setValidators(null)
                this.form.get('vinculacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('nombreExpuesta')?.setValidators(null)
                this.form.get('nombreExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoIdentificacionExpuesta')?.setValidators(null)
                this.form.get('tipoIdentificacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionExpuesta')?.setValidators(null)
                this.form.get('identificacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('nacionalidadExpuesta')?.setValidators(null)
                this.form.get('nacionalidadExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadExpuesta')?.setValidators(null)
                this.form.get('entidadExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoExpuesta')?.setValidators(null)
                this.form.get('cargoExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualExpuesta')?.setValidators(null)
                this.form.get('vinculadoActualExpuesta')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        this.form.get('vinculadoActualExpuesta').valueChanges.subscribe((e: string) => {
            if (e === 'N') {
                this.form.get('fechaDesvinculacionExpuesta')?.setValidators([Validators.required,this.validatedDate.bind(this)])
                this.form.get('fechaDesvinculacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('fechaDesvinculacionExpuesta')?.setValidators(null)
                this.form.get('fechaDesvinculacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // declaro ingresos Otros declaroIngresoDeclaracionAuto
        this.form.get('declaroIngresoDeclaracionAuto').valueChanges.subscribe((e: string) => {
            console.log(e, "declaroIngresoDeclaracionAuto");

            if (e === 'OT') {
                this.form.get('otroIngresoDeclaracionAuto')?.setValidators([Validators.required])
                this.form.get('otroIngresoDeclaracionAuto')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('otroIngresoDeclaracionAuto')?.setValidators(null)
                this.form.get('otroIngresoDeclaracionAuto')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // conyuge form si aplica Casado o union libre
        this.form.get('estadoCivil').valueChanges.subscribe((e: string) => {
            console.log(e, "declaroIngresoDeclaracionAuto");

            if (e === 'CA' || e === 'UL') {
                this.form.get('primerNombreConyuge')?.setValidators([Validators.required])
                this.form.get('primerNombreConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('primerApellidoConyuge')?.setValidators([Validators.required])
                this.form.get('primerApellidoConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoDocumentoConyuge')?.setValidators([Validators.required])
                this.form.get('tipoDocumentoConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionConyuge')?.setValidators([Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('identificacionConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('celularConyuge')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('celularConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('emailConyuge')?.setValidators([Validators.required, Validators.email])
                this.form.get('emailConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoEmpleoConyuge')?.setValidators([Validators.required])
                this.form.get('tipoEmpleoConyuge')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('primerNombreConyuge')?.setValidators(null)
                this.form.get('primerNombreConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('primerApellidoConyuge')?.setValidators(null)
                this.form.get('primerApellidoConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoDocumentoConyuge')?.setValidators(null)
                this.form.get('tipoDocumentoConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionConyuge')?.setValidators(null)
                this.form.get('identificacionConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('celularConyuge')?.setValidators(null)
                this.form.get('celularConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('emailConyuge')?.setValidators(null)
                this.form.get('emailConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoEmpleoConyuge')?.setValidators(null)
                this.form.get('tipoEmpleoConyuge')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        

        this.form.get('tipoLocal').valueChanges.subscribe((e: string) => {
            console.log(e);
            // Local comercial propio
            if(e === '1'){
                this.form.controls.tipoLocalCalulado.setValue('Propio.')
                this.form.controls.ubicacionNegocioCalculado.setValue('Local aparte.')
            }
            else if(e === '2'){
                this.form.controls.tipoLocalCalulado.setValue('Arrendado.')
                this.form.controls.ubicacionNegocioCalculado.setValue('Local aparte.')
            }else if(e === '3'){
                this.form.controls.tipoLocalCalulado.setValue('Propio.')
                this.form.controls.ubicacionNegocioCalculado.setValue('Vivienda.')
            }
            else if(e === '4'){
                this.form.controls.tipoLocalCalulado.setValue('No tiene.')
                this.form.controls.ubicacionNegocioCalculado.setValue('Vivienda.')
            }
        })
    }

    private validatedDate(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        const date =  moment(valueControl).format('YYYY-MM-DD') 
        const errors = {dateError: true};
         
        // Set the validation error on the matching control
        if(this.fechaActual.isBefore(date)){

            return errors
        }else{
            return null
        }
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
