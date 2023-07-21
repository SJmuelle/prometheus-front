import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-detalle-excepcion-credito',
    templateUrl: './detalle-excepcion-credito.component.html',
    styleUrls: ['./detalle-excepcion-credito.component.scss']
})
export class DetalleExcepcionCreditoComponent implements OnInit {


    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _dialog: MatDialogRef<DetalleExcepcionCreditoComponent>,
    ) {

    }

    ngOnInit(): void {
    }

   /**
     * @description: Cierra el dialogo
    */
    public onCerrar(): void {
        this._dialog.close();
    }
}
