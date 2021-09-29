import { Component, Inject, Input, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DetalleCreditoService } from 'app/resources/services/hojadevida/credito/detalle-credito.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-modalcredito',
    templateUrl: './modalcredito.component.html',
    styleUrls: ['./modalcredito.component.scss'],
})
export class ModalcreditoComponent implements OnInit {
    infoInfoPerLab: any={} ;
    infoRefePer: any =[];
    infoRefFam: any =[];
    infoCodeu: any =[];
    infoNegocio: any={};
    infoConyugue: any={};

    constructor(
        public dialogRef: MatDialogRef<ModalcreditoComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private _detalleCredito: DetalleCreditoService
    ) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        console.log(this.data.codigoNegocio);
        this.onTabChangedCredito(0);
    }

    onTabChangedCredito(index): void {
        switch (index) {
            case 1:
                this.getInformacionCodeudor(this.data.codigoNegocio);
                this.getInformacionNegocio(this.data.codigoNegocio);
                break;
            case 0:
                this.getInformacionConyuge(this.data.codigoNegocio);
                this.getInformacionPersonal(this.data.codigoNegocio);
                break;
                break;
            case 2:
                this.getRefencias(this.data.codigoNegocio);
                break;
            default:
                break;
        }
    }

    getInformacionPersonal(data: string) {
        Swal.fire({ title: 'Cargando', html: 'Buscando información de reporte de las centrales', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        return this._detalleCredito
            .getInformacionPersonal(data)
            .subscribe((response: any) => {
                Swal.close();
                if (response.data) {
                   
                    this.infoInfoPerLab=response.data;
                }else{
                    this.infoInfoPerLab={};
                }
            });
    }

    getRefencias(data: string) {
        Swal.fire({ title: 'Cargando', html: 'Buscando información de reporte de las centrales', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        return this._detalleCredito
            .getInformacionReferencias(data)
            .subscribe((response: any) => {
                console.log(response);
                Swal.close();
                if (response.data) {
                   
                    // this.infore.patchValue(response.data);
                    this.infoRefePer = response.data
                }else{
                    this.infoRefePer =[];
                }
            });
    }


    getInformacionCodeudor(data: string) {
        Swal.fire({ title: 'Cargando', html: 'Buscando información de reporte de las centrales', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        return this._detalleCredito
            .getInformacionCodeudor(data)
            .subscribe((response: any) => {
                Swal.close();
                if (response.data) {
                    
                    this.infoCodeu=response.data;
                }else{
                    this.infoRefePer =[];
                }
            });
    }

    getInformacionNegocio(data: string) {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        return this._detalleCredito
            .getInformacionNegocio(data)
            .subscribe((response: any) => {
                console.log(response);
                Swal.close();
                if (response.data) {
                    this.infoNegocio=response.data;
                }else{
                    this.infoNegocio={};
                }
            });
    }

    getInformacionConyuge(data: string) {
        Swal.fire({ title: 'Cargando', html: 'Buscando información de reporte de las centrales', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        return this._detalleCredito
            .getInformacionConyuge(data)
            .subscribe((response: any) => {
                console.log(response);
                Swal.close();
                if (response.data) {
                    this.infoConyugue=response.data;
                }else{
                    this.infoConyugue={};
                }
            });
    }
}
