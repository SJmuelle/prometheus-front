import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
    selector: 'app-form-soluciones',
    templateUrl: './form-soluciones.component.html',
    styleUrls: ['./form-soluciones.component.scss'],
})
export class FormSolucionesComponent implements OnInit {
    listadoTipo: any;
    datos: any = {};
    listadoCausal: any[];

    constructor(
        public matDialogRef: MatDialogRef<FormSolucionesComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _pqrService: PqrService
    ) {}

    ngOnInit(): void {
        this.consultaListado();
        this.datos = this.data;
    }

    consultaListado() {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información...',
            timer: 1000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this._pqrService
            .getListados(`/tk/select-causales-pqrs`)
            .subscribe((response: any) => {
                if (response) {
                    this.listadoCausal = response;
                } else {
                    this.listadoCausal = [];
                }
            });
    }

    guardar() {
        let data, url;
        if (this.datos.titulo == 'N') {
            //post
            url = '/agregar-pqrs-solucion';
            data = {
                idCausal: parseInt(this.datos.causal),
                solucion: this.datos.solucion,
                solucion2: this.datos.solucion2,
                solucion3: this.datos.solucion3,
                aprobacionsol: this.datos.aprobacionsol,
            };
        } else {
            url = '/actualizar-pqrs-solucion';
            data = {
                id: this.data.id,
                solucion: this.datos.solucion,
                idSolucion: this.data.idSolucion,
                solucion2: this.datos.solucion2,
                idSolucion2: this.data.idSolucion2,
                solucion3: this.datos.solucion3,
                idSolucion3: this.data.idSolucion3,
                estado: this.datos.estado == 'A' ? 'A' : '',
            };
        }
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando solución de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        console.log(data.aprobacionsol)
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
