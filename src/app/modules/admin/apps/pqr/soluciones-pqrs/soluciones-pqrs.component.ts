import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { FormSolucionesComponent } from './form-soluciones/form-soluciones.component';

@Component({
    selector: 'app-soluciones-pqrs',
    templateUrl: './soluciones-pqrs.component.html',
    styleUrls: ['./soluciones-pqrs.component.scss'],
})
export class SolucionesPQRSComponent implements OnInit {
    listado: any = [];
    page: number = 1;
    tamanoTabl: number = 5;
    filtrarTabla: string = '';
    mostrar_form: boolean = true;
    datos: any = {};

    constructor(public dialog: MatDialog, private _pqrService: PqrService) {}

    ngOnInit(): void {
        this.consulta();
    }

    consulta() {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información de Soluciones de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this._pqrService.setSoluciones().subscribe((response: any) => {
            Swal.close();
            if (response) {
                this.listado = response;
            } else {
                this.listado = [];
            }
        });
    }

    abrirModal(datos, titulo) {
        if (titulo == 'N') {
            this.datos = {
                idCausal: null,
                solucion: '',
                solucion2: '',
                solucion3: '',
                aprobacionsol: '',
                titulo: 'N',
            };
        } else {
            this.datos = {
                id: datos.id,
                causal: datos.causal,
                solucion: datos.solucion,
                idSolucion: datos.idSolucion,
                solucion2: datos.solucion2,
                idSolucion2: datos.idSolucion2,
                solucion3: datos.solucion3,
                idSolucion3: datos.idSolucion3,
                estado: datos.estado == 'Activo' ? 'A' : 'I',
            };
        }

        const dialogRef = this.dialog.open(FormSolucionesComponent, {
            data: this.datos,
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.consulta();
        });
    }
}
