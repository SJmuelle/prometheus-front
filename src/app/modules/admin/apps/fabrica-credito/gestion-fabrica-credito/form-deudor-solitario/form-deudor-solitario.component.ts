import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import {
    FormularioCreditoMicro,
    FormularioDeudorSolidarioInterface,
} from 'app/core/interfaces/formulario-fabrica-credito.interface';
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
    styleUrls: ['./form-deudor-solitario.component.scss'],
})
export class FormDeudorSolitarioComponent implements OnInit, OnDestroy {
    public parentescos$: Observable<any>;
    public tipoDocumentos$: Observable<any>;
    public departamentos$: Observable<any>;
    public ciudades$: Observable<any>;
    public barrios$: Observable<any>;
    public tipoVia$: Observable<any>;
    public tipoVivienda$: Observable<any>;
    public subscription$: Subscription;
    public dataInicial: any;
    public unSubscribe$: Subject<any> = new Subject<any>();
    //variables iniciales
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    public formDeudorSolidario: FormGroup;
    fechaActual: any = moment().locale('co');
    constructor(
        private fb: FormBuilder,
        private genericaServices: GenericasService,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        private route: ActivatedRoute,
        private fabricaCreditoService: FabricaCreditoService,
        private _formularioCreditoService: FormularioCreditoService,
        private el: ElementRef
    ) {
        if (!this.numeroSolicitud) {
            return;
        } else {
            this.getInformacionCodeudorSolidario(
                this.numeroSolicitud,
                this.identificacion
            );
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

        this.addValidation();
    }

    ngOnDestroy(): void {
        this.unSubscribe$.next();
        this.unSubscribe$.complete();
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
            celular: [
                '',
                [
                    Validators.required,
                    Validators.minLength(7),
                    Validators.maxLength(10),
                    Validators.pattern('^[3][0-9]{9}$'),
                ],
            ],
            descripcionTipoCredito: [''],
            primerNombre: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/),
                ],
            ],
            descripcionEstado: [''],
            descripcionSubestado: [''],
            segundoNombre: [
                '',
                [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)],
            ],
            primerApellido: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/),
                ],
            ],
            segundoApellido: [
                '',
                [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)],
            ],
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
            direccionViaPrincipal: [
                '',
                [Validators.required, Validators.min(0)],
            ],
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
            codigoBarrio: [0],
            cargoPublico: [''],
            entidad: [''],
            vinculadoActualmente: [''],
            fechaDesvinculacion: [''],
            parentesco: ['', Validators.required],
            declaraRenta: [''],

            // datos posibles para el creado
            tipoSolicitante: ['Deudor solidario'],
            autoricacionDatosPersonalClaracionAuto: [false, [Validators.requiredTrue]],
            clausulaAnticurrupcionClaracionAuto: [false, [Validators.requiredTrue]],
        });
    }

    get tipoDocumento(): AbstractControl {
        return this.formDeudorSolidario.controls.tipoDocumento
    }

    /**
     * @description: Obtiene la data para cargar al formulario
     */
    private getInformacionCodeudorSolidario(
        numeroSolicitud: string,
        identificacion: string
    ): void {
        this.fabricaCreditoService
            .getInformacionTipoTercero(numeroSolicitud, 'S')
            .pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                this.formDeudorSolidario.patchValue(data);
                this.formatearDataInicial();
                if (data?.codigoDepartamento) {
                    this.getCiudades(data.codigoDepartamento);
                }
                if (data?.codigoCiudad) {
                    this.getBarrios(data.codigoCiudad);
                }
            });
    }

    private cargueInicial() {
        let data = {
            entidad: 'CONFIG-MICRO',
            unidadNegocio: 1,
        };
        this._formularioCreditoService
            .cargueInicial(data)
            .pipe(takeUntil(this.unSubscribe$))
            .subscribe((resp: any) => {
                if (resp) {
                    this.dataInicial = resp.data;
                }
            });
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
        this.departamentos$ =
            this.departamentosCiudadesService.getDepartamentos();
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
        if (this.formDeudorSolidario.invalid) {
            this.formDeudorSolidario.markAllAsTouched();
            setTimeout(() => {
                
                this.scrollToFirstInvalidControl();
            }, 200);
        } else {
            this.onPostDatos();
        }
    }

    /**
     * @description:
     */
    public onPostDatos(): void {
        let data = {
            tipo: 'S',
            recurso: 'tab-actualizar-solidario-microcredito',
            numeroSolicitud: Number(this.numeroSolicitud),
            ...this.formDeudorSolidario.getRawValue(),
            fechaDesvinculacionExpuesta:
                this.formDeudorSolidario.controls.fechaDesvinculacionExpuesta
                    .value === ''
                    ? '0099-01-01'
                    : this.formDeudorSolidario.controls
                        .fechaDesvinculacionExpuesta.value,
            fechaDesvinculacionPublico:
                this.formDeudorSolidario.controls.fechaDesvinculacionPublico
                    .value === ''
                    ? '0099-01-01'
                    : this.formDeudorSolidario.controls
                        .fechaDesvinculacionPublico.value,
            fechaDesvinculacion:
                this.formDeudorSolidario.controls.fechaDesvinculacion.value ===
                    ''
                    ? '0099-01-01'
                    : this.formDeudorSolidario.controls.fechaDesvinculacion
                        .value,
            clausulaAnticurrupcionClaracionAuto: 'S',
            autoricacionDatosPersonalClaracionAuto: 'S',
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
                this.postFormularioDeudorSolidario(data);
            }
        });
    }

    /**
     * @description: Guardado de datos fabrica
     */
    private postFormularioDeudorSolidario(datos: FormularioCreditoMicro): void {
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
                        location.reload();
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

    /**
     * @description hace scroll al primerer input invalido, puede ser un input o select
     */
    private scrollToFirstInvalidControl() {
        let firstInvalidControl: HTMLElement = this.el.nativeElement
            .querySelector('.mat-form-field-invalid')
            ?.querySelector('.mat-input-element');

        if (!firstInvalidControl) {
            firstInvalidControl = this.el.nativeElement
                .querySelector('.mat-form-field-invalid')
                ?.querySelector('.mat-select');
            if (!firstInvalidControl) {
                firstInvalidControl =
                    this.el.nativeElement.querySelector('.mat-error');
            }
        }

        firstInvalidControl?.focus(); //without smooth behavior
    }

    public formatearDataInicial(): void {
        //fechas

        this.formDeudorSolidario.controls.fechaDesvinculacionExpuesta.value ===
            '0099-01-01' &&
            this.formDeudorSolidario.controls.fechaDesvinculacionExpuesta.setValue(
                ''
            );
        this.formDeudorSolidario.controls.fechaDesvinculacionPublico.value ===
            '0099-01-01' &&
            this.formDeudorSolidario.controls.fechaDesvinculacionPublico.setValue(
                ''
            );
        this.formDeudorSolidario.controls.fechaNacimiento.value ===
            '0099-01-01' &&
            this.formDeudorSolidario.controls.fechaNacimiento.setValue('');
        this.formDeudorSolidario.controls.fechaExpedicion.value ===
            '0099-01-01' &&
            this.formDeudorSolidario.controls.fechaExpedicion.setValue('');

        this.formDeudorSolidario.controls.autoricacionDatosPersonalClaracionAuto.setValue(this.formDeudorSolidario.controls.autoricacionDatosPersonalClaracionAuto.value === 'S')
        this.formDeudorSolidario.controls.clausulaAnticurrupcionClaracionAuto.setValue(this.formDeudorSolidario.controls.clausulaAnticurrupcionClaracionAuto.value === 'S')
    }

    // validaciones dinamicas
    public addValidation() {
        // operacion Extranjera moneda Form
        this.formDeudorSolidario
            .get('legalOperacionExtranjera')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.formDeudorSolidario
                        .get('tipoOperacionExtranjera')
                        ?.setValidators([Validators.required]);
                    this.formDeudorSolidario
                        .get('tipoOperacionExtranjera')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.formDeudorSolidario
                        .get('tipoOperacionExtranjera')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('tipoOperacionExtranjera')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        // operacion cripto moneda Form
        this.formDeudorSolidario
            .get('legalOperacionCriptomoneda')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.formDeudorSolidario
                        .get('tipoOperacionCriptomoneda')
                        ?.setValidators([Validators.required]);
                    this.formDeudorSolidario
                        .get('tipoOperacionCriptomoneda')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.formDeudorSolidario
                        .get('tipoOperacionCriptomoneda')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('tipoOperacionCriptomoneda')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        // Datos cargo publico familiar
        this.formDeudorSolidario
            .get('legalPersonalExpuesta')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.formDeudorSolidario
                        .get('vinculacionExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.max(50),
                        ]);
                    this.formDeudorSolidario
                        .get('vinculacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('nombreExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(100),
                        ]);
                    this.formDeudorSolidario
                        .get('nombreExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('tipoIdentificacionExpuesta')
                        ?.setValidators([Validators.required]);
                    this.formDeudorSolidario
                        .get('tipoIdentificacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('identificacionExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.minLength(5),
                            Validators.maxLength(10),
                            Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
                        ]);
                    this.formDeudorSolidario
                        .get('identificacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('nacionalidadExpuesta')
                        ?.setValidators([Validators.required]);
                    this.formDeudorSolidario
                        .get('nacionalidadExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('entidadExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(150),
                        ]);
                    this.formDeudorSolidario
                        .get('entidadExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('cargoExpuesta')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(80),
                        ]);
                    this.formDeudorSolidario
                        .get('cargoExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('vinculadoActualExpuesta')
                        ?.setValidators([Validators.required]);
                    this.formDeudorSolidario
                        .get('vinculadoActualExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.formDeudorSolidario
                        .get('vinculacionExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('vinculacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('nombreExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('nombreExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('tipoIdentificacionExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('tipoIdentificacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('identificacionExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('identificacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('nacionalidadExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('nacionalidadExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('entidadExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('entidadExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('cargoExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('cargoExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('vinculadoActualExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('vinculadoActualExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });
        this.formDeudorSolidario
            .get('vinculadoActualExpuesta')
            .valueChanges.subscribe((e: string) => {
                if (e === 'N') {
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionExpuesta')
                        ?.setValidators([
                            Validators.required,
                            this.validatedDate.bind(this),
                        ]);
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionExpuesta')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionExpuesta')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionExpuesta')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });

        // cargo publico
        this.formDeudorSolidario
            .get('legalCargoPublico')
            .valueChanges.subscribe((e: string) => {
                if (e === 'S') {
                    this.formDeudorSolidario
                        .get('cargoPublico')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(80),
                        ]);
                    this.formDeudorSolidario
                        .get('cargoPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('entidadPublico')
                        ?.setValidators([
                            Validators.required,
                            Validators.maxLength(150),
                        ]);
                    this.formDeudorSolidario
                        .get('entidadPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('vinculadoActualPublico')
                        ?.setValidators([Validators.required]);
                    this.formDeudorSolidario
                        .get('vinculadoActualPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.formDeudorSolidario
                        .get('cargoPublico')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('cargoPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('entidadPublico')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('entidadPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                    this.formDeudorSolidario
                        .get('vinculadoActualPublico')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('vinculadoActualPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });
        this.formDeudorSolidario
            .get('vinculadoActualPublico')
            .valueChanges.subscribe((e: string) => {
                if (e === 'N') {
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionPublico')
                        ?.setValidators([
                            Validators.required,
                            this.validatedDate.bind(this),
                        ]);
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionPublico')
                        ?.enable({ emitEvent: true, onlySelf: true });
                } else {
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionPublico')
                        ?.setValidators(null);
                    this.formDeudorSolidario
                        .get('fechaDesvinculacionPublico')
                        ?.disable({ emitEvent: true, onlySelf: true });
                }
            });
    }

    public cambiarNacionalidad(e: MatSelectChange) {
        if (e.value === 'CC') {
            this.formDeudorSolidario.controls.nacionalidadExpuesta.setValue('COLOMBIANO(A)');
        }
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
}
