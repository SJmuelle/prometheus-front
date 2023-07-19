import { Component, OnInit } from '@angular/core';
import { PoliticasService } from "../../../../../../core/services/politicas.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PermisosService } from 'app/core/services/permisos.service';
import { ModalExcepcionCreditoComponent } from '../modal-excepcion-credito/modal-excepcion-credito.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericasService } from 'app/core/services/genericas.service';
import Swal from 'sweetalert2';
import { CentralesService } from 'app/core/services/centrales.service';
import { DetalleExcepcionCreditoComponent } from '../detalle-excepcion-credito/detalle-excepcion-credito.component';
@Component({
    selector: 'app-grid-politicas',
    templateUrl: './grid-politicas.component.html',
    styleUrls: ['./grid-politicas.component.scss']
})
export class GridPoliticasComponent implements OnInit {
    public politicas$: Observable<any>;
    public titular: any[] = [];
    public codeudor: any[] = [];
    public representante: any[] = [];
    public solidario: any[] = [];
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public permisoExcepcion: boolean = false;
    public unidadNegocio: number;
    constructor(
        private _politicasService: PoliticasService,
        private route: ActivatedRoute,
        public _permisosService: PermisosService,
        private _matDialog: MatDialog,
        private _generica: GenericasService,
        private _centralesService: CentralesService
    ) { }

    ngOnInit(): void {
        this.getPoliticas(this.numeroSolicitud);
        this.getUnidadNegocio();
        this.permisoExcepcion = this._permisosService.permisoExcepcionCredito()
    }

    private getPoliticas(numeroSolicitud: string): void {
        this.titular = [];
        this.codeudor = []
        this.representante = [];
        this.solidario = [];
        this._politicasService.getPoliticas(numeroSolicitud).subscribe(data => {
            data.data.forEach(element => {
                if (element.tipoTercero === 'T') {
                    this.titular.push(element)
                }
                else if (element.tipoTercero === 'C') {
                    this.codeudor.push(element)
                } else if (element.tipoTercero === 'S') {
                    this.solidario.push(element)
                } else if (element.tipoTercero === 'R') {
                    this.representante.push(element)
                }
            });

        });
    }

    private getUnidadNegocio() {
        this._generica.getUnidadNegocio(this.numeroSolicitud).subscribe(rep => {
            this.unidadNegocio = rep.data[0].unidadNegocio
        })
    }

    // 21 corresponde a la politica de filtros duros
    hasIDPolitica(array: any[]) {
        return array.find(item => item.idPolitica === 21)
    }

    openExcepcion(item: any) {
        const dialogRef = this._matDialog.open(ModalExcepcionCreditoComponent, {
            width: '50vw',
            maxHeight: '650px',
            data: item,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                window.location.reload()
            } else {
                this.getPoliticas(this.numeroSolicitud);
            }
        });
    }

    openDetalleExcepcion(item: any) {
        this._matDialog.open(DetalleExcepcionCreditoComponent, {
            width: '50vw',
            maxHeight: '650px',
            data: item,
        });
    }

    getColorExcepcion(item: any) {
        let color = 'bg-green-300'

        if (item.estadoAccion !== 'CUMPLE') {
            if (item.excepcion) {
                color = 'bg-yellowCustom'
            } else {
                color = 'bg-red-300'
            }
        }
        return color;
    }

    getColorTextExcepcion(item: any) {
        let color = 'text-gray-500'

        if (item.estadoAccion !== 'CUMPLE') {
            if (item.excepcion) {
                color = 'text-white'
            } else {
                color = 'text-red-900'
            }
        }
        return color;
    }

    correrMotor(tipoTercero: string) {
        Swal.fire({
            title: 'Guardar información',
            text: '¿Está seguro de correr el motor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#a3a0a0',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    numeroSolicitud: Number(this.numeroSolicitud),
                    tipoTercero
                }

                Swal.fire({ title: 'Cargando', html: 'Evaluando motor de decisión (Políticas)', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
                this._politicasService.correrMotorlExcepcionPolitica(data).subscribe(rep => {
                    console.log('respuesta', rep);
                    if (rep['data'].resultado === 'OK') {
                        Swal.fire('Guardado con éxito', 'Ha sido recalculado con éxito.', 'success').then(() => {
                            window.location.reload()
                        })
                    } else {
                        Swal.fire('Ha ocurrido un error', 'Lo sentimos, en este momento presentamos inconvenientes en la comunicación con las centrales de riesgos. <br>', 'error')
                    }
                })


            }
        });
    }


}
