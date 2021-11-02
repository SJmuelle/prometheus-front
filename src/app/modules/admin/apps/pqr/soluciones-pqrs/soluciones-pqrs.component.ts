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
            html: 'Buscando Informacion de Soluciones de PQRS',
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
                idResponsable: null,
                descripcion: '',
                diasSolucion: 0,
                titulo: 'N',
            };
        } else {
            this.datos = {
                id: datos.codigoSolucion,
                idResponsable: parseInt(datos.responsable),
                descripcion: datos.descripcion,
                tiempo: parseInt(datos.tiempoSolucion),
                estado: datos.estado == 'Activo' ? 'A' : 'I',
            };
        }

        const dialogRef = this.dialog.open(FormSolucionesComponent, {
            // width: '1080px',
            // maxHeight: '550px',
            data: this.datos,
        });

        dialogRef.afterClosed().subscribe((result) => {
            // console.log('The dialog was closed');
            // console.log(result);
            this.consulta();
        });
    }
}
