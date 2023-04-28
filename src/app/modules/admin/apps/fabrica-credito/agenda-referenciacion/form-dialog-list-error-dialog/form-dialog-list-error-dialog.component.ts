import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-form-dialog-list-error-dialog',
    templateUrl: './form-dialog-list-error-dialog.component.html',
    styleUrls: ['./form-dialog-list-error-dialog.component.scss']
})
export class FormDialogListErrorDialogComponent implements OnInit {

    tipoD = 0
    tipoT = 0;
    transformData: any = { T: [] };

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
        this.agruparData(this.data);
    }

    agruparData(data: any[]) {
        data.forEach(item => {
            if (!this.transformData[item.tipoTercero]) {
                this.transformData[item.tipoTercero] = []
            } else {
                this.transformData[item.tipoTercero].push(item)
            }
        })
    }

    existeErrorCampos(data: any[]) {
        let hay = false;
        data.forEach(element => {
            if (element.tipo == 'T') {
                hay = true
            }
        });
        return hay;
    }

    existenErroresArchivos(data: any[]) {
        let hay = false;
        data.forEach(element => {
            if (element.tipo == 'D') {
                hay = true
            }
        });
        return hay;
    }

    tituloDependiendoKey(tipoTercer: string) {
        switch (tipoTercer) {
            case 'T':
                return 'Titular'
            case 'C':
                return 'Codeudor'
            case 'S':
                return 'Dedudor solidario'
            case 'R':
                return 'Representante'
        }
    }

}
