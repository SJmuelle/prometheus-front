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
    @Input() apiData: any;
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
        this.getDocumentosData()
        console.log(this.apiData);
        
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
        console.log('datosSolidario', datosSolicitud);
        
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
                console.log('datosDocumentos', datosDocumentos);
                
                this.datosDocumentos = datosDocumentos;
                this.getDocumentos(datosDocumentos);
            });
    }

    private getDocumentos(datos: any): void {
        this.documentos = {};
        this.documentosServices.getDocumentos(datos).subscribe((res) => {
            for (const item of res.data) {
                if(item.archivoCargado !== 'N'){
                    if (!this.documentos[item.tipoTercero]) {
                        this.documentos[item.tipoTercero] = []
                    }
                    this.documentos[item.tipoTercero].push(item)
                }  
            }
            console.log('documentos', this.documentos);
            
        });

    }

    // Order by descending property key
    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }

    public getTituloPorKey(text: string) {
        switch (text) {
            case 'C':
                return 'Codeudor'
            case 'S':
                return 'Deudor solidario'
            default:
                return 'Titular'
        }
    }   

    getExtension(nombreArchivoReal: string) {
        const split = nombreArchivoReal.split('.')
        return split[split.length - 1];
    }

    getIconByExtension(nombreArchivoReal: string) {
        const ext = this.getExtension(nombreArchivoReal).toUpperCase()

        if (ext === 'OGG' || ext === 'MP3' || ext === 'ACC') {
            return "assets/icons/file-audio.svg"
        }if(ext === 'PDF'){
            return "assets/icons/pdf-icon.svg"
        }if(ext === 'XLSX'){
            return "assets/icons/excel-icon.svg"
        }
        else{
           return "assets/icons/document.svg"
        }
    }

    /**
     * @description: Metodo para descargar documentos
     */
    public onDescargar(item: any): void {
        this.getDocumento(item);
    }

    private getDocumento(datos: any): void {
        const datosDescargar = {
            numeroSolicitud: this.numeroSolicitud,
            idAdjunto: datos.idArchivoCargado,
        };
        this.documentosServices
            .getDocumento(datosDescargar)
            .subscribe((res) => {
                const archivo = res.data.base64.split(',')[1];
                const extension = res.data.nombreArchivo.split('.')[1];
                // console.log(extension);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.href = `data:application/${extension};base64,${archivo}`;
                link.target = '_self';
                link.download = res.data.nombreArchivo;
                link.click();
            });
    }

    private ocultarTercero(key: string){
        if(key === 'S'){
            return this.apiData.resumenGeneral.codigoTipoDeudor !== '2' || this.apiData.resumenGeneral.codigoTipoDeudor !== '3'
        }
        if(key === 'C'){
            return this.apiData.resumenGeneral.codigoTipoDeudor !== '1' || this.apiData.resumenGeneral.codigoTipoDeudor !== '3'
        }else{
            return false
        }    
    }
}
