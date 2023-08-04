import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs'
import moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { LibranzaPublicaService } from 'app/core/services/libranza-publica.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { GenericasService } from 'app/core/services/genericas.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-libranza-publica',
    templateUrl: './libranza-publica.component.html',
    styleUrls: ['./libranza-publica.component.scss'],
    animations: fuseAnimations,
})
export class LibranzaPublicaComponent implements OnInit, AfterViewInit {
    @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
    @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
    @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
    @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;
    @ViewChild('input5') input5!: ElementRef<HTMLInputElement>;
    @ViewChild('input6') input6!: ElementRef<HTMLInputElement>;

    @ViewChild('stepper') stepper: MatStepper;


    form: FormGroup;
    numeroOTP: string;
    datosBasicos: FormGroup;
    datosLaborares: FormGroup;
    datosCredito: FormGroup;
    validationOTPForm: FormGroup;
    orientationStep: StepperOrientation;
    currentScreenSize: string;
    dataInicial;
    numeroSolicitudTemporal: number;
    displayNameMap = new Map([
        [Breakpoints.XSmall, 'XSmall'],
        [Breakpoints.Small, 'Small'],
        [Breakpoints.Medium, 'Medium'],
        [Breakpoints.Large, 'Large'],
        [Breakpoints.XLarge, 'XLarge'],
    ]);
    destroyed = new Subject<void>();
    fechaActual: any = moment().locale('co');
    mayorDeEdadFecha: any = moment().locale('co').subtract('18', 'years');
    public contador: number = 180;
    public salarioMinimo: number;
    otpValidado: boolean = false;
    changeTextOTP: boolean = false;
    timerInterval: any;
    validandoOTPLoading: boolean = false;
    public actualizandoDatosOTP: boolean = false;
    public solicitarOTP: boolean = false;

    constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private el: ElementRef,
        private _formularioCreditoService: FormularioCreditoService,
        private _libranzaService: LibranzaPublicaService, private _dialog: MatDialog,private _genericaServices: GenericasService) { }


    ngAfterViewInit() {
        this.focusNextInput(this.input1.nativeElement, this.input2.nativeElement);
        this.focusNextInput(this.input2.nativeElement, this.input3.nativeElement);
        this.focusNextInput(this.input3.nativeElement, this.input4.nativeElement);
        this.focusNextInput(this.input4.nativeElement, this.input5.nativeElement);
        this.focusNextInput(this.input5.nativeElement, this.input6.nativeElement);

        this.focusPreviusInput(this.input2.nativeElement, this.input1.nativeElement);
        this.focusPreviusInput(this.input3.nativeElement, this.input2.nativeElement);
        this.focusPreviusInput(this.input4.nativeElement, this.input3.nativeElement);
        this.focusPreviusInput(this.input5.nativeElement, this.input4.nativeElement);
        this.focusPreviusInput(this.input6.nativeElement, this.input5.nativeElement);

    }


    ngOnInit(): void {
        this.datosBasicos = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            documento: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
            celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            genero: ['', Validators.required],
            fechaNacimiento: [this.mayorDeEdadFecha.format('YYYY-MM-DD'), [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
            codigoAsesor: [''],
        });

        this.datosLaborares = this.fb.group({
            ocupacion: ['', [Validators.required]],
            pagaduria: ['', [Validators.required]],
            otraPagaduria: [''],
            tipoContrato: [''],
            fechaVinculacion: [''],
            // la de abajo no esta asignada,

            fechaFinalizacionContrato: [''],
            cargo: [''],
            tipoPension: [''],
            salarioBasico: ['', [Validators.required, Validators.min(0)]],
            otrosIngresos: [''],
            descuentoNomina: ['', [Validators.required]],

        });

        this.datosCredito = this.fb.group({
            plazo: ['',Validators.required],
            monto: ['', Validators.required]
        })

        this.validationOTPForm = this.fb.group({
            numeroOTP: ['', [Validators.required, Validators.minLength(6)]],
        })



        this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .pipe(takeUntil(this.destroyed))
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


        this.cargueInicial()
        this.getSalarioMinimo();
        this.agregarValidaciones()
    }

    private agregarValidaciones() {
        // disable todos los campos dinamicos
        this.datosLaborares.get('otraPagaduria').disable()
        this.datosLaborares.get('tipoContrato').disable()
        this.datosLaborares.get('fechaVinculacion').disable()
        this.datosLaborares.get('cargo').disable()
        this.datosLaborares.get('otrosIngresos').disable()
        this.datosLaborares.get('tipoPension').disable()


        // validaciones dinamicas
        this.datosLaborares.get('pagaduria').valueChanges.subscribe((e: string) => {
            if (e === "999989999") {
                this.datosLaborares.get('otraPagaduria')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('otraPagaduria')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.datosLaborares.get('otraPagaduria')?.setValidators(null)
                this.datosLaborares.get('otraPagaduria')?.disable({ emitEvent: true, onlySelf: true })

              //  this.datosLaborares.controls['otraPagaduria'].setValue('')
            }
        })

        this.datosLaborares.get('ocupacion').valueChanges.subscribe((e: string) => {
            if (e === "EPLDO") {
                this.datosLaborares.get('tipoContrato')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('tipoContrato')?.enable({ emitEvent: true, onlySelf: true })
                this.datosLaborares.get('fechaVinculacion')?.setValidators([Validators.required, this.validatedDate.bind(this)])
                this.datosLaborares.get('fechaVinculacion')?.enable({ emitEvent: true, onlySelf: true })
                this.datosLaborares.get('cargo')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('cargo')?.enable({ emitEvent: true, onlySelf: true })

                this.datosLaborares.get('tipoPension')?.setValidators(null)
                this.datosLaborares.get('tipoPension')?.disable({ emitEvent: true, onlySelf: true })

             //   this.datosLaborares.controls['tipoPension'].setValue('')
            }
            else {
                if (e === 'PENSI') {
                    this.datosLaborares.get('tipoPension')?.setValidators([Validators.required, Validators.min(0)])
                    this.datosLaborares.get('tipoPension')?.enable({ emitEvent: true, onlySelf: true })
                    this.datosLaborares.get('tipoContrato')?.setValidators(null)
                    this.datosLaborares.get('tipoContrato')?.disable({ emitEvent: true, onlySelf: true })
                    this.datosLaborares.get('fechaVinculacion')?.setValidators(null)
                    this.datosLaborares.get('fechaVinculacion')?.disable({ emitEvent: true, onlySelf: true })
                    this.datosLaborares.get('cargo')?.setValidators(null)
                    this.datosLaborares.get('cargo')?.disable({ emitEvent: true, onlySelf: true })

                    // this.datosLaborares.controls['cargo'].setValue('')
                    // this.datosLaborares.controls['fechaVinculacion'].setValue('')
                    // this.datosLaborares.controls['tipoContrato'].setValue('')
                }
            }


        })

        this.datosLaborares.get('cargo').valueChanges.subscribe((e: string) => {
            if (e === "2" || e === "3" || e === "5") {
                this.datosLaborares.get('otrosIngresos')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('otrosIngresos')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.datosLaborares.get('otrosIngresos')?.setValidators(null)
                this.datosLaborares.get('otrosIngresos')?.disable({ emitEvent: true, onlySelf: true })

               // this.datosLaborares.controls['otrosIngresos'].setValue('')
            }
        })

        this.validationOTPForm.get('numeroOTP').valueChanges.subscribe((e: string) => {
            if(e.length === 6 && !this.otpValidado ){
                this.validarCodigo()
            }
        })
    }

    ngAfterViewChecked(): void {
        //Called after every check of the component's view. Applies to components only.
        //Add 'implements AfterViewChecked' to the class.
        this.marginTopInputDynamic()
    }

    public focusNextInput(currentInput: HTMLInputElement, nextInput: HTMLInputElement): void {
        currentInput.addEventListener('input', ($e) => {
            if (currentInput.value.length === 1) {
                nextInput.focus();
            }
        });
    }

    public focusPreviusInput(currentInput: HTMLInputElement, previusInput: HTMLInputElement): void {
        currentInput.addEventListener('keydown', ($e) => {
            if ($e.key === 'Backspace') {
                // bug donde primero se hace el focus y luego se borra, entonces se borraba el anterior y no el actual
                setTimeout(() => {
                    previusInput.focus();
                }, 100);
            }
        });
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

    private cargueInicial() {
        let data = {
            entidad: "CARGUE-LIBRANZA-PUBLICA",
            unidadNegocio: 23
        };
        this._libranzaService.cargueInicialFormularioCorto(data).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data

            }
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

    guardar() {
        const dataToSend = { ...this.datosBasicos.getRawValue(), ...this.datosLaborares.getRawValue() }

        this.formatearDatosAntesDeEnviar(dataToSend)
        Swal.fire({ title: 'Cargando', html: 'Guardando información, no cierre la pestaña', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._libranzaService.guardarFormularioCorto(dataToSend).subscribe(rep => {

            Swal.fire('Guardado', 'Solicitud guardada con éxito', 'success')
        }, err => {
            Swal.fire('Error', 'Error al guardar ' + err?.error?.msg, 'error')
        })

    }

    formatearDatosAntesDeEnviar(formData) {
        formData.primerNombre = formData.primerNombre?.trim()
        formData.primerApellido = formData.primerApellido?.trim()

        formData.numeroSolicitud =  this.numeroSolicitudTemporal


        this.formatearDatos(formData);
    }

    onStepChange($e) {
        if ($e.previouslySelectedIndex === 0 && this.datosBasicos.valid) {
            const datosAEnviar = { ...this.datosBasicos.getRawValue() }

            datosAEnviar.unidadNegocio = 23
            datosAEnviar.tipoTercero = 'T'


            this._libranzaService.guardarDatosBasicos(datosAEnviar).subscribe(data => {

                if(data.data.msg !== 'OK'){
                    Swal.fire({
                        icon: 'info',
                        text: data.data.msg,
                    }).then(rep => {
                        this.stepper.selectedIndex = 0;
                        this.datosBasicos.reset();

                    });
                }else{
                    this.numeroSolicitudTemporal = data.data.numeroSolicitud
                }
            })
        }else if($e.previouslySelectedIndex === 1){
            this.datosBasicos.get('celular').setValue(this.datosBasicos.get('celular').value)
        }
    }



    preCargueDeDatos() {
        const tipoDocumento = this.datosBasicos.get('tipoDocumento').value
        const documento = this.datosBasicos.get('documento').value

        if (tipoDocumento && documento) {
            this._libranzaService.consultarDatosSolicitudConDocumento({ tipoDocumento, documento }).subscribe(rep => {
                this.datosBasicos.patchValue(rep.data);
            })
        }
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

    updateOTPInput() {
        const num1 = this.input1.nativeElement.value;
        const num2 = this.input2.nativeElement.value;
        const num3 = this.input3.nativeElement.value;
        const num4 = this.input4.nativeElement.value;
        const num5 = this.input5.nativeElement.value;
        const num6 = this.input6.nativeElement.value;


        this.validationOTPForm.controls.numeroOTP.setValue(num1 + num2 + num3 + num4 + num5 + num6);

    }

    atualizarDatosOTP() {
        const datos = { ...this.datosBasicos.getRawValue() }

        this.actualizandoDatosOTP = true;
        this._libranzaService.actualizarDatosBasicosOTP(datos).subscribe(rep => {
            this.actualizandoDatosOTP = false;
        })
    }

    solicitarCodigo(): void {
        if (this.datosBasicos.valid) {
            const data = {
                numeroSolicitud: this.numeroSolicitudTemporal,
                tipo: 'T',
                tipoOTP: "AUTORIZACION"
            }
            this.validandoOTPLoading = true;
            this.solicitarOTP = true;
            this._formularioCreditoService.solicitarOTP(data).pipe(takeUntil(this.destroyed)).subscribe(rep => {
                if (rep.status === 200) {
                }
                this.startTimer();
                this.validandoOTPLoading = false;
            })
        }
    }

    validarCodigo(): void {
        const numero = this.validationOTPForm.get('numeroOTP').value;
        this.validandoOTPLoading = true;
        if (numero.length === 6 && !this.otpValidado) {
            const data = {
                numeroSolicitud: this.numeroSolicitudTemporal,
                tipoTercero: 'T',
                numeroOTP: numero
            }

            this._formularioCreditoService.validatarOTP(data).pipe(takeUntil(this.destroyed)).subscribe(rep => {
                this.otpValidado = rep.data.resultado === 'OK'
                this.validandoOTPLoading = false;
            }, err => {
                Swal.fire('Error',
                    'Error al validar del OTP','error').then(()=> {
                        this.validandoOTPLoading = false;
                        this.borrarOTPNumbers()
                    })
            })
        }

    }

    borrarOTPNumbers(): void {
        this.input1.nativeElement.value = ''
        this.input2.nativeElement.value = ''
        this.input3.nativeElement.value = ''
        this.input4.nativeElement.value = ''
        this.input5.nativeElement.value = ''
        this.input6.nativeElement.value = ''

    }

    formatearDatos(datos: any){
        datos.salarioBasico = Number(datos.salarioBasico);
        datos.otrosIngresos = Number(datos.otrosIngresos);
        datos.descuentoNomina = Number(datos.descuentoNomina);

        datos.plazo = 0;
        datos.valorSolicitado = 0;

        // verificacion
        datos.aceptoCentrales = 'S'
        datos.aceptoTerminos = 'S'
        datos.aceptoVeracidad = 'S'

    }

    private getSalarioMinimo() {
        this._genericaServices.getSalarioBasico().subscribe(({ data }) => {
            this.salarioMinimo = data.salarioMinimo;

            this.datosLaborares.get('salarioBasico').setValidators([Validators.required, Validators.min(data.salarioMinimo)])
        })
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }


}


