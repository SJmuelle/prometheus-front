import { UtilityService } from './../../../../../../resources/services/utility.service';
import { PqrService } from './../../../pqr/pqr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HojadevidaService } from 'app/resources/services/hojadevida/hojadevida.service';

@Component({
    selector: 'app-certificador-deuda',
    templateUrl: './certificador-deuda.component.html',
    styleUrls: ['./certificador-deuda.component.scss'],
})
export class CertificadorDeudaComponent implements OnInit {
    // Locales
    formPazySalvo: FormGroup;
    formInfoGeneral: FormGroup;
    infoLiquidacion: any = [];
    infoLiquidacionTotal: any;

    constructor(
        private _hvidaService: HojadevidaService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private _pqrService: PqrService,
        private _utility: UtilityService
    ) {
        this.infoLiquidacionTotal = {
            factura: '',
            fecha: '',
            cuota: 0,
            diasMora: 0,
            capital: 0,
            intereses: 0,
            comisionLey: 0,
            intermediacion: 0,
            saldoCuota: 0,
            interesMora: 0,
            gastoCobranza: 0,
            total: 0,
            estado: '',
        };
    }

    ngOnInit(): void {
        this.crearFormulario();
        this.getPazySalvo(this.data.documento);
        this.getInfoGeneral(this.data.documento, this.data.fecha);
        this.getLiquidacion(this.data.documento, this.data.fecha);
        this.getLiquidacionTotal(this.data.documento, this.data.fecha);
    }

    crearFormulario() {
        this.formPazySalvo = this.fb.group({
            valorNegocio: '0',
            tasa: '0',
            numeroCuotas: '0',
            valorAval: '0',
        });

        this.formInfoGeneral = this.fb.group({
            capital: 0,
            intereses: 0,
            comisionLey: 0,
            intermediacion: 0,
            seguro: 0,
            aval: 0,
            otrosConceptos: 0,
            interesMora: 0,
            gastoCobranza: 0,
            total: 0,
        });
    }

    getPazySalvo(documento: string) {
        return this._hvidaService
            .getInfoCertificadoPazySalvo(documento)
            .subscribe(({ data }) => {
                this.formPazySalvo.patchValue(data);
            });
    }

    getInfoGeneral(documento: string, fecha: string) {
        return this._hvidaService
            .getCertificadoInfoGeneral(documento, fecha)
            .subscribe(({ data }) => {
                this.formInfoGeneral.patchValue(data);
            });
    }

    getLiquidacion(negocio, fecha) {
        let url = `/certificado-informacion-liquidacion`;
        fecha = new Date().toISOString().slice(0, 10);

        let data = {
            negocio: negocio,
            fecha: fecha,
        };

        this._utility.postQuery(url, data).subscribe((resp) => {
            this.infoLiquidacion = resp;
        });
    }

    getLiquidacionTotal(negocio, fecha) {
        let url = `/certificado-informacion-totales-liquidacion`;
        fecha = new Date().toISOString().slice(0, 10);

        let data = {
            negocio: negocio,
            fecha: fecha,
        };

        this._utility.postQuery(url, data).subscribe((resp: any) => {
            this.infoLiquidacionTotal = resp.data;
        });
    }
}
