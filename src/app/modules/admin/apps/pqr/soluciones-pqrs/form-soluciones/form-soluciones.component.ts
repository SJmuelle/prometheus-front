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
    listadoResponsable: any[];

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
            html: 'Buscando información ...',
            timer: 500000,
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

        this._pqrService
            .getListados(`/tk/select-responsables-pqrs`)
            .subscribe((response: any) => {
                Swal.close();
                if (response) {
                    this.listadoResponsable = response;
                    this.datos.responsables = this.datos.idResponsable;
                } else {
                    this.listadoResponsable = [];
                }
            });
    }

    guardar() {
        let data, url;
        if (this.datos.titulo == 'N') {
            //post
            url = '/agregar-pqrs-soluciones';
            data = {
                idCausal: parseInt(this.datos.causal),
                idResponsable: parseInt(this.datos.responsables),
                descripcion: this.datos.descripcion,
                diasSolucion: this.datos.tiempo,
            };
        } else {
            url = '/actualizar-pqrs-solucion';
            data = {
                id: this.datos.id,
                idResponsable: parseInt(this.datos.responsables),
                descripcion: this.datos.descripcion,
                diasSolucion: this.datos.tiempo,
                estado: this.datos.estado == 'A' ? '' : 'A',
            };
        }
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando información de PQRS',
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
                        `Se guardo el registro con éxito`,
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
