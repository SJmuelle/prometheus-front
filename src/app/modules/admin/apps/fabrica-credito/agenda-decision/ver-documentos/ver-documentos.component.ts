import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DocumentosAdjuntosService } from 'app/core/services/documentos-adjuntos.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'app-ver-documentos',
    templateUrl: './ver-documentos.component.html',
    styleUrls: ['./ver-documentos.component.scss']
})
export class VerDocumentosComponent implements OnInit {

    @Output() cerrarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() minimizarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() identificacion: string;
    public unSubscribe$: Subject<any> = new Subject<any>();

    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');

    public datosDocumentos: any = {};
    public documentos: any = {};
    public documentosCodeudor: any[] = [];
    public documentosDeudor: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private documentosServices: DocumentosAdjuntosService,
        private fabricaCreditoService: FabricaCreditoService
    ) { }

    ngOnInit(): void {
        console.log('dentro');
        this.getDocumentosData()
    }

    public onCerrar(): void {
        this.cerrarComponente.emit(false);
    }

    public onMinimiza(): void {
        this.minimizarComponente.emit(false);
    }

    /**
 * @description: Obtiene los documentos
 * */
    public getDocumentosData(): void {
        const datosSolicitud: any = {
            numeroSolicitud: this.numeroSolicitud,
            identificacion: this.identificacion,
        };
        this.fabricaCreditoService
            .getDatosFabricaAgenda(datosSolicitud)
            .pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                const datosDocumentos: any = {
                    numeroSolicitud: datosSolicitud.numeroSolicitud,
                    tipoDocumento: data.tipoDocumento,
                    unidadNegocio: data.unidadNegocio,
                };
                // this.fabricaCreditoService.seleccionDatos.next({ data: datosDocumentos });

                this.datosDocumentos = datosDocumentos;
                this.getDocumentos(datosDocumentos);
            });
    }

    private getDocumentos(datos: any): void {
        this.documentos = {};
        this.documentosServices.getDocumentos(datos).subscribe((res) => {
            for (const item of res.data) {
                if(!this.documentos[item.tipoTercero]){
                    this.documentos[item.tipoTercero] = []
                }
                this.documentos[item.tipoTercero].push(item)
            }
        });

        console.log('documentos', this.documentos);

    }

    // Order by descending property key
    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }

    public getTituloPorKey(text: string){
        switch(text){
            case 'C':
                return 'Codeudor'
            case 'S':
                return 'Deudor solidario'
            default:
                return 'Titular'
        }
    }

}
