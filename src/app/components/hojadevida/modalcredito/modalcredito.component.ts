import { Component, Inject, Input, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DetalleCreditoService } from 'app/resources/services/hojadevida/credito/detalle-credito.service';

@Component({
    selector: 'app-modalcredito',
    templateUrl: './modalcredito.component.html',
    styleUrls: ['./modalcredito.component.scss'],
})
export class ModalcreditoComponent implements OnInit {
    infoInfoPerLab: FormGroup;
    infoRefePer: FormGroup;
    infoRefFam: FormGroup;
    infoCodeu: FormGroup;
    infoNegocio: FormGroup;
    infoConyugue: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalcreditoComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private _detalleCredito: DetalleCreditoService
    ) {
        this.infoInfoPerLab = this.fb.group({
            afiliado: [{ value: '', disabled: true }, Validators.required],
            asesorColocacion: [
                { value: '', disabled: true },
                Validators.required,
            ],
            cuotaMensual: [{ value: '', disabled: true }, Validators.required],
            plazo: [{ value: '', disabled: true }, Validators.required],
            ocupacion: [{ value: '', disabled: true }, Validators.required],
            actividadEconomica: [
                { value: '', disabled: true },
                Validators.required,
            ],
        });

        this.infoRefePer = this.fb.group({
            data: this.fb.array([
                {
                    primerNombre: [
                        { value: '', disabled: true },
                        Validators.required,
                    ],
                    primerApellido: [
                        { value: '', disabled: true },
                        Validators.required,
                    ],
                    celular: [
                        { value: '', disabled: true },
                        Validators.required,
                    ],
                    departamento: [
                        { value: '', disabled: true },
                        Validators.required,
                    ],
                    ciudad: [
                        { value: '', disabled: true },
                        Validators.required,
                    ],
                    direccion: [
                        { value: '', disabled: true },
                        Validators.required,
                    ],
                },
            ]),
        });

        this.infoRefFam = this.fb.group({
            primerNombre: [{ value: '', disabled: true }, Validators.required],
            primerApellido: [
                { value: '', disabled: true },
                Validators.required,
            ],
            parentesco: [{ value: '', disabled: true }, Validators.required],
            celular: [{ value: '', disabled: true }, Validators.required],
            departamento: [{ value: '', disabled: true }, Validators.required],
            ciudad: [{ value: '', disabled: true }, Validators.required],
            direccion: [{ value: '', disabled: true }, Validators.required],
        });

        this.infoCodeu = this.fb.group({
            primerNombre: [{ value: '', disabled: true }, Validators.required],
            primerApellido: [
                { value: '', disabled: true },
                Validators.required,
            ],
            identificacion: [
                { value: '', disabled: true },
                Validators.required,
            ],
            profesion: [{ value: '', disabled: true }, Validators.required],
            departamento: [{ value: '', disabled: true }, Validators.required],
            ciudad: [{ value: '', disabled: true }, Validators.required],
            barrio: [{ value: '', disabled: true }, Validators.required],
            direccion: [{ value: '', disabled: true }, Validators.required],
            email: [{ value: '', disabled: true }, Validators.required],
            celular: [{ value: '', disabled: true }, Validators.required],
        });

        this.infoNegocio = this.fb.group({
            empresa: [{ value: '', disabled: true }, Validators.required],
            nit: [{ value: '', disabled: true }, Validators.required],
            celular: [{ value: '', disabled: true }, Validators.required],
            email: [{ value: '', disabled: true }, Validators.required],
            departamento: [{ value: '', disabled: true }, Validators.required],
            ciudad: [{ value: '', disabled: true }, Validators.required],
            barrio: [{ value: '', disabled: true }, Validators.required],
            direccion: [{ value: '', disabled: true }, Validators.required],
        });

        this.infoConyugue = this.fb.group({
            primerNombreCony: [
                { value: '', disabled: true },
                Validators.required,
            ],
            primerApellidoCony: [
                { value: '', disabled: true },
                Validators.required,
            ],
            emailCony: [{ value: '', disabled: true }, Validators.required],
            celularCony: [{ value: '', disabled: true }, Validators.required],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        console.log(this.data.codigoNegocio);
        this.getInformacionPersonal(this.data.codigoNegocio);
    }

    onTabChanged(event): void {
        switch (event.index) {
            case 1:
                this.getRefencias(this.data.codigoNegocio);
                break;
            case 2:
                this.getInformacionCodeudor(this.data.codigoNegocio);
                break;
            case 3:
                this.getInformacionNegocio(this.data.codigoNegocio);
                break;
            case 4:
                this.getInformacionConyuge(this.data.codigoNegocio);
                break;
            default:
                break;
        }
    }

    getInformacionPersonal(data: string) {
        return this._detalleCredito
            .getInformacionPersonal(data)
            .subscribe((response: any) => {
                if (response.data) {
                    this.infoInfoPerLab.patchValue(response.data);
                }
            });
    }

    getRefencias(data: string) {
        return this._detalleCredito
            .getInformacionReferencias(data)
            .subscribe((response: any) => {
                console.log(response);
                if (response.data) {
                    // this.infore.patchValue(response.data);
                    this.infoRefePer = response.data
                }
            });
    }
    get dataRefPers(): FormArray {
        console.log(this.infoRefePer.controls);
        return this.infoRefePer.controls.dataRefPers as FormArray;
    }
    // .get('dataRefPers') as FormArray;

    getInformacionCodeudor(data: string) {
        return this._detalleCredito
            .getInformacionCodeudor(data)
            .subscribe((response: any) => {
                if (response.data) {
                    this.infoCodeu.patchValue(response.data);
                }
            });
    }

    getInformacionNegocio(data: string) {
        return this._detalleCredito
            .getInformacionNegocio(data)
            .subscribe((response: any) => {
                console.log(response);
                if (response.data) {
                    this.infoNegocio.patchValue(response.data);
                }
            });
    }

    getInformacionConyuge(data: string) {
        return this._detalleCredito
            .getInformacionConyuge(data)
            .subscribe((response: any) => {
                console.log(response);
                if (response.data) {
                    this.infoConyugue.patchValue(response.data);
                }
            });
    }
}
