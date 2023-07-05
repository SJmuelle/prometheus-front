import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs'
import moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { LibranzaPublicaService } from 'app/core/services/libranza-publica.service';

@Component({
    selector: 'app-libranza-publica',
    templateUrl: './libranza-publica.component.html',
    styleUrls: ['./libranza-publica.component.scss']
})
export class LibranzaPublicaComponent implements OnInit, AfterViewInit {
    @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
    @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
    @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
    @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;
    @ViewChild('input5') input5!: ElementRef<HTMLInputElement>;
    @ViewChild('input6') input6!: ElementRef<HTMLInputElement>;


    form: FormGroup;
    datosBasicos: FormGroup;
    datosLaborares: FormGroup;
    validationOTPForm: FormGroup;
    orientationStep: StepperOrientation;
    currentScreenSize: string;
    dataInicial;
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

    constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private el: ElementRef,
        private _formularioCreditoService: FormularioCreditoService,
        private _libranzaService: LibranzaPublicaService) { }


    ngAfterViewInit() {
        this.focusNextInput(this.input1.nativeElement, this.input2.nativeElement);
        this.focusNextInput(this.input2.nativeElement, this.input3.nativeElement);
        this.focusNextInput(this.input3.nativeElement, this.input4.nativeElement);
        this.focusNextInput(this.input4.nativeElement, this.input5.nativeElement);
        this.focusNextInput(this.input5.nativeElement, this.input6.nativeElement);

    }


    ngOnInit(): void {
        this.datosBasicos = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            documento: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
            celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
            email: ['', [Validators.required, Validators.email]],
            primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            genero: ['', Validators.required],
            fechaNacimiento: [this.mayorDeEdadFecha.format('YYYY-MM-DD'), [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
            codigoAsesor: [''],
        });

        this.datosLaborares = this.fb.group({
            ocupacio: ['', [Validators.required]],
            pagaduria: ['', [Validators.required]],
            otraPagaduria: [''],
            tipoContrato: [''],
            fechaVinculacion: [''],
            // la de abajo no esta asignada,

            fechaFinalizacionContrato: [''],
            cargo: [''],
            pension: [''],
            salarioBasico: ['', [Validators.required, Validators.min(0)]],
            otrosIngreso: [''],
            descuentoNomina: ['', [Validators.required]],

        });

        this.validationOTPForm = this.fb.group({
            numeroOTP: [''],
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
        this.agregarValidaciones()
    }

    private agregarValidaciones() {
        // disable todos los campos dinamicos
        this.datosLaborares.get('otraPagaduria').disable()
        this.datosLaborares.get('tipoContrato').disable()
        this.datosLaborares.get('fechaVinculacion').disable()
        this.datosLaborares.get('cargo').disable()
        this.datosLaborares.get('otrosIngreso').disable()
        this.datosLaborares.get('pension').disable()


        // validaciones dinamicas
        this.datosLaborares.get('pagaduria').valueChanges.subscribe((e: string) => {
            if (e === "999989999") {
                this.datosLaborares.get('otraPagaduria')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('otraPagaduria')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.datosLaborares.get('otraPagaduria')?.setValidators(null)
                this.datosLaborares.get('otraPagaduria')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        this.datosLaborares.get('ocupacio').valueChanges.subscribe((e: string) => {
            if (e === "EPLDO") {
                this.datosLaborares.get('tipoContrato')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('tipoContrato')?.enable({ emitEvent: true, onlySelf: true })
                this.datosLaborares.get('fechaVinculacion')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('fechaVinculacion')?.enable({ emitEvent: true, onlySelf: true })
                this.datosLaborares.get('cargo')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('cargo')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                if (e === 'PENSI') {
                    this.datosLaborares.get('pension')?.setValidators([Validators.required, Validators.min(0)])
                    this.datosLaborares.get('pension')?.enable({ emitEvent: true, onlySelf: true })
                } else {
                    this.datosLaborares.get('pension')?.setValidators(null)
                    this.datosLaborares.get('pension')?.disable({ emitEvent: true, onlySelf: true })
                }
                this.datosLaborares.get('tipoContrato')?.setValidators(null)
                this.datosLaborares.get('tipoContrato')?.disable({ emitEvent: true, onlySelf: true })
                this.datosLaborares.get('fechaVinculacion')?.setValidators(null)
                this.datosLaborares.get('fechaVinculacion')?.disable({ emitEvent: true, onlySelf: true })
                this.datosLaborares.get('cargo')?.setValidators(null)
                this.datosLaborares.get('cargo')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        this.datosLaborares.get('cargo').valueChanges.subscribe((e: string) => {
            if (e === "2" || e === "3" || e === "5") {
                this.datosLaborares.get('otrosIngreso')?.setValidators([Validators.required, Validators.min(0)])
                this.datosLaborares.get('otrosIngreso')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.datosLaborares.get('otrosIngreso')?.setValidators(null)
                this.datosLaborares.get('otrosIngreso')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
    }

    ngAfterViewChecked(): void {
        //Called after every check of the component's view. Applies to components only.
        //Add 'implements AfterViewChecked' to the class.
        this.marginTopInputDynamic()
    }

    public focusNextInput(currentInput: HTMLInputElement, nextInput: HTMLInputElement): void {
        currentInput.addEventListener('input', () => {
            if (currentInput.value.length === 1) {
                nextInput.focus();
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
            unidadNegocio: 22
        };
        this._libranzaService.cargueInicialFormularioCorto(data).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data
                console.log('data inicial', this.dataInicial);

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
        const dataToSend = { ...this.datosBasicos.getRawValue(), ...this.datosLaborares.getRawValue(), ...this.validationOTPForm.getRawValue() }

        this.formatearDatosAntesDeEnviar(dataToSend)


        console.log(dataToSend, 'datos a enviar');

    }

    formatearDatosAntesDeEnviar(formData) {
        formData.primerNombre = formData.primerNombre?.trim()
        formData.primerApellido = formData.primerApellido?.trim()
    }

    onStepChange($e) {
        if ($e.previouslySelectedIndex === 0) {
            const datosAEnviar = { ...this.datosBasicos.getRawValue() }

            datosAEnviar.unidadNegocio = 22
            datosAEnviar.tipoTercero = 'T'

            console.log('datos a enviar', datosAEnviar);

            this._libranzaService.guardarDatosBasicos(datosAEnviar).subscribe(data => {
                console.log('datos recibidos', data);

            })
        }
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
