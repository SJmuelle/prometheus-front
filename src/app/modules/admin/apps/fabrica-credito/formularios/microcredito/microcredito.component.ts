import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-microcredito',
    templateUrl: './microcredito.component.html',
    styleUrls: ['./microcredito.component.scss']
})
export class MicrocreditoComponent implements OnInit, OnDestroy {
    form: FormGroup;
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
    public plazosCredito$: Observable<any>;
    public salarioMinimo$: Observable<any>;
    public salarioMinimo: number = 0;
    public habilitarInput: boolean = false;
    public numeroSolicitudTemporal: number;
    public otpValidado: boolean = false;
    public validandoOTPLoading: boolean = false;
    public changeTextOTP: boolean = false;
    fechaActual: any = moment().locale('co');
    public contador: number = 180;

    constructor(
        private fb: FormBuilder,
        private _formularioCreditoService: FormularioCreditoService,
        private route: ActivatedRoute,
        private router: Router,
        private el: ElementRef,
        private genericaServices: GenericasService,
    ) { }

    ngOnInit(): void {
        this.cargueInicial();
        this.form = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
            primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
            email: ['', [Validators.required, Validators.email]],
            fechaNacimiento: ['', [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
            nivelEstudio: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
            genero: [''],
            tipoActividad: ['', [Validators.required]],
            camaraComercio: ['', [Validators.required]],
            tipoLocal: ['', [Validators.required]],
            actividadEconomica: ['', [Validators.required]],
            actividadEspecifica: ['', [Validators.required]],
            antiguedadActividad: ['', [Validators.required, Validators.min(0)]],
            antiguedadNegocio: ['', [Validators.required, Validators.min(0)]],
            departamentoNegocio: ['', [Validators.required]],
            ciudadNegocio: ['', [Validators.required]],
            barrioNegocio: ['', [Validators.required]],
            valorCredito: ['', [Validators.required, Validators.min(this.salarioMinimo), Validators.max(100000000)]],
            plazoCredito: ['', [Validators.required]],
            asesorMicro: [''],
            antiguedadLocal: [0],
            autorizacionCentrales: [true],
            clausulaVeracidad: [true],
            terminosCondiciones: [true],
            numeroOTP: [''],
            numOTP1: [''],
            numOTP2: [''],
            numOTP3: [''],
            numOTP4: [''],
            numOTP5: [''],
            numOTP6: [''],
        });

        this.agregarValidaciones();

        this.form.get('nivelEstudio')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });
        this.form.get('tipoActividad')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });
        this.form.get('camaraComercio')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });

        setTimeout(() => {
            if ((this.tipoIdentificacion) && (this.identificacion)) {
                this.form.controls.tipoDocumento.setValue(this.tipoIdentificacion);
                this.form.controls.identificacion.setValue(this.identificacion);
                this.solicitudesFormularioSimulaciones()
                this.editable = true;

            }
        }, 1000);
        this.getSalarioMinimo();
    }

    private cargueActividadEconomica() {
        const datos = this.form.getRawValue();
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

    public preSolicitud() {
        const data = {
            celular: this.form.get('celular').value,
            identificacion: this.form.get('identificacion').value,
            tipoDocumento: this.form.get('tipoDocumento').value,
            email: this.form.get('email').value
        }
        this._formularioCreditoService.postPreSolicitud(data).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
            this.numeroSolicitudTemporal = rep.data.numeroSolicitud;
            if (rep.data.msg !== 'OK') {
                Swal.fire({
                    icon: 'info',
                    text: rep.data.msg,
                });
                this.form.reset();
            }

        })

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

            this.form.get('valorCredito').setValidators([Validators.required, Validators.min(data.salarioMinimo), Validators.max(100000000)])
        })
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

        this.form.get('tipoLocal').valueChanges.subscribe((e: string) => {
            if (e !== '6') {
                this.form.get('antiguedadLocal')?.setValidators([Validators.required, Validators.min(0)])
                this.form.get('antiguedadLocal')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('antiguedadLocal')?.setValidators(null)
                this.form.get('antiguedadLocal')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
    }

    public listarBarrios() {
        const datos = this.form.getRawValue();
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
        const datos = this.form.getRawValue();
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

        const cod = this.form.controls.barrioNegocio.value
        this._formularioCreditoService.asesorMicro(cod).subscribe(rep => this.form.controls.asesorMicro.setValue(rep?.data?.resultado))
    }

    public solicitudesFormularioSimulaciones() {
        const datos = this.form.getRawValue();
        const { tipoDocumento, identificacion, } = datos;
        if ((tipoDocumento) && (identificacion)) {
            this._formularioCreditoService.cargueSolicitudesFormularioSimulaciones(tipoDocumento, identificacion, 1).subscribe((resp: any) => {
                if (resp) {
                    this.form.patchValue(resp.data);

                    this.dataGeneralIncial = resp.data
                    this.getPlazosCredito(resp.data?.valorCredito | 0);
                    this.form.controls.valorCredito.setValue(resp.data?.valorCredito | 0)
                    this.form.controls.autorizacionCentrales.setValue(resp.data?.autorizacionCentrales === 'S');
                    this.form.controls.clausulaVeracidad?.setValue(resp.data?.clausulaVeracidad === 'S');
                    this.form.controls.terminosCondiciones.setValue(resp.data.terminosCondiciones === 'S');
                    this.form.controls.fechaNacimiento.setValue(resp.data.fechaNacimiento === '0099-01-01' ? '' : resp.data.fechaNacimiento)

                    if (resp.data.celular) {
                        this.preSolicitud()
                    }
                    if (resp.data.departamentoNegocio) {
                        this.listarCiudades();
                    }
                    if (resp.data.ciudadNegocio) {
                        this.listarBarrios();
                    }
                    this.cargueActividadEconomica();

                    setTimeout(() => {
                        this.form.controls['ciudadNegocio'].setValue(resp.data.ciudadNegocio);
                        this.form.controls['barrioNegocio'].setValue(resp.data.barrioNegocio.toString());
                        this.form.controls['actividadEconomica'].setValue(resp.data.actividadEconomica);
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

            }
        })
    }

    /**
     * @description: Obtener limite de plazos por el valor de credito
     */
    public getPlazosCredito(valorCredito: number) {

        this.plazosCredito$ = this._formularioCreditoService.validationPlazoMicro({ valorCredito })

    }

    solicitarCodigo(): void {


        if (this.form.valid) {
            const data = {
                numeroSolicitud: this.numeroSolicitudTemporal ? this.numeroSolicitudTemporal : this.numeroSolicitud,
                tipo: 'T'
            }
            this.validandoOTPLoading = true;
            this._formularioCreditoService.solicitarOTP(data).subscribe(rep => {
                if (rep.status === 200) {
                }
                this.startTimer();
                this.validandoOTPLoading = false;

            })
        } else {
            this.scrollToFirstInvalidControl();
        }


    }

    validarCodigo(): void {
        const numero = this.form.get('numOTP1').value + this.form.get('numOTP2').value + this.form.get('numOTP3').value
            + this.form.get('numOTP4').value + this.form.get('numOTP5').value + this.form.get('numOTP6').value

        const data = {
            numeroSolicitud: this.numeroSolicitudTemporal ? this.numeroSolicitudTemporal : this.numeroSolicitud,
            tipoTercero: 'T',
            numeroOTP: numero
        }

        this._formularioCreditoService.validatarOTP(data).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
            this.otpValidado = rep.data.resultado === 'OK'
        }, err => {
            this.cleanOTPNumbers()
        })
    }

    cleanOTPNumbers() {
        this.form.get('numOTP1').setValue('')
        this.form.get('numOTP2').setValue('')
        this.form.get('numOTP3').setValue('')
        this.form.get('numOTP4').setValue('')
        this.form.get('numOTP5').setValue('')
        this.form.get('numOTP6').setValue('')
        let elemeOne: HTMLElement = this.el.nativeElement.querySelector('#num1');

        console.log("Limpiando");

        elemeOne.focus();
    }


    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            }, 200);
            return;
        }
        let data = this.form.getRawValue();

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

        this._formularioCreditoService.postDatos(data).subscribe((datos) => {
            Swal.fire(
                'Completado',
                datos.data.mensaje,
                'success'
            ).then((result) => {
                if (result) {
                    this.form.reset();
                    this.router.navigate([`/credit-factory/agenda-venta-digital`]);
                }
            })
            setTimeout(() => {
                this.form.reset();
                this.router.navigate([`/credit-factory/agenda-venta-digital`]);
            }, 2000);
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

    changeFocus() {
        let firstInvalidControl2: HTMLElement = this.el.nativeElement.querySelector('#num2');
        let firstInvalidControl3: HTMLElement = this.el.nativeElement.querySelector('#num3');
        let firstInvalidControl4: HTMLElement = this.el.nativeElement.querySelector('#num4');
        let firstInvalidControl5: HTMLElement = this.el.nativeElement.querySelector('#num5');
        let firstInvalidControl6: HTMLElement = this.el.nativeElement.querySelector('#num6');

        if (this.form.get('numOTP1').value !== '') {
            if (this.form.get('numOTP2').value === '') {
                firstInvalidControl2.focus();
            } else {
                if (this.form.get('numOTP3').value === '') {
                    firstInvalidControl3.focus();
                } else {
                    if (this.form.get('numOTP4').value === '') {
                        firstInvalidControl4.focus();
                    } else {
                        if (this.form.get('numOTP5').value === '') {
                            firstInvalidControl5.focus();
                        } else {
                            if (this.form.get('numOTP6').value === '') {
                                firstInvalidControl6.focus();
                            }
                        }
                    }
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.unSubscribe$.next(null);
        this.unSubscribe$.complete();
        // this.agendaCompletacionService.resetSeleccionAgenda();
    }
}
