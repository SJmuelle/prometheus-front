import { Component, OnInit } from '@angular/core';
import { PoliticasService } from "../../../../../../core/services/politicas.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PermisosService } from 'app/core/services/permisos.service';
import { ModalExcepcionCreditoComponent } from '../modal-excepcion-credito/modal-excepcion-credito.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericasService } from 'app/core/services/genericas.service';
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
        private politicasService: PoliticasService,
        private route: ActivatedRoute,
        public _permisosService: PermisosService,
        private _matDialog: MatDialog,
        private _generica: GenericasService
    ) { }

    ngOnInit(): void {
        this.getPoliticas(this.numeroSolicitud);
        this.getUnidadNegocio();
        this.permisoExcepcion = this._permisosService.permisoExcepcionCredito()
    }

    private getPoliticas(numeroSolicitud: string): void {
        this.titular =[];
        this.codeudor = []
        this.representante = [];
        this.solidario = [];
        this.politicasService.getPoliticas(numeroSolicitud).subscribe(data => {
            data.data.forEach(element => {
                if (element.tipoTercero === 'T') {
                    this.titular.push(element)
                }
                else if (element.tipoTercero === 'C') {
                    this.codeudor.push(element)
                } else if (element.tipoTercero === 'S') {
                    this.solidario.push(element)
                }else if(element.tipoTercero === 'R'){
                    this.representante.push(element)
                }
            });

        });
    }

    private getUnidadNegocio(){
        this._generica.getUnidadNegocio(this.numeroSolicitud).subscribe(rep => {
            this.unidadNegocio = rep.data[0].unidadNegocio
        })
    }

    // 21 corresponde a la politica de filtros duros
    hasIDPolitica(array: any[]){
        return array.find(item => item.idPolitica === 21)
    }

    openExcepcion(item: any){
        const dialogRef = this._matDialog.open(ModalExcepcionCreditoComponent, {
            width: '50vw',
            maxHeight: '550px',
            data:  item ,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if(result){
                window.location.reload()
            }else{
                this.getPoliticas(this.numeroSolicitud);
            }
        });
    }

    getColorExcepcion(item: any){
        let color = 'bg-green-300'

        if(item.estadoAccion !== 'CUMPLE'){
            if(item.excepcion){
                color = 'bg-yellowCustom'
            }else{
                color = 'bg-red-300'
            }
        }
        return color;
    }

    getColorTextExcepcion(item: any){
        let color = 'text-gray-500'

        if(item.estadoAccion !== 'CUMPLE'){
            if(item.excepcion){
                color = 'text-white'
            }else{
                color = 'text-red-900'
            }
        }
        return color;
    }

}
