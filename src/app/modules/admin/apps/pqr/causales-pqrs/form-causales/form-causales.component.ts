import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
    selector: 'app-form-causales',
    templateUrl: './form-causales.component.html',
    styleUrls: ['./form-causales.component.scss'],
})
export class FormCausalesComponent implements OnInit {
    listadoTipo: any;
    datos: any = {};
    constructor(
        public matDialogRef: MatDialogRef<FormCausalesComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _pqrService: PqrService
    ) {}

    ngOnInit(): void {
        this.datos = this.data;
        this.consultaListadoTipo();
    }
    consultaListadoTipo() {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información de Tipos de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this._pqrService
            .getListados(`/tk/select-tipo-pqrs`)
            .subscribe((response: any) => {
                Swal.close();
                if (response) {
                    this.listadoTipo = response;
                } else {
                    this.listadoTipo = [];
                }
            });
    }
    guardar() {
        let data, url;
        if (this.datos.titulo == 'N') {
            //post
            url = '/agregar-pqrs-causal';
            data = {
                idTipo: parseInt(this.datos.idTipo),
                estado: '',
                descripcion: this.datos.descripcion,
            };
        } else {
            url = '/actualizar-pqrs-causal';
            data = {
                id: parseInt(this.datos.id),

                estado: this.datos.estado == 'A' ? '' : 'A',
            };
        }
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando causales de PQRS',
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
                        '¡Información!',
                        `Se guardó el registro con éxito`,
                        'success'
                    ).then((resultado) => {
                        if (resultado) {
                            this.matDialogRef.close();
                        }
                    });
                } else {
                    Swal.fire(
                        '¡Información!',
                        `Hubo un error en los datos enviados, favor evaluar`,
                        'success'
                    );
                }
            } else {
                Swal.fire(
                    '¡Advertencia!',
                    'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
                    'error'
                );
            }
        });
    }
}
