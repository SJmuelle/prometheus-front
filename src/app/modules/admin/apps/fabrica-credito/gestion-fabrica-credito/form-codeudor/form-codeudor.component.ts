import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { Subject, Observable, Subscription } from 'rxjs';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
    AbstractControl,
} from '@angular/forms';
import { UtilityService } from 'app/resources/services/utility.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { takeUntil } from 'rxjs/operators';
import moment from 'moment';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { FormularioCreditoMicro } from 'app/core/interfaces/formulario-fabrica-credito.interface';

@Component({
    selector: 'form-codeudor',
    templateUrl: './form-codeudor.component.html',
    styleUrls: ['./form-codeudor.component.scss'],
})
export class FormCodeudorComponent implements OnInit {
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
    public dataInicial: any;
    public ciudades$: Observable<any>;
    public ciudadesNacimiento$: Observable<any>;
    public ciudadesNegocio$: Observable<any>;
    public barrios$: Observable<any>;
    public barriosNegocio$: Observable<any>;
    public ciudadesExpedicion$: Observable<any>;
    listadoCiudades: any[];
    listadoBarrios: any[];
    fechaActual: any = moment().locale('co');

    constructor(
        private fabricaCreditoService: FabricaCreditoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        public utility: UtilityService,
        public _permisosService: PermisosService,
        private _formularioCreditoService: FormularioCreditoService,
        private el: ElementRef
    ) {
        this.createFormulario();
    }

    ngOnInit(): void {
        this.cargueInicial();
        this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
        this.permisoEditar =
            this._permisosService.permisoPorModuleTrazabilidad();
        if (this.permisoEditar) {
            this.form.disable();
        }
    }

    /**
     * @description: Obtiene la data para cargar al formulario
     */
    private getFabricaCreditoAgenda(
        numeroSolicitud: string,
        identificacion: string
    ): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información...',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });

        this.fabricaCreditoService
            .getInformacionTipoTercero(numeroSolicitud, 'C')
            .pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                Swal.close();
                this.dataGeneralIncial = data;

                this.addValidation();
                this.form.patchValue(data);

                // formatear data para los select
                this.form.controls.experienciaActividad.setValue(
                    Number(this.form.controls.experienciaActividad.value)
                );

                // formateo de fechas
                const fechaDesExpuesta = this.form.controls.fechaDesvinculacionExpuesta.value;
                this.form.controls.fechaDesvinculacionExpuesta.setValue(
                    fechaDesExpuesta === '0099-01-01' ? '' : fechaDesExpuesta
                )
                const fechaDesPublico = this.form.controls.fechaDesvinculacionPublico.value;
                this.form.controls.fechaDesvinculacionPublico.setValue(
                    fechaDesPublico === '0099-01-01' ? '' : fechaDesPublico
                )




                if (data?.codigoDepartamento) {
                    this.getCiudades(data.codigoDepartamento);
                }
                if (data?.codigoDepartamentoNacimiento) {
                    this.getCiudadesNacimiento(
                        data.codigoDepartamentoNacimiento
                    );
                }
                if (data?.codigoDepartamentoNegocio) {
                    this.getCiudadesNegocio(data.codigoDepartamentoNegocio);
                }
                if (data?.codigoCiudad) {
                    this.getBarrios(data.codigoCiudad);
                }
                if (data?.codigoCiudadNegocio) {
                    this.getBarriosNegocio(data.codigoCiudadNegocio);
                }
                if (data?.estrato) {
                    this.form.controls.estrato.setValue(
                        data.estrato.toString()
                    );
                }
                if (data?.codigoDepartamentoExpedicion) {
                    this.getCiudadesExpedicion(
                        data.codigoDepartamentoExpedicion
                    );
                }
            });

        const datosSolicitud: any = {
            numeroSolicitud: numeroSolicitud,
            identificacion: identificacion,
        };
        this.fabricaCreditoService
            .getDatosFabricaAgenda(datosSolicitud)
            .pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                Swal.close();
                // este dato no llega de la anterior api endpoint
                this.form.patchValue({
                    descripcionTipo: data.descripcionTipo,
                    codigoBarrio: data.codigoBarrio,
                });
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data.fabricaDatos;
            });
    }

    private cargueInicial() {
        let data = {
            entidad: 'CONFIG-MICRO',
            unidadNegocio: 1,
        };
        this._formularioCreditoService
            .cargueInicial(data)
            .subscribe((resp: any) => {
                if (resp) {
                    this.dataInicial = resp.data;
                }
            });
    }
    public listarCiudades() {
        const datos = this.form.getRawValue();
        const { departamentoNegocio } = datos;
        this._formularioCreditoService
            .listarCiudadesMicro(departamentoNegocio)
            .subscribe((resp: any) => {
                if (resp) {
                    this.listadoCiudades = resp.data;
                } else {
                    this.listadoCiudades = [];
                }
            });
    }

    /**
     * @description :creando el formulario
     */
    private createFormulario(): void {
        this.form = this.fb.group({
            // informacion personal
            descripcionTipo: [''],
            tipodeSolicitante: ['Codeudor'],
            tipoDocumento: ['', Validators.required],
            identificacion: [
                '',
                [
                    Validators.required,
                    Validators.minLength(7),
                    Validators.maxLength(10),
                    Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                ],
            ],
            nombreCompleto: [''],
            celular: [
                '',
                [
                    Validators.required,
                    Validators.minLength(7),
                    Validators.maxLength(10),
                    Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                ],
            ],
            primerNombre: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),
                ],
            ],
            segundoNombre: [''],
            primerApellido: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),
                ],
            ],
            segundoApellido: [''],
            estadoCivil: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            genero: ['', [Validators.required]],
            nacionalidad: [''], // validacion condicional, verificar en el excel
            fechaNacimiento: [
                '',
                [Validators.required, this.validatedDate.bind(this)],
            ],
            nivelEstudio: ['', Validators.required],
            numeroHijos: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                    Validators.min(0),
                ],
            ],
            personasACargo: [
                '',
                [
                    Validators.required,
                    Validators.minLength(0),
                    Validators.min(0),
                    Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                ],
            ],
            fechaExpedicion: [
                '',
                [Validators.required, this.validatedDate.bind(this), this.validateExpedicion.bind(this)],
            ],
            codigoDepartamentoExpedicion: ['', Validators.required],
            codigoCiudadExpedicion: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
            codigoDepartamento: ['', [Validators.required]],
            codigoCiudad: ['', Validators.required],
            barrioResidencia: ['', Validators.required],
            direccionResidencial: [''],
            tipoVivienda: ['', [Validators.required]],
            annosTiempoResidencia: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                ],
            ],
            mesesTiempoResidencia: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                ],
            ],

            // fin  informacion personal

            creditoTitularLineas: [''],
            emision: [''],
            descripcionTipoCredito: [''],
            descripcionEstado: [''],
            descripcionSubestado: [''],
            direccionTipoVia: ['', [Validators.required]],
            direccionViaPrincipal: [
                '',
                [Validators.required, Validators.min(0)],
            ],
            direccionNumeroVia: ['', [Validators.required, Validators.min(0)]],
            direccionDistanciaVia: ['', [Validators.required]],
            direccionComplemento: [''],
            tipoActividad: [''],
            antiguedadActividad: [''],
            antiguedadNegocio: [0],
            tieneRut: [''],
            segmento: [''],

            nombreArrendador: [''],
            celularArrendador: [''],
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
            declaraRenta: ['', Validators.required],
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
            recurso: [''],

            titularMicro: [''],
            aplicaCodeudor: [''],
            valorSolicitadoWeb: [0],
            creditoCodeudorLineas: [''],
            modificadaSolicitud: [''],
            valorSolicitado: [0],
            destinoCredito: [''],
            codeudorMicro: [''],
            cargoPublico: [''],
            entidad: [''],
            vinculadoActualmente: [''],
            fechaDesvinculacion: [''],
            tipo: ['C'],
            numeroSolicitud: [''],

            // Data requerida por el backend
            descripcionGenero: [''],

            // campos faltantes Informacion de actividad economica
            ocupacion: ['', [Validators.required]],
            // el form solo de muestra si su ocupacion es empleado
            nombreEmpresa: [''],
            telefonoEmpresa: [''],
            direccionEmpresa: [''],
            //  telefonoNegocio: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.minLength(7), Validators.maxLength(10)]],
            tipoContrato: [''],
            cargo: [''],
            salarioBasico: [0],
            fechaIngresoFabrica: [''],

            // el form solo de muestra si su ocupacion es independiente
            actividadEconomica: [''],
            actividadEspecifica: [''],
            nombreNegocio: [''],
            camaraComercio: [''],
            nitNegocio: [''],
            experienciaActividad: [''],
            codigoDepartamentoNegocio: [''],
            codigoCiudadNegocio: [''],
            codigoBarrioNegocio: ['0'],
            direccionNegocioVia: [''],
            direccionNegocioPrincipal: [''],
            direccionNegocioNroVia: [''],
            direccionNegocioDistanciaVia: [''],
            direccionNegocioCompleto: [''],
            direccionNegocio: [''],
            fechaVinculacion: [''],
            antiguedadPensionado: [0],
            telefonoNegocio: [''],
            tipoUbicacionNegocio: [''],
            tipoLocal: [''],
            antiguedadLocal: [0],
            numeroEmpleados: [0],
            estabilidadPuesto: [''],
            // estabilidad puesto de trabajo
            tieneOtrosPuntos: [''],
            nombreAtiendeNegocio: [''],

            // el form solo de muestra si su ocupacion es pensionado
            tiempoPensionado: [''],
            tipoVereda: [''],
            descripcionVereda: [''],
            tipoVeredaNegocio: [''],
            descripcionVeredaNegocio: ['']
        });
    }

    private validatedDate(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        const date = moment(valueControl).format('YYYY-MM-DD');
        const errors = { dateError: true };

        // Set the validation error on the matching control
        if (this.fechaActual.isBefore(date)) {
            return errors;
        } else {
            return null;
        }
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
        this.form.controls.codigoBarrioNegocio.setValue('');
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
        this.ciudadesNacimiento$ =
            this.departamentosCiudadesService.getCiudades(codigo);
    }

    /**
     * @description: Obtiene listado de ciudades negocio
     */
    private getCiudadesNegocio(codigo: string): void {
        this.ciudadesNegocio$ =
            this.departamentosCiudadesService.getCiudades(codigo);
    }

    /**
     * @description: Obtiene listado de ciudades negocio
     */
    private getCiudadesExpedicion(codigo: string): void {
        this.ciudadesExpedicion$ =
            this.departamentosCiudadesService.getCiudades(codigo);
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
        this.barriosNegocio$ =
            this.departamentosCiudadesService.getBarrios(codigo);
    }

    // validaciones dinamicas
    public addValidation() {

        // camara de comercio
        this.form.get('camaraComercio').valueChanges.subscribe((e: string) => {
            const ocup = this.form.controls.ocupacion.value;
            if ((ocup !== 'EPLDO' &&
                (ocup === 'INDEFO' || ocup === 'PROIN' || ocup === 'INDNFO')) && this.form.controls.camaraComercio.value === 'S') {
                this.form
                    .get('nitNegocio')
                    ?.setValidators([
                        Validators.required,
                        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                        Validators.minLength(10),
                        Validators.maxLength(10),
                    ]);
                this.form
                    .get('nitNegocio')
                    ?.enable({ emitEvent: true, onlySelf: true });
            } else {
                this.form.get('nitNegocio')?.setValidators(null);
                this.form
                    .get('nitNegocio')
                    ?.disable({ emitEvent: true, onlySelf: true });
            }
        })
        // ocupacion Empleado
        this.form.get('ocupacion').valueChanges.subscribe((e: string) => {
            if (
                e !== 'EPLDO' &&
                !(e === 'INDEFO' || e === 'PROIN' || e === 'INDNFO')
            ) {
                this.form.get('nombreEmpresa')?.setValidators(null);
                this.form
                    .get('nombreEmpresa')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('salarioBasico')?.setValidators(null);
                this.form
                    .get('salarioBasico')
                    ?.disable({ emitEvent: true, onlySelf: true });
            }
            if (e === 'EPLDO') {
                this.form
                    .get('nombreEmpresa')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('nombreEmpresa')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('telefonoEmpresa')
                    ?.setValidators([
                        Validators.required,
                        Validators.minLength(7),
                        Validators.maxLength(10),
                        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                    ]);
                this.form
                    .get('telefonoEmpresa')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('direccionEmpresa')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('direccionEmpresa')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('tipoContrato')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('tipoContrato')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form.get('cargo')?.setValidators([Validators.required]);
                this.form
                    .get('cargo')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('salarioBasico')
                    ?.setValidators([
                        Validators.required,
                        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                    ]);
                this.form
                    .get('salarioBasico')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('fechaIngresoFabrica')
                    ?.setValidators([
                        Validators.required,
                        this.validatedDate.bind(this),
                    ]);
                this.form
                    .get('fechaIngresoFabrica')
                    ?.enable({ emitEvent: true, onlySelf: true });
            } else {
                this.form.get('telefonoEmpresa')?.setValidators(null);
                this.form
                    .get('telefonoEmpresa')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('direccionEmpresa')?.setValidators(null);
                this.form
                    .get('direccionEmpresa')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('tipoContrato')?.setValidators(null);
                this.form
                    .get('tipoContrato')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('cargo')?.setValidators(null);
                this.form
                    .get('cargo')
                    ?.disable({ emitEvent: true, onlySelf: true });

                this.form.get('fechaIngresoFabrica')?.setValidators(null);
                this.form
                    .get('fechaIngresoFabrica')
                    ?.disable({ emitEvent: true, onlySelf: true });
            }
            // independiente y sus derivados
            if (e === 'INDEFO' || e === 'PROIN' || e === 'INDNFO') {
                this.form
                    .get('actividadEconomica')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('actividadEconomica')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('actividadEspecifica')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('actividadEspecifica')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('nombreNegocio')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('nombreNegocio')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('camaraComercio')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('camaraComercio')
                    ?.enable({ emitEvent: true, onlySelf: true });

                this.form
                    .get('direccionNegocioVia')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('direccionNegocioVia')
                    ?.enable({ emitEvent: true, onlySelf: true });

                this.form
                    .get('direccionNegocioPrincipal')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('direccionNegocioPrincipal')
                    ?.enable({ emitEvent: true, onlySelf: true });

                this.form
                    .get('direccionNegocioNroVia')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('direccionNegocioNroVia')
                    ?.enable({ emitEvent: true, onlySelf: true });

                this.form
                    .get('direccionNegocioDistanciaVia')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('direccionNegocioDistanciaVia')
                    ?.enable({ emitEvent: true, onlySelf: true });



                this.form
                    .get('experienciaActividad')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('experienciaActividad')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('codigoCiudadNegocio')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('codigoCiudadNegocio')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('codigoDepartamentoNegocio')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('codigoDepartamentoNegocio')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('telefonoNegocio')
                    ?.setValidators([
                        Validators.required,
                        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                        Validators.minLength(7),
                        Validators.maxLength(10),
                    ]);
                this.form
                    .get('telefonoNegocio')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('tipoUbicacionNegocio')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('tipoUbicacionNegocio')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('tipoLocal')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('tipoLocal')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('antiguedadLocal')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('antiguedadLocal')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('numeroEmpleados')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('numeroEmpleados')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('tieneOtrosPuntos')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('tieneOtrosPuntos')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('nombreAtiendeNegocio')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('nombreAtiendeNegocio')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('estabilidadPuesto')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('estabilidadPuesto')
                    ?.enable({ emitEvent: true, onlySelf: true });
            } else {
                this.form.get('actividadEconomica')?.setValidators(null);
                this.form
                    .get('actividadEconomica')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('actividadEspecifica')?.setValidators(null);
                this.form
                    .get('actividadEspecifica')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('nombreNegocio')?.setValidators(null);
                this.form
                    .get('nombreNegocio')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('camaraComercio')?.setValidators(null);
                this.form
                    .get('camaraComercio')
                    ?.disable({ emitEvent: true, onlySelf: true });

                this.form.get('experienciaActividad')?.setValidators(null);
                this.form
                    .get('experienciaActividad')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('codigoCiudadNegocio')?.setValidators(null);
                this.form
                    .get('codigoCiudadNegocio')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('codigoDepartamentoNegocio')?.setValidators(null);
                this.form
                    .get('codigoDepartamentoNegocio')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('telefonoNegocio')?.setValidators(null);
                this.form
                    .get('telefonoNegocio')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('tipoUbicacionNegocio')?.setValidators(null);
                this.form
                    .get('tipoUbicacionNegocio')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('tipoLocal')?.setValidators(null);
                this.form
                    .get('tipoLocal')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('antiguedadLocal')?.setValidators(null);
                this.form
                    .get('antiguedadLocal')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('numeroEmpleados')?.setValidators(null);
                this.form
                    .get('numeroEmpleados')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('tieneOtrosPuntos')?.setValidators(null);
                this.form
                    .get('tieneOtrosPuntos')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('nombreAtiendeNegocio')?.setValidators(null);
                this.form
                    .get('nombreAtiendeNegocio')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('estabilidadPuesto')?.setValidators(null);
                this.form
                    .get('estabilidadPuesto')
                    ?.disable({ emitEvent: true, onlySelf: true });

                this.form.get('direccionNegocioVia')?.setValidators(null);
                this.form
                    .get('direccionNegocioVia')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('direccionNegocioPrincipal')?.setValidators(null);
                this.form
                    .get('direccionNegocioPrincipal')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form.get('direccionNegocioNroVia')?.setValidators(null);
                this.form
                    .get('direccionNegocioNroVia')
                    ?.disable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('direccionNegocioDistanciaVia')
                    ?.setValidators(null);
                this.form
                    .get('direccionNegocioDistanciaVia')
                    ?.disable({ emitEvent: true, onlySelf: true });
            }
            // pensionado
            if (e === 'PENSI') {
                this.form
                    .get('nombreEmpresa')
                    ?.setValidators([Validators.required]);
                this.form
                    .get('nombreEmpresa')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('salarioBasico')
                    ?.setValidators([
                        Validators.required,
                        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                    ]);
                this.form
                    .get('salarioBasico')
                    ?.enable({ emitEvent: true, onlySelf: true });
                this.form
                    .get('tiempoPensionado')
                    ?.setValidators([
                        Validators.required,
                        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                        Validators.min(0),
                    ]);
                this.form
                    .get('tiempoPensionado')
                    ?.enable({ emitEvent: true, onlySelf: true });
            } else {
                this.form.get('tiempoPensionado')?.setValidators(null);
                this.form
                    .get('tiempoPensionado')
                    ?.disable({ emitEvent: true, onlySelf: true });
            }
        });
        // operacion Extranjera moneda Form
        this.form
            .get('legalOperacionExtranjera')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.form
                        .get('tipoOperacionExtranjera')
                        ?.setValidators([Validators.required]);
                    this.form
                        .get('tipoOperacionExtranjera')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.form
                        .get('tipoOperacionExtranjera')
                        ?.setValidators(null);
                    this.form
                        .get('tipoOperacionExtranjera')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        // operacion cripto moneda Form
        this.form
            .get('legalOperacionCriptomoneda')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.form
                        .get('tipoOperacionCriptomoneda')
                        ?.setValidators([Validators.required]);
                    this.form
                        .get('tipoOperacionCriptomoneda')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.form
                        .get('tipoOperacionCriptomoneda')
                        ?.setValidators(null);
                    this.form
                        .get('tipoOperacionCriptomoneda')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        // Datos cargo publico familiar
        this.form
            .get('legalPersonalExpuesta')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.form
                        .get('vinculacionExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.max(50),
                        ]);
                    this.form
                        .get('vinculacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('nombreExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(100),
                        ]);
                    this.form
                        .get('nombreExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('tipoIdentificacionExpuesta')
                        ?.setValidators([Validators.required]);
                    this.form
                        .get('tipoIdentificacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('identificacionExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.minLength(5),
                            Validators.maxLength(10),
                            Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                        ]);
                    this.form
                        .get('identificacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('nacionalidadExpuesta')
                        ?.setValidators([Validators.required]);
                    this.form
                        .get('nacionalidadExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('entidadExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(150),
                        ]);
                    this.form
                        .get('entidadExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('cargoExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(80),
                        ]);
                    this.form
                        .get('cargoExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('vinculadoActualExpuesta')
                        ?.setValidators([Validators.required]);
                    this.form
                        .get('vinculadoActualExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.form.get('vinculacionExpuesta')?.setValidators(null);
                    this.form
                        .get('vinculacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form.get('nombreExpuesta')?.setValidators(null);
                    this.form
                        .get('nombreExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('tipoIdentificacionExpuesta')
                        ?.setValidators(null);
                    this.form
                        .get('tipoIdentificacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('identificacionExpuesta')
                        ?.setValidators(null);
                    this.form
                        .get('identificacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form.get('nacionalidadExpuesta')?.setValidators(null);
                    this.form
                        .get('nacionalidadExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form.get('entidadExpuesta')?.setValidators(null);
                    this.form
                        .get('entidadExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form.get('cargoExpuesta')?.setValidators(null);
                    this.form
                        .get('cargoExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('vinculadoActualExpuesta')
                        ?.setValidators(null);
                    this.form
                        .get('vinculadoActualExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        this.form
            .get('vinculadoActualExpuesta')
            .valueChanges.subscribe((e: string) => {
                if (e === 'N') {
                    this.form
                        .get('fechaDesvinculacionExpuesta')
                        ?.setValidators([
                            Validators.required,
                            this.validatedDate.bind(this),
                        ]);
                    this.form
                        .get('fechaDesvinculacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.form
                        .get('fechaDesvinculacionExpuesta')
                        ?.setValidators(null);
                    this.form
                        .get('fechaDesvinculacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        // declaro ingresos Otros declaroIngresoDeclaracionAuto
        this.form
            .get('declaroIngresoDeclaracionAuto')
            .valueChanges.subscribe((e: string) => {

                if (e === 'OT') {
                    this.form
                        .get('otroIngresoDeclaracionAuto')
                        ?.setValidators([Validators.required]);
                    this.form
                        .get('otroIngresoDeclaracionAuto')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.form
                        .get('otroIngresoDeclaracionAuto')
                        ?.setValidators(null);
                    this.form
                        .get('otroIngresoDeclaracionAuto')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        // cargo publico
        this.form
            .get('legalCargoPublico')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.form
                        .get('cargoPublico')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(80),
                        ]);
                    this.form
                        .get('cargoPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('entidadPublico')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(150),
                        ]);
                    this.form
                        .get('entidadPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('vinculadoActualPublico')
                        ?.setValidators([Validators.required]);
                    this.form
                        .get('vinculadoActualPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.form.get('cargoPublico')?.setValidators(null);
                    this.form
                        .get('cargoPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form.get('entidadPublico')?.setValidators(null);
                    this.form
                        .get('entidadPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.form
                        .get('vinculadoActualPublico')
                        ?.setValidators(null);
                    this.form
                        .get('vinculadoActualPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });
        this.form
            .get('vinculadoActualPublico')
            .valueChanges.subscribe((e: string) => {
                if (e === 'N') {
                    this.form
                        .get('fechaDesvinculacionPublico')
                        ?.setValidators([
                            Validators.required,
                            this.validatedDate.bind(this),
                        ]);
                    this.form
                        .get('fechaDesvinculacionPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.form
                        .get('fechaDesvinculacionPublico')
                        ?.setValidators(null);
                    this.form
                        .get('fechaDesvinculacionPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });
    }

    public validacionCampos(
        campo: string,
        modificado: string,
        variable: string,
        type: String
    ): void {
        let mensaje = `<p>¿Estás seguro de editar el campo de <strong>${campo}</strong>?, ${modificado}.</p>`;
        Swal.fire({
            title: 'Guardar información',
            html: mensaje,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#a3a0a0',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
            } else {
                if (type === 'INTEGER') {
                    this.form.controls[variable].setValue(
                        Number(this.dataGeneralIncial[variable])
                    );
                }
                if (type === 'STRING') {
                    this.form.controls[variable].setValue(
                        this.dataGeneralIncial[variable].toString()
                    );
                }
            }
        });
    }

    /**
     * @description:
     */
    public onPostDatos(): void {
        const datos: FormularioCreditoMicro = this.form.getRawValue();
        const {
            numeroHijos,
            fechaIngresoFabrica,
            experienciaActividad,
            fechaVinculacion,
            fechaDesvinculacion,
            autorizacionBanco,
            telefonoNegocio,
            barrioResidencia,
            antiguedadActividad,
            valorSolicitado,
            plazo,
            personasACargo,
            fechaDesvinculacionExpuesta,
            fechaDesvinculacionPublico,
            fechaNacimiento,
            fechaExpedicion,
            estrato,
            ...data
        } = datos;
        const fechaNacimientoFormato = moment(
            fechaNacimiento.toString()
        ).format('YYYY-MM-DD');
        const fechaExpedicionFormato = moment(
            fechaExpedicion.toString()
        ).format('YYYY-MM-DD');
        const fechaDesvinculacionPublicoFormato = fechaDesvinculacionPublico
            ? moment(fechaDesvinculacionPublico.toString()).format('YYYY-MM-DD')
            : '0099-01-01';
        const fechaDesvinculacionExpuestaFormato = fechaDesvinculacionExpuesta
            ? moment(fechaDesvinculacionExpuesta.toString()).format(
                'YYYY-MM-DD'
            )
            : '0099-01-01';
        const fechaIngresoFabricaFormato = fechaIngresoFabrica
            ? moment(fechaIngresoFabrica.toString()).format('YYYY-MM-DD')
            : '0099-01-01';
        const fechaDesvinculacionFormato = fechaDesvinculacion
            ? moment(fechaDesvinculacion.toString()).format('YYYY-MM-DD')
            : '0099-01-01';
        const fechaVinculacionFormato = fechaVinculacion
            ? moment(fechaVinculacion.toString()).format('YYYY-MM-DD')
            : '0099-01-01';
        const numeroHijosFormato = Number(numeroHijos);
        const barrioResidenciaFormato = Number(barrioResidencia);
        const antiguedadActividadFormato = Number(antiguedadActividad);
        const personasACargoFormato = Number(personasACargo);
        const estratoFormato = Number(estrato);
        const valorSolicitadoFormato = Number(valorSolicitado);
        const plazoFormato = Number(plazo);
        const autorizacionBancoFormato = autorizacionBanco ? 'S' : 'N';
        const modificadaSolicitudFormato = valorSolicitadoFormato;
        const experienciaActividadFormato = experienciaActividad.toString();
        const telefonoNegocioFormato = telefonoNegocio.toString();
        const numeroSolicitud = this.form.controls['numeroSolicitud'].value === '' ? Number(this.numeroSolicitud) : this.form.controls.numeroSolicitud.value;

        delete data.numeroSolicitud;
        // delete data.otrosIngresos; modificadaSolicitud
        const datosFormularios: FormularioCreditoMicro = {
            numeroSolicitud,
            experienciaActividad: experienciaActividadFormato,
            fechaVinculacion: fechaVinculacionFormato,
            fechaDesvinculacion: fechaDesvinculacionFormato,
            fechaIngresoFabrica: fechaIngresoFabricaFormato,
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
            modificadaSolicitud: 'N',
            telefonoNegocio: telefonoNegocioFormato,
            ...data,
        };

        Swal.fire({
            title: 'Guardar información',
            text: '¿Está seguro de guardar información?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#a3a0a0',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.postFormularioFabrica(datosFormularios);
            }
        });
    }

    /**
     * @description: Guardado de datos fabrica
     */
    private postFormularioFabrica(datos: FormularioCreditoMicro): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando información',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        this.subscription$ = this.fabricaCreditoService
            .postDatosFabricaCredita(datos)
            .subscribe(
                () => {
                    Swal.fire(
                        'Completado',
                        'Información guardada con éxito',
                        'success'
                    );
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                    //   this.router.navigate(['/credit-factory/agenda-completion']);
                },
                (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        text: error.error.msg,
                    });
                }
            );
    }

    public validationPost(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            Object.keys(this.form.controls).forEach((key) => {
                // Get errors of every form control
                console.log(this.form.get(key).errors, key);
            });
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            }, 100);
        } else {
            this.onPostDatos();
        }
    }

    public formatearDataInicial(): void {

        //fechas

        this.form.controls.fechaDesvinculacionExpuesta.value === '0099-01-01' && this.form.controls.fechaDesvinculacionExpuesta.setValue('');
        this.form.controls.fechaDesvinculacionPublico.value === '0099-01-01' && this.form.controls.fechaDesvinculacionPublico.setValue('');
        this.form.controls.fechaNacimiento.value === '0099-01-01' && this.form.controls.fechaNacimiento.setValue('');
        this.form.controls.fechaExpedicion.value === '0099-01-01' && this.form.controls.fechaExpedicion.setValue('');

    }

    /**
 * @description hace scroll al primerer input invalido, puede ser un input o select
 */
    private scrollToFirstInvalidControl() {
        let firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-input-element');

        if (!firstInvalidControl) {
            firstInvalidControl = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-select');
            if (!firstInvalidControl) {
                firstInvalidControl = this.el.nativeElement.querySelector('.mat-error');
            }
        }
        console.log("firstInvalidControl", firstInvalidControl);

        firstInvalidControl?.focus(); //without smooth behavior
    }

    private validateExpedicion(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        let date: any = moment(valueControl)

        const errors = { expedicionDate: true };

        const nacimientoDate: any = moment(this.form?.controls.fechaNacimiento.value || '').format('YYYY-MM-DD');
        // Set the validation error on the matching control

        date.subtract(18, 'years');
        if (date.isBefore(nacimientoDate)) {

            return errors
        } else {
            return null
        }
    }
}
