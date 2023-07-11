import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import Swal from 'sweetalert2';
import { PermisosService } from 'app/core/services/permisos.service';
import { LibranzaPublicaService } from 'app/core/services/libranza-publica.service';

@Component({
    selector: 'app-form-gestion-fabrica-libranza-publica',
    templateUrl: './form-gestion-fabrica-libranza-publica.component.html',
    styleUrls: ['./form-gestion-fabrica-libranza-publica.component.scss']
})
export class FormGestionFabricaLibranzaPublicaComponent implements OnInit {

    public form: FormGroup;
    public fabricaDatos;
    public unSubscribe$: Subject<any> = new Subject<any>();
    public dataInicial;
    public dataGeneralIncial: any;
    public agendaActual: string;
    public actividadEconomica: string;
    public unidadNegocio: any;
    permisoEditar: boolean;

    fechaActual: any = moment().locale("co");
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');

    public ciudades: any;
    public ciudadesNacimiento: any;
    public ciudadesNegocio: any;
    public barrios: any;
    public barriosNegocio: any;
    public ciudadesExpedicion: any;
    public plazosCredito: any;

    constructor(private _fabricaCreditoService: FabricaCreditoService,
        private _formularioCreditoService: FormularioCreditoService, private fb: FormBuilder, private route: ActivatedRoute
        , private fabricaCreditoService: FabricaCreditoService, private departamentosCiudadesService: DepartamentosCiudadesService,
        private el: ElementRef, public _permisosService: PermisosService, private _libranzaService: LibranzaPublicaService) {
        this.createFormulario();
    }

    ngOnInit(): void {
        this.cargueInicial();
        this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);

    }

    private cargueInicial() {
        let data = {
            entidad: "CONFIG-LIBRANZA-PUBLICA",
            unidadNegocio: 22
        };
        this._formularioCreditoService.cargueInicial(data).pipe(takeUntil(this.unSubscribe$)).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data
                console.log('data inicial', resp.data);

            }
        })
    }

    /**
     * @description :creando el formulario
     */

    private createFormulario() {
        this.form = this.fb.group({
            numeroSolicitud: [''],
            tipo: [''],
            creditoTitularLineas: [''],
            fechaIngresoFabrica: [''],
            tipoCredito: [''],
            emision: [''],
            tipoDocumento: [''],
            identificacion: [''],
            nombreCompleto: [''],
            descripcionTipoDocumento: [''],
            celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[3][0-9]+$')]],
            descripcionTipoCredito: [''],
            primerNombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            descripcionEstado: [''],
            descripcionSubestado: [''],
            segundoNombre: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            primerApellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            segundoApellido: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            estadoCivil: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            genero: ['', [Validators.required]],
            nacionalidad: ['', [Validators.required]],
            fechaNacimiento: ['', [Validators.required, this.validatedDate.bind(this)]],
            nivelEstudio: ['', [Validators.required]],
            // numeroHijos: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            personasACargo: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            fechaExpedicion: ['', [Validators.required, this.validatedDate.bind(this), this.validateExpedicion.bind(this)]],
            codigoDepartamentoExpedicion: ['', Validators.required],
            codigoCiudadExpedicion: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
            codigoDepartamento: ['', [Validators.required]],
            codigoDepartamentoNacimiento: ['', Validators.required],
            codigoCiudadNacimiento: ['', Validators.required],
            codigoCiudad: ['', Validators.required],
            barrioResidencia: ['', Validators.required],
            direccionResidencia: [''],
            direccionTipoVia: ['', [Validators.required]],
            direccionViaPrincipal: ['', [Validators.required, Validators.min(0)]],
            direccionNumeroVia: ['', [Validators.required, Validators.min(0)]],
            direccionDistanciaVia: ['', [Validators.required]],
            direccionComplemento: [''],
            tipoVivienda: ['', Validators.required],

            tipoDocumentoConyuge: [''],
            identificacionConyuge: [''],
            nombreCompletoConyuge: [''],
            celularConyuge: [''],
            primerNombreConyuge: [''],
            segundoNombreConyuge: [''],
            primerApellidoConyuge: [''],
            segundoApellidoConyuge: [''],
            poseeCuentaBancaria: ['', Validators.required],
            tipoCuentaBancaria: [''],
            entidadBancaria: [''],
            numeroCuentaBancaria: [''],
            autorizacionBanco: [false],
            legalCargoPublico: ['N', Validators.required],
            entidadPublico: [''],
            vinculadoActualPublico: [''],
            fechaDesvinculacionPublico: [''],
            legalPersonalExpuesta: ['N', Validators.required],
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
            legalDesarrollaActividadApnfd: ['N', Validators.required],
            legalCargoPartidoPolitico: ['N', Validators.required],
            legalOperacionCriptomoneda: ['N', Validators.required],
            tipoOperacionCripto: [''],
            tipoOperacionCriptomoneda: [''],
            legalOperacionExtranjera: ['N', Validators.required],
            tipoOperacionExtranjera: [''],
            declaroIngresoDeclaracionAuto: ['', Validators.required],
            otroIngresoDeclaracionAuto: [''],
            plazo: ['', [Validators.required]],
            descripcionTipo: [''],
            aplicaCodeudor: [''],
            valorSolicitadoWeb: [''],
            creditoCodeudorLineas: [''],
            modificadaSolicitud: [''],
            valorSolicitado: ['', [Validators.required, Validators.minLength(0)]],
            destinoCredito: ['', [Validators.required]],
            codigoBarrio: ['', [Validators.required]],
            cargoPublico: [''],
            entidad: [''],
            vinculadoActualmente: [''],
            fechaDesvinculacion: [''],
            actividadNoDesignada: [''],
            autoricacionDatosPersonalClaracionAuto: [''],
            clausulaAnticurrupcionClaracionAuto: [''],

            ocupacion: [''],
            tipoPension: [''],
            pagaduria: ['', Validators.required],
            otraPagaduria: [''],
            tipoContrato: [''],
            fechaVinculacion: [''],
            cargo: [''],
            claveVolante: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[\w\s]*$/)]],
            salarioBasico: [''],
            otrosIngresos: [''],
            descuentoNomina: [''],
            totalIngresosLaborales: [''],
            declaraRenta: ['N', [Validators.required]],
            declarante: ['N', [Validators.required]],
            codigoAsesor: ['']
        },
        );


        this.agregarValidaciones();
    }

    private validatedDate(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        const date = moment(valueControl).format('YYYY-MM-DD')
        const errors = { dateError: true };

        // Set the validation error on the matching control
        if (this.fechaActual.isBefore(date)) {

            return errors
        } else {
            return null
        }
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

    /**
     * @description: Obtiene la data para cargar al formulario
     */
    private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {


        this.fabricaCreditoService.getInformacionTipoTercero(numeroSolicitud, 'T').pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                this.dataGeneralIncial = data;
                this.form.patchValue(data);
                this.permisoEditar = !this._permisosService.permisoPorModuleTrazabilidad()
                if (!this.permisoEditar) {
                    this.form.disable();
                }
                this.formatearDataInicial();
                // this.form.controls.tipoVeredaNegocio.setValue(data.tipoVeredaNegocio === '' ? '2' : data.tipoVeredaNegocio);
                // this.form.controls.tipoVereda.setValue(data.tipoVereda === '' ? '2' : data.tipoVereda);

                // por defecto poner algunos select en NO
                this.form.controls['legalCargoPublico'].setValue(data.legalCargoPublico ? data.legalCargoPublico : 'N')
                this.form.controls['legalPersonalExpuesta'].setValue(data.legalPersonalExpuesta ? data.legalPersonalExpuesta : 'N')
                this.form.controls['legalCargoPartidoPolitico'].setValue(data.legalCargoPartidoPolitico ? data.legalCargoPartidoPolitico : 'N')
                this.form.controls['legalOperacionExtranjera'].setValue(data.legalOperacionExtranjera ? data.legalOperacionExtranjera : 'N')
                this.form.controls['legalOperacionCriptomoneda'].setValue(data.legalOperacionCriptomoneda ? data.legalOperacionCriptomoneda : 'N')
                this.form.controls['legalDesarrollaActividadApnfd'].setValue(data.legalDesarrollaActividadApnfd ? data.legalDesarrollaActividadApnfd : 'N')
                this.form.controls['declaraRenta'].setValue(data.declaraRenta ? data.declaraRenta : 'N')

                this.getPlazosCredito(this.form.controls.valorSolicitado.value)

                if (data.codigoDepartamento) {
                    this.getCiudades(data.codigoDepartamento);
                }
                if (data.codigoDepartamentoNacimiento) {
                    this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
                }

                if (data.codigoCiudad) {
                    this.getBarrios(data.codigoCiudad);
                }

                if (data.estrato) {
                    this.form.controls.estrato.setValue(data.estrato.toString());
                }
                if (data.codigoDepartamentoExpedicion) {
                    this.getCiudadesExpedicion(data.codigoDepartamentoExpedicion);
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
                    codigoBarrio: data.codigoBarrio,
                    score: data.score
                });

                this.agendaActual = data.agenda
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data;

            });
    }

    marginTopInputDynamic() {
        if (window.innerWidth < 600) {

            setTimeout(() => {
                let elementToMargin = this.el.nativeElement.querySelectorAll('.mat-form-field-flex');

                elementToMargin.forEach((element: HTMLElement) => {

                    let titleSpan: HTMLElement = element?.querySelector('.mat-form-field-infix').querySelector('.mat-form-field-label-wrapper');
                    titleSpan = titleSpan ? titleSpan : element?.querySelector('.mat-form-field-infix')?.querySelector('.mat-form-field-infix')

                    let titleSpanHeigth = titleSpan?.clientHeight
                    element.style.width = '20px' + ' !important';
                    element.style.setProperty('margin-top', (titleSpanHeigth ? (titleSpanHeigth + 'px') : '30px'), 'important')
                    titleSpan.style.top = '-' + (titleSpanHeigth + 6) + 'px'
                });
            }, 1000);
        }
    }

    /**
    * @description: Departamento de nacimiento
    */
    public seleccionDepartamento(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudades(codigo);
        // eliminar la ciudad y barrio anterior
        this.form.get('codigoCiudad').setValue('')
        this.form.get('barrioResidencia').setValue('')
    }

    /**
     * @description: Departamento de nacimiento
     */
    public seleccionDepartamentoNacimiento(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesNacimiento(codigo);
    }


    /**
  * @description: Departamento de expedicion
  */
    public seleccionDepartamentoExpedicion(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesExpedicion(codigo);
        // eliminar la ciudad
        this.form.get('codigoCiudadExpedicion').setValue('')
    }

    /**
     * @description: Selecciona el codigo para cargar el api barrios
     *
     */
    public seleccionCiudad(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getBarrios(codigo);
        this.form.get('barrioResidencia').setValue('')
    }


    /**
     * @description: Obtiene el listado de ciudades
     */
    private getCiudades(codigo: string): void {
        this.departamentosCiudadesService.getCiudades(codigo).subscribe(rep => {
            this.ciudades = rep
        })
    }

    /**
     * @description: Obtiene listado de ciudades nacimiento
     */
    private getCiudadesNacimiento(codigo: any): void {
        let cod = codigo;
        if (codigo.value) {
            cod = codigo.value;
        }
        this.departamentosCiudadesService.getCiudades(cod).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
            this.ciudadesNacimiento = rep;
            console.log('ress', rep);

        })
        this.form.get('codigoCiudadNacimiento').setValue('')
    }

    /**
     * @description: Obtiene listado de ciudades negocio
     */
    private getCiudadesNegocio(codigo: string): void {
        this.departamentosCiudadesService.getCiudades(codigo).subscribe(rep => {
            this.ciudadesNegocio = rep
        })
    }

    /**
    * @description: Obtiene listado de ciudades negocio
    */
    private getCiudadesExpedicion(codigo: string): void {
        this.departamentosCiudadesService.getCiudades(codigo).subscribe(rep => {
            this.ciudadesExpedicion = rep
        })
    }

    /**
     * @description: Obtiene el listado de barrios
     */
    private getBarrios(codigo: string): void {
        this.departamentosCiudadesService.getBarrios(codigo).subscribe(rep => {
            this.barrios = rep
        })
    }

    /**
   * @description: Obtiene el listado de barrios del negocio
   */
    private getBarriosNegocio(codigo: string): void {
        this.departamentosCiudadesService.getBarrios(codigo).subscribe(rep => {
            this.barriosNegocio = rep;
        })
    }



    /**
    * @description: Obtener limite de plazos por el valor de credito
    */
    private getPlazosCredito(valorCredito: number) {
        this._formularioCreditoService.validationPlazoMicro({ valorCredito }).subscribe(rep => {
            this.plazosCredito = rep
        })
    }

    public validationPost(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            }, 200);
        } else {
            this.onPostDatos();

        }
    }

    onPostDatos() {
        const datos = this.form.getRawValue();

        datos.tipoTercero = 'T'

        // dates
        datos.fechaNacimiento = moment(datos.fechaNacimiento.toString()).format('YYYY-MM-DD');
        datos.fechaExpedicion = moment(datos.fechaExpedicion.toString()).format('YYYY-MM-DD');
        datos.fechaDesvinculacionPublico = datos.fechaDesvinculacionPublico ? moment(datos.fechaDesvinculacionPublico.toString()).format('YYYY-MM-DD') : "0099-01-01";
        datos.fechaDesvinculacionExpuesta = datos.fechaDesvinculacionExpuesta ? moment(datos.fechaDesvinculacionExpuesta.toString()).format('YYYY-MM-DD') : "0099-01-01";

        // boolean
        datos.declarante = datos.declarante === 'S' 
        datos.estrato = Number(datos.estrato);
        datos.totalIngresosLaborales = Number(datos.totalIngresosLaborales);
        console.log('datos a enviar ', datos);

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
                this.postFormularioFabrica(datos);
            }
        });
    }

     /**
     * @description: Guardado de datos fabrica
     */
     private postFormularioFabrica(datos: any): void {

        Swal.fire('Cargando', 'Guardando información'); Swal.showLoading();
        setTimeout(() => {
            this.fabricaCreditoService.postDatosFabricaCredita(datos).pipe(takeUntil(this.unSubscribe$))
                .subscribe(() => {
                    Swal.fire(
                        'Completado',
                        'Información guardada con éxito',
                        'success',
                    ).then(rep => {
                        location.reload()
                    });
                    //   this.router.navigate(['/credit-factory/agenda-completion']);
                }, (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        text: error.error.msg,
                    });
                });
        }, 1);

    }

    public formatearDataInicial(): void {

        //fechas

        this.form.controls.fechaDesvinculacionExpuesta.value === '0099-01-01' && this.form.controls.fechaDesvinculacionExpuesta.setValue('');
        this.form.controls.fechaDesvinculacionPublico.value === '0099-01-01' && this.form.controls.fechaDesvinculacionPublico.setValue('');
        this.form.controls.fechaNacimiento.value === '0099-01-01' && this.form.controls.fechaNacimiento.setValue('');
        this.form.controls.fechaExpedicion.value === '0099-01-01' && this.form.controls.fechaExpedicion.setValue('');
        this.form.controls.fechaVinculacion.value === '0099-01-01' && this.form.controls.fechaVinculacion.setValue('');

        console.log(this.form.controls.fechaVinculacion.value === '0099-01-01' + this.form.controls.fechaVinculacion.value);

    }


    /**
     * @description hace scroll al primerer input invalido, puede ser un input o select
     */
    private scrollToFirstInvalidControl() {

        Object.keys(this.form.controls).forEach(key => {
            const controlErrors: any = this.form.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                });
            }
        });

        let firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-input-element');

        if (!firstInvalidControl) {
            firstInvalidControl = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-select');
            if (!firstInvalidControl) {
                firstInvalidControl = this.el.nativeElement.querySelector('.mat-error');
            }
            if (!firstInvalidControl) {
                firstInvalidControl = this.el.nativeElement.querySelector('.error');
            }
        }

        firstInvalidControl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })

    }


    private agregarValidaciones() {
        // disable todos los campos dinamicos
        this.form.get('otraPagaduria').disable()
        this.form.get('tipoContrato').disable()
        this.form.get('fechaVinculacion').disable()
        this.form.get('cargo').disable()
        this.form.get('otrosIngresos').disable()
        this.form.get('tipoPension').disable()


        // validaciones dinamicas
        this.form.get('pagaduria').valueChanges.subscribe((e: string) => {
            if (e === "999989999") {
                this.form.get('otraPagaduria')?.setValidators([Validators.required, Validators.min(0)])
                this.form.get('otraPagaduria')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('otraPagaduria')?.setValidators(null)
                this.form.get('otraPagaduria')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        this.form.get('ocupacion').valueChanges.subscribe((e: string) => {
            if (e === "EPLDO") {
                this.form.get('tipoContrato')?.setValidators([Validators.required, Validators.min(0)])
                this.form.get('tipoContrato')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('fechaVinculacion')?.setValidators([Validators.required, Validators.min(0)])
                this.form.get('fechaVinculacion')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('cargo')?.setValidators([Validators.required, Validators.min(0)])
                this.form.get('cargo')?.enable({ emitEvent: true, onlySelf: true })

                this.form.get('tipoPension')?.setValidators(null)
                this.form.get('tipoPension')?.disable({ emitEvent: true, onlySelf: true })
            }
            else {
                if (e === 'PENSI') {
                    this.form.get('tipoPension')?.setValidators([Validators.required, Validators.min(0)])
                    this.form.get('tipoPension')?.enable({ emitEvent: true, onlySelf: true })


                    this.form.get('tipoContrato')?.setValidators(null)
                    this.form.get('tipoContrato')?.disable({ emitEvent: true, onlySelf: true })
                    this.form.get('fechaVinculacion')?.setValidators(null)
                    this.form.get('fechaVinculacion')?.disable({ emitEvent: true, onlySelf: true })
                    this.form.get('cargo')?.setValidators(null)
                    this.form.get('cargo')?.disable({ emitEvent: true, onlySelf: true })
                }
            }


        })

        this.form.get('cargo').valueChanges.subscribe((e: string) => {
            if (e === "2" || e === "3" || e === "5") {
                this.form.get('otrosIngresos')?.setValidators([Validators.required, Validators.min(0)])
                this.form.get('otrosIngresos')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('otrosIngresos')?.setValidators(null)
                this.form.get('otrosIngresos')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // posee cuenta bancaria
        this.form.get('poseeCuentaBancaria').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
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

            if (e === 'N') {
                this.form.get('autorizacionBanco')?.setValidators([Validators.requiredTrue])
                this.form.get('autorizacionBanco')?.enable({ emitEvent: true, onlySelf: true })
            } else {
                this.form.get('autorizacionBanco')?.setValidators(null)
                this.form.get('autorizacionBanco')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // operacion Extranjera moneda Form
        this.form.get('legalOperacionExtranjera').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
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
            this.marginTopInputDynamic()
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
            this.marginTopInputDynamic()
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
            this.marginTopInputDynamic()
            if (e === 'N' && this.form.get('legalCargoPublico').value === 'S') {
                this.form.get('fechaDesvinculacionPublico')?.setValidators([Validators.required, this.validatedDate.bind(this)])
                this.form.get('fechaDesvinculacionPublico')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('fechaDesvinculacionPublico')?.setValidators(null)
                this.form.get('fechaDesvinculacionPublico')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // Datos cargo publico familiar
        this.form.get('legalPersonalExpuesta').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'S') {
                this.form.get('vinculacionExpuesta')?.setValidators([Validators.required, Validators.max(50)])
                this.form.get('vinculacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('nombreExpuesta')?.setValidators([Validators.required, Validators.maxLength(100)])
                this.form.get('nombreExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoIdentificacionExpuesta')?.setValidators([Validators.required])
                this.form.get('tipoIdentificacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionExpuesta')?.setValidators([Validators.required])
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
            this.marginTopInputDynamic()
            if (e === 'N' && this.form.get('legalPersonalExpuesta').value === 'S') {
                this.form.get('fechaDesvinculacionExpuesta')?.setValidators([Validators.required, this.validatedDate.bind(this)])
                this.form.get('fechaDesvinculacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('fechaDesvinculacionExpuesta')?.setValidators(null)
                this.form.get('fechaDesvinculacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // declaro ingresos Otros declaroIngresoDeclaracionAuto
        this.form.get('declaroIngresoDeclaracionAuto').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
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
            this.marginTopInputDynamic()
            if (e === 'CA' || e === 'UL') {
                console.log('enabled');
                this.form.get('primerNombreConyuge')?.setValidators([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)])
                this.form.get('primerNombreConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('primerApellidoConyuge')?.setValidators([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)])
                this.form.get('primerApellidoConyuge')?.enable({ emitEvent: true, onlySelf: true })

                this.form.get('segundoNombreConyuge')?.setValidators([Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)])
                this.form.get('segundoNombreConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('segundoApellidoConyuge')?.setValidators([Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)])
                this.form.get('segundoApellidoConyuge')?.enable({ emitEvent: true, onlySelf: true })

                this.form.get('tipoDocumentoConyuge')?.setValidators([Validators.required])
                this.form.get('tipoDocumentoConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionConyuge')?.setValidators([Validators.minLength(5), Validators.maxLength(10)])
                this.form.get('identificacionConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('celularConyuge')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('celularConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoEmpleoConyuge')?.setValidators([Validators.required])
                this.form.get('tipoEmpleoConyuge')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                console.log('disabled');

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
                this.form.get('tipoEmpleoConyuge')?.setValidators(null)
                this.form.get('tipoEmpleoConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('segundoNombreConyuge')?.setValidators(null)
                this.form.get('segundoApellidoConyuge')?.setValidators(null)
                this.form.get('segundoNombreConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('segundoApellidoConyuge')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

    }
}


