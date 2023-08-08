import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import moment, { Moment } from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PermisosService } from 'app/core/services/permisos.service';
import { DecisionService } from 'app/core/services/decision.service';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatStepper } from '@angular/material/stepper';
@Component({
    selector: 'app-microcredito',
    templateUrl: './microcredito.component.html',
    styleUrls: ['./microcredito.component.scss']
})
export class MicrocreditoComponent implements OnInit, OnDestroy {
    form: FormGroup;
    datosBasicos: FormGroup;
    datosNegocio: FormGroup;
    datosDelCredito: FormGroup;
    verificacionOTP: FormGroup;

    @ViewChild('stepper') stepper: MatStepper;

    dataInicial;
    dataGeneralIncial;
    listadoActividadEconomica: any[];
    listadoCiudades: any[];
    listadoBarrios: any[];
    editable = true;
    timerInterval: any;
    public unidadNegocio: 1;
    public tipoIdentificacion: string = this.route.snapshot.paramMap.get('tipoIdentificacion');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('numeroSolicitud');
    public unSubscribe$: Subject<any> = new Subject<any>();
    public plazosCredito: any;
    public salarioMinimo$: Observable<any>;
    public salarioMinimo: number = 0;
    public habilitarInput: boolean = false;
    public numeroSolicitudTemporal: number;
    public otpValidado: boolean = false;
    public validandoOTPLoading: boolean = false;
    public changeTextOTP: boolean = false;
    orientationStep: StepperOrientation;
    fechaActual: any = moment().locale('co');
    public contador: number = 180;
    private filter = [2,6,10,12]

    primerPagoValidation = (d: any | null | undefined): boolean => {
        const day =  d?.date();

        const diff = d?.diff(this.fechaActual, 'days') + 1  | 0
        // Prevent Saturday and Sunday from being selected.
        return diff > 30 && diff < 60 && !!this.filter.find(item => day === item)

      };


    currentScreenSize: string;
    displayNameMap = new Map([
        [Breakpoints.XSmall, 'XSmall'],
        [Breakpoints.Small, 'Small'],
        [Breakpoints.Medium, 'Medium'],
        [Breakpoints.Large, 'Large'],
        [Breakpoints.XLarge, 'XLarge'],
    ]);

    constructor(
        private fb: FormBuilder,
        private _formularioCreditoService: FormularioCreditoService,
        private route: ActivatedRoute,
        private router: Router,
        private el: ElementRef,
        private genericaServices: GenericasService,
        public _permisosService: PermisosService,
        private decisionService: DecisionService,
        private breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit(): void {
        this.cargueInicial();
        this.datosBasicos = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
            primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
            email: ['', [Validators.required, Validators.email]],
            fechaNacimiento: ['', [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
            nivelEstudio: ['', [Validators.required]],
            estrato: ['', [Validators.required]],

            // genero: ['', Validators.required],
            // tipoCredito: ['', Validators.required],
            // categoriaSisben: ['', Validators.required]
        })

        this.datosNegocio = this.fb.group({
            genero: [''], // no se usa
            tipoActividad: ['', [Validators.required]],
            camaraComercio: ['', [Validators.required]],
            tipoLocal: ['', [Validators.required]],
            antiguedadLocal: [0],
            actividadEspecifica: ['', [Validators.required]],
            antiguedadActividad: ['', [Validators.required, Validators.min(0)]],
            antiguedadNegocio: ['', [Validators.required, Validators.min(0)]],
            departamentoNegocio: ['', [Validators.required]],
            ciudadNegocio: ['', [Validators.required]],
            barrioNegocio: ['', [Validators.required]],
            actividadEconomica: ['', [Validators.required]],
        })

        this.datosDelCredito = this.fb.group({
            valorCredito: ['', [Validators.required, Validators.min(this.salarioMinimo), Validators.max(100000000)]],
            plazoCredito: ['', [Validators.required]],
            asesorMicro: [''],
            autorizacionCentrales: [true],
            clausulaVeracidad: [true],
            terminosCondiciones: [true],
            valorCoutaAprox: [''],
            fechaPrimerPago: ['', [Validators.required,this.mayorAHoyValidation.bind(this)]],

            numeroOTP: [''],
        })

        this.verificacionOTP = this.fb.group({
            numeroOTP: [''],
        })

        this.form = this.fb.group({

            numeroOTP: [''],
            numOTP1: [''],
            numOTP2: [''],
            numOTP3: [''],
            numOTP4: [''],
            numOTP5: [''],
            numOTP6: [''],
        });

        this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .pipe(takeUntil(this.unSubscribe$))
            .subscribe(result => {

                for (const query of Object.keys(result.breakpoints)) {
                    if (result.breakpoints[query]) {
                        this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
                        if (this.currentScreenSize === 'XSmall') {
                            this.orientationStep = 'vertical'
                        } else {
                            this.orientationStep = 'horizontal'
                        }
                    }
                }
            });

        this.agregarValidaciones();

        this.datosBasicos.get('nivelEstudio')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });
        this.datosNegocio.get('tipoActividad')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });
        this.datosNegocio.get('camaraComercio')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });

        this.datosDelCredito.get('valorCredito')?.valueChanges.subscribe((valor: string) => {
            this.getPlazosCredito(!!valor ? valor : '0')
            // if(this.datosBasicos.get('tipoCredito').value === 'FM'){
            //     this.plazosCredito = {data: [{plazoMinimo: this.dataInicial.parametriaFintraMujer.plazoMinimo, plazoMaximo: this.dataInicial.parametriaFintraMujer.plazoMaximo}]}
            // }else{
            //     this.getPlazosCredito(!!valor ? valor : '0')
            // }
        })


        // this.datosBasicos.get('tipoCredito')?.valueChanges.subscribe((valor: string) => {
        //     if(valor === 'FM'){
        //         this.datosBasicos.controls['genero'].setValue('F')
        //         this.plazosCredito = {data: [{plazoMinimo: this.dataInicial.parametriaFintraMujer.plazoMinimo, plazoMaximo: this.dataInicial.parametriaFintraMujer.plazoMaximo}]}
        //         this.datosDelCredito.get('valorCredito').setValidators([Validators.required, Validators.min(this.dataInicial.parametriaFintraMujer.montoMinimo), Validators.max(this.dataInicial.parametriaFintraMujer.montoMaximo)])
        //     }else{
        //         this.getPlazosCredito(!!valor ? valor : '0')
        //         this.datosDelCredito.get('valorCredito').setValidators([Validators.required, Validators.min(this.salarioMinimo), Validators.max(100000000)])
        //     }
        // })

        setTimeout(() => {
            if ((this.tipoIdentificacion) && (this.identificacion)) {
                this.datosBasicos.controls.tipoDocumento.setValue(this.tipoIdentificacion);
                this.datosBasicos.controls.identificacion.setValue(this.identificacion);
                this.solicitudesFormularioSimulaciones()
                this.editable = true;

            }
        }, 1000);
        this.getSalarioMinimo();

        this.marginTopInputDynamic()

    }

    private cargueActividadEconomica() {
        const datos = {...this.datosBasicos.getRawValue(), ...this.datosNegocio.getRawValue()}
        const { nivelEstudio, tipoActividad, camaraComercio } = datos;
        if ((nivelEstudio) && (nivelEstudio != null) && (tipoActividad) && (tipoActividad != null) && (camaraComercio) && (camaraComercio != null)) {
            this._formularioCreditoService.cargueActividadEconomica(nivelEstudio, tipoActividad, camaraComercio).subscribe((resp: any) => {
                if (resp) {
                    this.listadoActividadEconomica = resp.data
                }
            })
        } else {
            this.listadoActividadEconomica = [];
        }
    }

    onStepChange($e) {
        if ($e.previouslySelectedIndex === 0 && this.datosBasicos.valid) {
            const datosAEnviar = { ...this.datosBasicos.getRawValue() }

            datosAEnviar.unidadNegocio = 22
            datosAEnviar.tipoTercero = 'T'


            const data = {
                celular: this.datosBasicos.get('celular').value,
                identificacion: this.datosBasicos.get('identificacion').value,
                tipoDocumento: this.datosBasicos.get('tipoDocumento').value,
                email: this.datosBasicos.get('email').value
            }

            if (data.celular && data.identificacion && data.identificacion && data.email) {
                this._formularioCreditoService.postPreSolicitud(data).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
                    this.numeroSolicitudTemporal = rep.data.numeroSolicitud;
                    if (rep.data.resultado !== 'OK') {
                        Swal.fire({
                            icon: 'info',
                            text: rep.data.msg,
                        }).then(rep => {
                            this.stepper.selectedIndex = 0;
                            this.form.reset();
                        });
                    }
                })
            }
        }




    }

    otpValidadoChange($e){
        this.otpValidado = $e;
    }

    public preSolicitud() {
        const data = {
            celular: this.datosBasicos.get('celular').value,
            identificacion: this.datosBasicos.get('identificacion').value,
            tipoDocumento: this.datosBasicos.get('tipoDocumento').value,
            email: this.datosBasicos.get('email').value
        }

        if (data.celular && data.identificacion && data.identificacion && data.email) {
            this._formularioCreditoService.postPreSolicitud(data).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
                this.numeroSolicitudTemporal = rep.data.numeroSolicitud;
                if (rep.data.resultado !== 'OK') {
                    Swal.fire({
                        icon: 'info',
                        text: rep.data.msg,
                    }).then(rep => {
                        this.datosBasicos.reset();
                    });
                }
            })
        }
    }
    ngAfterViewChecked(): void {
        //Called after every check of the component's view. Applies to components only.
        //Add 'implements AfterViewChecked' to the class.
        this.marginTopInputDynamic()
    }


    startTimer() {
        this.contador = 0;
        this.changeTextOTP = true;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = setInterval(() => {
            if (this.contador < 180) {
                this.contador++;
            }
        }, 1000)
    }

    private getSalarioMinimo() {
        this.genericaServices.getSalarioBasico().subscribe(({ data }) => {
            this.salarioMinimo = data.salarioMinimo;

            this.datosDelCredito.get('valorCredito').setValidators([Validators.required, Validators.min(data.salarioMinimo), Validators.max(100000000)])
        })
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
                    element.style['marginTop'] = '20px !important'
                    element.style.setProperty('margin-top', (titleSpanHeigth ? (titleSpanHeigth > 35 ? titleSpanHeigth + 10 + 'px' : titleSpanHeigth + 'px') : '30px'), 'important')
                    if (titleSpanHeigth > 30) {
                        if (titleSpanHeigth > 50) {
                            titleSpan.style.top = '-60px'
                        } else {
                            titleSpan.style.top = '-42px'
                        }
                    }
                });
            }, 1000);
        }
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

    private mayorAHoyValidation(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        const date = moment(valueControl).format('YYYY-MM-DD')
        const errors = { dateMayor: true };
        // Set the validation error on the matching control
        if (this.fechaActual.isAfter(date)) {

            return errors
        } else {
            return null
        }
    }

    private validateMayorEdad(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        const date = moment(valueControl).format('YYYY-MM-DD')
        const errors = { dateMayor: true };

        const fechaMayor = moment().locale('co')
        fechaMayor.subtract(18, 'years');
        // Set the validation error on the matching control

        if (fechaMayor.isBefore(date)) {

            return errors
        } else {
            return null
        }
    }

    private agregarValidaciones() {

        this.datosNegocio.get('tipoLocal').valueChanges.subscribe((e: string) => {
            if (e !== '6') {
                this.datosNegocio.get('antiguedadLocal')?.setValidators([Validators.required, Validators.min(0)])
                this.datosNegocio.get('antiguedadLocal')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.datosNegocio.get('antiguedadLocal')?.setValidators(null)
                this.datosNegocio.get('antiguedadLocal')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
    }

    public listarBarrios() {
        const datos = this.datosNegocio.getRawValue();
        const { ciudadNegocio } = datos;
        this._formularioCreditoService.listarBarriosMicro(ciudadNegocio).subscribe((resp: any) => {
            if (resp) {
                this.listadoBarrios = resp.data
            } else {
                this.listadoBarrios = []
            }
        })
    }

    public listarCiudades() {
        const datos = this.datosNegocio.getRawValue();
        const { departamentoNegocio } = datos;
        this._formularioCreditoService.listarCiudadesMicro(departamentoNegocio).subscribe((resp: any) => {
            if (resp) {
                this.listadoCiudades = resp.data
            } else {
                this.listadoCiudades = []
            }
        })
    }


    public getAsesor() {

        const cod = this.datosNegocio.controls.barrioNegocio.value
        this._formularioCreditoService.asesorMicro(cod).subscribe(rep => this.datosDelCredito.controls.asesorMicro.setValue(rep?.data?.resultado))
    }

    public solicitudesFormularioSimulaciones() {
        const datos = {...this.datosBasicos.getRawValue(), ...this.datosNegocio.getRawValue(), ...this.datosDelCredito.getRawValue()}
        const { tipoDocumento, identificacion, } = datos;
        if ((tipoDocumento) && (identificacion)) {
            this._formularioCreditoService.cargueSolicitudesFormularioSimulaciones(tipoDocumento, identificacion, 1).subscribe((resp: any) => {
                if (resp) {
                    this.datosBasicos.patchValue(resp.data);
                    this.datosNegocio.patchValue(resp.data);
                    this.datosDelCredito.patchValue(resp.data);

                    this.dataGeneralIncial = resp.data
                    this.getPlazosCredito(resp.data?.valorCredito | 0);
                    this.datosDelCredito.controls.valorCredito.setValue(resp.data?.valorCredito | 0)
                    this.datosDelCredito.controls.autorizacionCentrales.setValue(resp.data?.autorizacionCentrales === 'S');
                    this.datosDelCredito.controls.clausulaVeracidad?.setValue(resp.data?.clausulaVeracidad === 'S');
                    this.datosDelCredito.controls.terminosCondiciones.setValue(resp.data?.terminosCondiciones === 'S');
                    this.datosBasicos.controls.fechaNacimiento.setValue(resp.data?.fechaNacimiento === '0099-01-01' ? '' : resp.data?.fechaNacimiento)

                    if (resp.data?.celular) {
                        this.preSolicitud()
                    }
                    if (resp.data?.departamentoNegocio) {
                        this.listarCiudades();
                    }
                    if (resp.data?.ciudadNegocio) {
                        this.listarBarrios();
                    }
                    this.cargueActividadEconomica();

                    setTimeout(() => {
                        this.datosNegocio.controls['ciudadNegocio'].setValue(resp.data?.ciudadNegocio);
                        this.datosNegocio.controls['barrioNegocio'].setValue(resp.data?.barrioNegocio.toString());
                        this.datosNegocio.controls['actividadEconomica'].setValue(resp.data?.actividadEconomica);
                    }, 2500);

                }
            })
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
                this.filter = resp.data.diasPagoMicro.map(diaPago =>  Number(diaPago.valor));
            }
        })
    }

    /**
     * @description: Obtener limite de plazos por el valor de credito
     */
    public getPlazosCredito(valorCredito: any) {

        this._formularioCreditoService.validationPlazoMicro({ valorCredito }).subscribe(rep => {
            this.plazosCredito = rep

        })

    }



    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            }, 200);
            return;
        }
        let data = {...this.datosBasicos.getRawValue(), ...this.datosNegocio.getRawValue(), ...this.datosDelCredito.getRawValue()}
        const { barrioNegocio, valorCredito } = data;
        delete data.barrioNegocio
        data.barrioNegocio = Number(barrioNegocio)
        delete data.valorCredito
        data.valorCredito = Number(valorCredito)
        data.autorizacionCentrales = 'S',
            data.terminosCondiciones = 'S',
            data.clausulaVeracidad = 'S',
            data.unidadNegocio = 1,
            data.tipoTercero = 'T',
            data.autorizacionCentrales = 'S',
            data.clausulaVeracidad = 'S',
            data.terminosCondiciones = 'S'

        Swal.fire({ title: 'Cargando', html: 'Guardando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this._formularioCreditoService.postDatos(data).pipe(takeUntil(this.unSubscribe$)).subscribe((datos) => {
            if (datos.data.resultado === 'OK') {
                const dataAEnviar = {
                    numeroSolicitud: this.numeroSolicitud ? this.numeroSolicitud : this.numeroSolicitudTemporal,
                    destino: 'C',
                    idAgenda: 'V',
                    concepto: ''
                }

                this.decisionService.postSMSUnidades(dataAEnviar).subscribe(respuesta => {
                    Swal.fire(
                        'Completado',
                        datos.data.mensaje,
                    ).then((result) => {
                        if (result) {
                            this.form.reset();
                            this.irAtras()
                        }
                    })
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: datos.data.msg,
                }).then(rep => {
                    this.form.reset();
                });
            }


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
            } else {

                if (type === "INTEGER") {

                    this.form.controls[variable].setValue(Number(this.dataGeneralIncial[variable]));
                }
                if (type === "STRING") {
                    this.form.controls[variable].setValue(this.dataGeneralIncial[variable].toString());
                }
            }
        });
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

        firstInvalidControl?.focus(); //without smooth behavior
    }

    calcularCuotaAproximada(){
        const dataMap = {
            monto : this.datosDelCredito.get('valorCredito').value,
            num_cuotas : this.datosDelCredito.get('plazoCredito').value,
            fecha_pago : this.datosDelCredito.get('fechaPrimerPago').value,
            departamento : this.datosNegocio.get('departamentoNegocio').value,
            compra_cartera : "N"
          }

        if(dataMap.monto && dataMap.num_cuotas && dataMap.fecha_pago && dataMap.departamento){
            const nuevaFecha = moment(dataMap.fecha_pago).add(30,'days').format('YYYY-MM-DD')
            dataMap.fecha_pago = nuevaFecha
            this._formularioCreditoService.calcularValorCoutaAProximada(dataMap).subscribe(((rep: any) => {
                this.datosDelCredito.get('valorCoutaAprox').setValue(rep.info.data.valor_cuota)
            }))
        }
    }

    irAtras() {
        if (this._permisosService.ruta === 'agenda-comercial') {
            this.router.navigate([`/credit-factory/agenda-comercial`]);
        } else {
            this.router.navigate([`/credit-factory/agenda-venta-digital`]);
        }
    }

    ngOnDestroy(): void {
        this.unSubscribe$.next(null);
        this.unSubscribe$.complete();
        // this.agendaCompletacionService.resetSeleccionAgenda();
    }
}
