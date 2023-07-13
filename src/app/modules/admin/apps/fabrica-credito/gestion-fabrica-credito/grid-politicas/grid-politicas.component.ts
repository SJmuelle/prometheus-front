import { Component, OnInit } from '@angular/core';
import { PoliticasService } from "../../../../../../core/services/politicas.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PermisosService } from 'app/core/services/permisos.service';
import { ModalExcepcionCreditoComponent } from '../modal-excepcion-credito/modal-excepcion-credito.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    constructor(
        private politicasService: PoliticasService,
        private route: ActivatedRoute,
        public _permisosService: PermisosService,
        private _matDialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getPoliticas(this.numeroSolicitud);
        this.permisoExcepcion = this._permisosService.permisoExcepcionCredito()
    }

    private getPoliticas(numeroSolicitud: string): void {
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
        });
    }

    public onGuardar(): void {
        // if (this.form.valid) {
        //     const data: any = this.form.getRawValue();
        //     let valida=this.datoFabrica.agenda!='GC'&&this.datoFabrica.agenda!='CM';
        //     let envioData = {
        //         comentario: data.comentario,
        //         numeroSolicitud: data.numeroSolicitud,
        //         tipoComentario: valida?Number(data.tipoComentario):2,
        //     }
        //     let mensaje=envioData.tipoComentario==2?'¿Está seguro de agregar este comentario en la gestión del crédito?. Recuerde que este comentario será visible para todos los usuarios.':'¿Está seguro de agregar este comentario en la gestión del crédito?. Recuerde que este comentario no será visible para todos los usuarios';
        //     Swal.fire({
        //         title: 'Guardar información',
        //         text: mensaje,
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#a3a0a0',
        //         confirmButtonText: 'Guardar',
        //         cancelButtonText: 'Cancelar'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             this.postComentario(envioData);
        //         }
        //     });
        // } else {
        //     this.form.markAllAsTouched();
        // }

    }
}
