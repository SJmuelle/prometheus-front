import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
    selector: 'app-form-responsables',
    templateUrl: './form-responsables.component.html',
    styleUrls: ['./form-responsables.component.scss'],
})
export class FormResponsablesComponent implements OnInit {
    datos: any = {};

    constructor(
        public matDialogRef: MatDialogRef<FormResponsablesComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _pqrService: PqrService
    ) {}

    ngOnInit(): void {
        this.datos = this.data;
    }
    guardar() {
        let data, url;
        if (this.datos.titulo == 'N') {
            //post
            url = '/agregar-pqrs-tipo';
            data = {};
        } else {
            url = '/actualizar-pqrs-responsable';
            data = {
                id: this.datos.id,
                estado: this.datos.estado == 'A' ? '' : 'A',
            };
        }
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando responsable de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this._pqrService.Create(url, data).subscribe((response: any) => {
            Swal.close();
            if (response) {
                if (response.status == 200) {
                    if (!response.data.respuesta.includes('OK')) {
                        Swal.fire(
                            'Información',
                            response.data.respuesta,
                            'error'
                        );
                        return;
                    }
                    Swal.fire(
                        'Información',
                        `Se guardó el registro con éxito`,
                        'success'
                    ).then((resultado) => {
                        if (resultado) {
                            this.matDialogRef.close();
                        }
                    });
                } else {
                    Swal.fire(
                        'Información',
                        `Hubo un error en los datos enviados, favor evaluar`,
                        'success'
                    );
                }
            } else {
                Swal.fire(
                    'Advertencia',
                    'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
                    'error'
                );
            }
        });
    }
}
