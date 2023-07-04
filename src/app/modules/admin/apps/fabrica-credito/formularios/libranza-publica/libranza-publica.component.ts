import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit } from '@angular/core';
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
export class LibranzaPublicaComponent implements OnInit {

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

    ngOnInit(): void {
        this.datosBasicos = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
            celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
            email: ['', [Validators.required, Validators.email]],
            primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            genero: ['', Validators.required],
            fechaNacimiento: [this.mayorDeEdadFecha.format('YYYY-MM-DD'), [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
            codigoAsesor: [''],
        });
        console.log(this.fechaActual.subtract(18, 'years').format('DD-MM-YYYY 00000'))
        this.datosLaborares = this.fb.group({
            ocupacio: ['', [Validators.required]],
            pagaduria: ['', [Validators.required]],
            otraPagaduria: ['', [Validators.required]],
            tipoContrato: ['', [Validators.required]],
            fechaVinculacion: ['', [Validators.required]],
            // la de abajo no esta asignada,

            fechaFinalizacionContrato: [''],
            cargo: ['', [Validators.required, Validators.min(0)]],
            salarioBasico: ['', [Validators.required, Validators.min(0)]],
            otrosIngreso: ['', [Validators.required]],
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

    }

    ngAfterViewChecked(): void {
        //Called after every check of the component's view. Applies to components only.
        //Add 'implements AfterViewChecked' to the class.
        this.marginTopInputDynamic()
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
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
