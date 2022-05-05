import { Component, Inject, OnDestroy, OnInit, } from '@angular/core';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ReferenciacionClienteService } from '../../../../../../core/services/referenciacion-cliente.service';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { takeUntil } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
    selector: 'app-form-dialog-reprogramar',
    templateUrl: './form-dialog-reprogramar.component.html',
    styleUrls: ['./form-dialog-reprogramar.component.scss']
})
export class FormDialogReprogramarComponent implements OnInit, OnDestroy {
    public myDatePicker: FormControl = new FormControl(['']);
    public unsubscribe$: Subject<any> = new Subject<any>();
    public fechaActual = new Date();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _matDialog: MatDialogRef<FormDialogReprogramarComponent>,
        private referenciacionClienteServices: ReferenciacionClienteService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }
    /**
     * @description: Genera la reprogramacion
     */
    public onReprogramar(): void {
        const numeroSolicitud: string = this.data.numeroSolicitud;
        const data: any = {
            numeroSolicitud,
            fechaReprogramacion: moment(this.myDatePicker.value).format('YYYY-MM-DD HH:mm:ss')
        };
        Swal.fire({
            title: 'Guardar información',
            text: '¿Está seguro de guardar información?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#a3a0a0',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.postReprogramar(data);
            }
        });
    }
    /**
     * @description: Cierra el modal activo
     */
    public onCerrar(): void {
        this._matDialog.close(true);
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
    /**
     * @description: Guarda los datos a reprogramar
     */
    private postReprogramar(data: any): void {
        this.referenciacionClienteServices.postReprogramarSolicitud(data).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((res) => {
            if (res.data.respuesta == 0) {

                Swal.fire(
                    'Completado',
                    `${res.data.resultado}`,
                    'success'
                );
                setTimeout(() => {
                    this.onCerrar();
                }, 1000);

            } else {
                Swal.fire(
                    'Advertencia',
                    `${res.data.resultado}`,
                    'warning'
                );
            }
            if((res.data.numeroIntentos>=3)&&(res.data.agenda!='CM')){
                this.redireccionar('agenda-referencing');
                setTimeout(() => {
                    this.onCerrar();
                }, 1000);
            }
        });
    }

    /**
    * @description: redireciona
    */
    private redireccionar(agenda) {
        this.router.navigate([`/credit-factory/${agenda}`]);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }
}
