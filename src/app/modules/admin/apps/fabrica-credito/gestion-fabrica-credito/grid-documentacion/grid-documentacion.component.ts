import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DocumentosAdjuntosService } from '../../../../../../core/services/documentos-adjuntos.service';
import Swal from 'sweetalert2';
import { FabricaCreditoService } from '../../../../../../core/services/fabrica-credito.service';
import { takeUntil } from 'rxjs/operators';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogCompararDocumentosComponent } from '../form-dialog-comparar-documentos/form-dialog-comparar-documentos.component';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import moment from 'moment';
import 'moment/locale/es';
import { PermisosService } from 'app/core/services/permisos.service';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

@Component({
    selector: 'app-grid-documentacion',
    templateUrl: './grid-documentacion.component.html',
    styleUrls: ['./grid-documentacion.component.scss'],
})
export class GridDocumentacionComponent implements OnInit, OnDestroy {
    public unSubscribe$: Subject<any> = new Subject<any>();
    public documentos$: Observable<any>;
    public unsubscribe$: Subject<any> = new Subject();
    public datosDocumentos: any = {};
    public archivoIzquierda: any = {};
    public archivoDerecha: any = {};
    public longitudArchivos: number = 0;
    public documentos: any[] = [];
    public documentosCodeudor: any[] = [];
    public documentosDeudor: any[] = [];
    public documentoComparado: FormControl = new FormControl('seleccione');
    public numeroSolicitud: string;
    public habilitarComparar: boolean = false;
    public datosDocumentosHistorico: any[] = [];
    public identificacion: string;
    public documentoSelected: any;
    public permisoEditar: boolean = false;
    public panelOpenState: boolean = false;
    public datoPreview: any;

    @Input() tipoDeudor: String;
    // @ViewChildren('checkboxes') checkbox: QueryList<ElementRef>;
    constructor(
        private route: ActivatedRoute,
        private documentosServices: DocumentosAdjuntosService,
        private fabricaCreditoService: FabricaCreditoService,
        private _dialog: MatDialog,
        public _permisosService: PermisosService
    ) {
        this.identificacion = this.route.snapshot.paramMap.get('id');
        this.numeroSolicitud = this.route.snapshot.paramMap.get('num');
        this.escuchaObservable();
    }
    ngOnInit(): void {
        this.permisoEditar =
            this._permisosService.permisoPorModuleTrazabilidad();
    }
    /**
     * @description: Escucha el observable
     * */
    public escuchaObservable(): void {
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

    /**
     * @description: Metodo para descargar documentos
     */
    public onDescargar(item: any): void {
        this.getDocumento(item);
    }

    /**
     * @description: Seleccion de check
     */
    public onSeleccionDocumento(event: MatCheckbox, item: any): void {
        if (event.checked) {
            this.documentos.map((x) => {
                if (x.idArchivoCargado === item.idArchivoCargado) {
                    x.selected = event.checked;
                    this.documentoSelected = x;
                }
                return x;
            });
            this.documentosDeudor.map((x) => {
                if (x.idArchivoCargado === item.idArchivoCargado) {
                    x.selected = event.checked;
                    this.documentoSelected = x;
                }
                return x;
            });
            this.documentosCodeudor.map((x) => {
                if (x.idArchivoCargado === item.idArchivoCargado) {
                    x.selected = event.checked;
                    this.documentoSelected = x;
                }
                return x;
            });
            const datos: any = {
                numeroSolicitud: this.numeroSolicitud,
                idAdjunto: item.idArchivoCargado,
            };

            this.seleccionDocumentoIzquierdo(datos);
        } else {
            this.longitudArchivos = 0;
            this.documentos.map((x) => {
                if (x.idArchivoCargado === item.idArchivoCargado) {
                    x.selected = event.checked;
                    this.documentoSelected = x;
                }
                return x;
            });
        }
    }

    public onSeleccionadoComparar(event: MatSelectChange): void {
        const datos: any = {
            numeroSolicitud: this.numeroSolicitud,
            idAdjunto: event.value,
        };
        this.seleccionDocumentoDerecho(datos);
    }
    /**
     * @description: Elimina documento adjunto
     */
    public onEliminarDocumento(item: any): void {
        const datos: any = {
            numeroSolicitud: Number(this.numeroSolicitud),
            idArchivoCargado: Number(item.idArchivoCargado),
            aplicaHistorial: 'S',
        };
        this.eliminarDocumentos(datos);
    }

    /**
     * @description: Metodo para descargar documentos
     */
    public onHistorico(item: any): void {
        this.getDocumentoHistorico(item);
    }

    public subirArchivo(input: any, item: any): void {
        let formulario: {};
        const files = input.target.files;
        if (files && files.length) {
            const fileToRead = files[0];
            let ext = fileToRead.name.split('.');
            ext = ext[ext.length - 1].toUpperCase();

            Swal.fire({
                title: 'Cargando',
                html: 'Guardando información',
                timer: 500000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((result) => { });

            const reader = new FileReader();
            reader.readAsDataURL(fileToRead);
            reader.onloadend = () => {
                const file: string | ArrayBuffer | null = reader.result;

                const extension: string = fileToRead.type.split('/')[1];
                const fechaHoy = Date.now();

                if (item.idArchivo === 303 || item.idArchivo === 615 || item.idArchivo === 327) {
                    this.cedulaCrearPDF(files, item)
                } else if (files.length > 1) {
                    this.createMultipleImgOnPDF(files, item);
                } else if (ext === 'PNG' || ext === 'JPG' || ext === 'JPEG') {
                    this.createPDF(file + '', ext).then((base64) => {
                        formulario = {
                            nombreArchivo: item.nombreArchivo + '' + fechaHoy,
                            extension: ext.toLowerCase(),
                            fuente: 'archivo-multi',
                            identificador: '',
                            numeroSolicitud:
                                this.datosDocumentos.numeroSolicitud,
                            tipoArchivo: item.idArchivo,
                            categoria: item.idCategoria,
                            agencia: 'OP',
                            tipo: 'negocio',
                            base64: 'data:application/pdf;base64,' + base64,
                        };
                        this.guardarAdjunto(formulario);
                    });
                } else {
                    formulario = {
                        nombreArchivo: item.nombreArchivo + '' + fechaHoy,
                        extension: ext.toLowerCase(),
                        fuente: 'archivo-multi',
                        identificador: '',
                        numeroSolicitud: this.datosDocumentos.numeroSolicitud,
                        tipoArchivo: item.idArchivo,
                        categoria: item.idCategoria,
                        agencia: 'OP',
                        tipo: 'negocio',
                        base64: file,
                    };
                    this.guardarAdjunto(formulario);
                }
            };
        }
    }

    async cedulaCrearPDF(files: any, item: any) {
        const pdfDoc = await PDFDocument.create();
        let error = false;
        files = Array.from(files);

        if (files.length === 2) {
            files.map((file, i) => {
                const fileToRead = file;
                let ext = fileToRead.name.split('.');
                ext = ext[ext.length - 1].toUpperCase();

                const reader = new FileReader();
                reader.readAsDataURL(fileToRead);

                reader.onloadend = async (rep) => {
                    const pag = pdfDoc.addPage();

                    const fileToDraw: string | ArrayBuffer | null =
                        reader.result;

                    switch (ext) {
                        case 'JPG':
                            const imgJPG = await pdfDoc.embedJpg(fileToDraw);
                            this.drawImgToPDF(
                                pag,
                                imgJPG,
                                i === files.length - 1,
                                item,
                                pdfDoc,
                                error
                            );
                            break;
                        case 'JPEG':
                            const imgJPEG = await pdfDoc.embedJpg(fileToDraw);
                            this.drawImgToPDF(
                                pag,
                                imgJPEG,
                                i === files.length - 1,
                                item,
                                pdfDoc,
                                error
                            );
                            break;
                        case 'PNG':
                            const imgPNG = await pdfDoc.embedPng(fileToDraw);
                            this.drawImgToPDF(
                                pag,
                                imgPNG,
                                i === files.length - 1,
                                item,
                                pdfDoc,
                                error
                            );
                            break;
                        default:
                            error = true;
                            this.drawImgToPDF(
                                pag,
                                null,
                                i === files.length - 1,
                                item,
                                pdfDoc,
                                error
                            );
                    }
                };
            });
        } else {
            Swal.fire(
                'Error',
                'Se deben subir dos archivos para este campo',
                'error'
            );
        }

    }

    async createMultipleImgOnPDF(files: any, item: any) {
        const pdfDoc = await PDFDocument.create();
        let error = false;
        files = Array.from(files);

        files.map((file, i) => {
            const fileToRead = file;
            let ext = fileToRead.name.split('.');
            ext = ext[ext.length - 1].toUpperCase();

            const reader = new FileReader();
            reader.readAsDataURL(fileToRead);

            reader.onloadend = async (rep) => {
                const pag = pdfDoc.addPage();

                const fileToDraw: string | ArrayBuffer | null = reader.result;

                switch (ext) {
                    case 'JPG':
                        const imgJPG = await pdfDoc.embedJpg(fileToDraw);
                        this.drawImgToPDF(
                            pag,
                            imgJPG,
                            i === files.length - 1,
                            item,
                            pdfDoc,
                            error
                        );
                        break;
                    case 'JPEG':
                        const imgJPEG = await pdfDoc.embedJpg(fileToDraw);
                        this.drawImgToPDF(
                            pag,
                            imgJPEG,
                            i === files.length - 1,
                            item,
                            pdfDoc,
                            error
                        );
                        break;
                    case 'PNG':
                        const imgPNG = await pdfDoc.embedPng(fileToDraw);
                        this.drawImgToPDF(
                            pag,
                            imgPNG,
                            i === files.length - 1,
                            item,
                            pdfDoc,
                            error
                        );
                        break;
                    default:
                        error = true;
                        this.drawImgToPDF(
                            pag,
                            null,
                            i === files.length - 1,
                            item,
                            pdfDoc,
                            error
                        );
                }
            };
        });
    }

    private async drawImgToPDF(
        pag: any,
        png: any,
        guardar: boolean,
        item: any,
        pdfDoc: any,
        error: boolean
    ) {
        if (error) {
            Swal.fire(
                'Error',
                'Solo se permiten extensiones JPG, JPEG o PNG',
                'error'
            );
        } else {
            const pngDim = png.scale(0.5);
            
            pag.drawImage(png, {
                x:  pngDim.width > pag.getWidth() ? 0 : pag.getWidth() / 2 - pngDim.width / 2,
                y: pag.getHeight() / 2 - pngDim.height / 2 + 250,
                width: pngDim.width > pag.getWidth() ? pag.getWidth() : pngDim.width,
                height: pngDim.height,
            });

            if (guardar) {
                const pdfBase64 = await pdfDoc.saveAsBase64();

                const formulario = {
                    nombreArchivo: item.nombreCategoria,
                    extension: 'pdf',
                    fuente: 'archivo-multi',
                    identificador: '',
                    numeroSolicitud: this.datosDocumentos.numeroSolicitud,
                    tipoArchivo: item.idArchivo,
                    categoria: item.idCategoria,
                    agencia: 'OP',
                    tipo: 'negocio',
                    base64: 'data:application/pdf;base64,' + pdfBase64,
                };
                this.guardarAdjunto(formulario);
            }
        }
    }

    async createPDF(base64: string, ext: string) {
        // hacer una validacion si es png o jpg
        const pdfDoc = await PDFDocument.create();

        const pag = pdfDoc.addPage();
        const { width, height } = pag.getSize();
        let pngImage;
        
        if (ext === 'PNG') {
            pngImage = await pdfDoc.embedPng(base64);
        } else {
            pngImage = await pdfDoc.embedJpg(base64);
        }
        
        const pngDim = pngImage.scale(0.5);
        pag.drawImage(pngImage, {
            x:  pngDim.width > pag.getWidth() ? 0 : pag.getWidth() / 2 - pngDim.width / 2,
            y: pag.getHeight() / 2 - pngDim.height / 2 + 250,
            width: pngDim.width > pag.getWidth() ? pag.getWidth() : pngDim.width,
            height: pngDim.height,
        });

        const pdfBase64 = await pdfDoc.saveAsBase64();

        return pdfBase64;
    }

    private getDocumentos(datos: any): void {
        this.documentosCodeudor = [];
        this.documentosDeudor = [];
        this.documentos = [];
        
        this.documentosServices.getDocumentos(datos).subscribe((res) => {
            for (const item of res.data) {
                switch (item.tipoTercero) {
                    case 'C':
                        this.documentosCodeudor.push(item);
                        break;
                    case 'S':                  
                        this.documentosDeudor.push(item);
                        break;
                    default:
                        this.documentos.push(item);
                        break;
                }
            }
            this.documentos.map((x) => {
                x['selected'] = false;
                return x;
            });
            this.documentosCodeudor.map((x) => {
                x['selected'] = false;
                return x;
            });
            this.documentosDeudor.map((x) => {
                x['selected'] = false;
                return x;
            });
        });
        
    }

    private guardarAdjunto(datos: any): void {
        this.documentosServices.adjuntarDocumento(datos).subscribe(
            (data: any) => {
                if (data.status === 200) {
                    Swal.fire(
                        '¡Información!',
                        'Se guardo el registro con éxito',
                        'success'
                    ).then((resultado) => {
                        if (resultado.isConfirmed) {
                            this.getDocumentos(this.datosDocumentos);
                        }
                    });
                }
            },
            (error) => {
                Swal.fire('¡Información!', error.error.msg, 'error');
            }
        );
    }

    public onDialogComparar(): void {
        const datosComparar: any = {
            izquierda: this.archivoIzquierda,
            derecha: this.archivoDerecha,
        };
        const dialogRef = this._dialog.open(
            FormDialogCompararDocumentosComponent,
            {
                minWidth: '100%',
                minHeight: '100vh',
                disableClose: true,
                data: datosComparar,
                panelClass: 'my-full-screen-dialog',
            }
        );
        dialogRef.afterClosed().toPromise();
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

    private getDocumentoPreView(datos: any) {
        this.datoPreview = datos
        
        const datosDescargar = {
            numeroSolicitud: this.numeroSolicitud,
            idAdjunto: datos.idArchivoCargado,
        };
        

        this.documentosServices
            .getDocumento(datosDescargar)
            .subscribe((res) => {   
                // console.log(extension);
                
                this.datoPreview.base64 = res.data.base64
                this.datoPreview.extension =  res.data.extension
            });
            
        return true
    }

    private seleccionDocumentoIzquierdo(datos: any): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Descargando...',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        this.documentosServices.getDocumento(datos).subscribe((res) => {
            if (res) {
                const archivo = res.data.base64.split(',')[1];
                const extension = res.data.nombreArchivo.split('.')[1];
                this.archivoIzquierda = {
                    // base64: `${archivo}`,
                    extension: extension,
                    base64:
                        extension === 'pdf'
                            ? `data:application/${extension};base64,${archivo}`
                            : `data:image/${extension};base64,${archivo}`,
                    nombreArchivo: res.data.nombreArchivo,
                };
                this.longitudArchivos = Object.keys(
                    this.archivoIzquierda
                ).length;
                // console.log(this.longitudArchivos);
            }
            // console.log(this.archivoIzquierda);
            Swal.close();
        });
    }
    private seleccionDocumentoDerecho(datos: any): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Descargando...',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        this.documentosServices.getDocumento(datos).subscribe((res) => {
            if (res) {
                this.habilitarComparar = true;
                const archivo = res.data.base64.split(',')[1];
                const extension = res.data.nombreArchivo.split('.')[1];
                this.archivoDerecha = {
                    // base64: `${archivo}`,
                    extension: extension,
                    base64:
                        extension === 'pdf'
                            ? `data:application/${extension};base64,${archivo}`
                            : `data:image/${extension};base64,${archivo}`,
                    nombreArchivo: res.data.nombreArchivo,
                };
            }
            Swal.close();
        });
    }

    private eliminarDocumentos(datos: any): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información...',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        this.documentosServices.eliminaDocumento(datos).subscribe(
            (data: any) => {
                if (data.status === 200) {
                    Swal.fire(
                        '¡Información!',
                        'Se eliminó el registro con éxito',
                        'success'
                    ).then((resultado) => {
                        if (resultado.isConfirmed) {
                            this.getDocumentos(this.datosDocumentos);
                        }
                    });
                }
            },
            (error) => {
                Swal.fire('¡Información!', 'Ha ocurrido un error', 'error');
            }
        );
    }

    private getDocumentoHistorico(datos: any): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información...',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        const datosHistorico = {
            numeroSolicitud: this.numeroSolicitud,
            idTipoArchivo: datos.idArchivo.toString(),
            unidadNegocio: datos.idUnidNegocio.toString(),
            tipoUltracem: this.datosDocumentos.tipoDocumento,
        };
        this.documentosServices
            .getDocumentoHistorico(datosHistorico)
            .subscribe((res) => {
                this.datosDocumentosHistorico = res.data;
                
                Swal.close();
            });
    }

    private getDownloadHistorico(data: any) {
        const archivo = data.base64.split(',')[1];
        const extension = data.nombreArchivo.split('.')[1];
        // console.log(extension);
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = `data:application/${extension};base64,${archivo}`;
        link.target = '_self';
        link.download = data.nombreArchivo + '.' + data.extension;
        link.click();
    }

    cambiarFecha(date) {
        moment.locale('es');
        return moment(date).format('MMMM D YYYY');
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }
}
