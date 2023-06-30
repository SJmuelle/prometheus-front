import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'app-libranza-publica',
    templateUrl: './libranza-publica.component.html',
    styleUrls: ['./libranza-publica.component.scss']
})
export class LibranzaPublicaComponent implements OnInit {

    form: FormGroup;
    fechaActual: any = moment().locale('co');

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
            primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
            email: ['', [Validators.required, Validators.email]],
            fechaNacimiento: ['', [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
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
}
