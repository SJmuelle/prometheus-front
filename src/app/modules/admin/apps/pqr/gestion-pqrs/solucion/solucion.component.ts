import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { InsertarAdjuntosComponent } from '../../creacion-pqrs/insertar-adjuntos/insertar-adjuntos.component';
import { PqrService } from '../../pqr.service';

@Component({
    selector: 'app-solucion',
    templateUrl: './solucion.component.html',
    styleUrls: ['./solucion.component.scss'],
})
export class SolucionComponent implements OnInit {
    @Output() cambiarEstado: EventEmitter<boolean> = new EventEmitter();
    @ViewChild('filep') fileP: ElementRef
    mensaje: any;
    aprobado: any;
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };
    @ViewChild('editor') editor;
    seguimiento: any = {};
    seguimiento_area: any = {};
    detalleSolucion: string = '';
    pqrid: any;
    datos: any = {};
    solucionArea: boolean = false;
    solucionCliente: boolean = false;
    todo: boolean = false;
    nada: boolean = false;
    file: any = null;
    filename: string;
    idTipoComentario: string;
    solucionCausal: number;
    @Input() idSolucion: number = 0;
    listadoSoluciones: any = [];
    ext: string;
    evidencia: any=[];
    envioCorreo: boolean=false;
    mensajeQuill: string;
    envio: string;
    constructor(
        private _pqrService: PqrService,
        public dialog: MatDialog,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((param) => {
            this.pqrid = param.idPQR;
        });
        let url = `informacion-pqrs/${this.pqrid}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            if (response) {
                this.datos = response[0];
                this.aprobado = response[0].aprobacionsol;
                this.seguimiento = {
                    idPqrs: parseInt(this.pqrid),
                    idPqrsPadre: this.datos.idPadre,
                    motivoRechazo: '',
                    idTipoComentario: 0,
                    detalle: '',
                    idSolucion: this.solucionCausal,
                    envio: this.envio
                };
                this.seguimiento_area = {
                    idPqrs: parseInt(this.pqrid),
                    idPqrsPadre: this.datos.idPadre,
                    motivoRechazo: '',
                    idTipoComentario: 0,
                    detalle: '',
                    idSolucion: this.solucionCausal
                };
                url = `pqrs-validar-permisos/${this.pqrid}/${usuario.id}`;
                this._pqrService.getListados(url).subscribe((response: any) => {
                    this.solucionArea =
                        response.solucionArea == 1 ? true : false;
                    this.solucionCliente =
                        response.solucionCliente == 1 ? true : false;
                    if (
                        this.solucionArea == true &&
                        this.solucionCliente == true
                    ) {
                        this.todo = true;
                    } else if (
                        this.solucionArea == false &&
                        this.solucionCliente == false
                    ) {
                        this.nada = true;
                    } else {
                        this.seguimiento.idTipoComentario =
                            this.solucionArea == true ? 1 : 2;
                    }
                });
            } else {
                this.datos = {};
            }
        });
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        this.obtenerSoluciones(this.idSolucion);
    }

    public onCharge(input: HTMLInputElement): void {
        const files = input.files;
        if (files && files.length) {
            const fileToRead = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(fileToRead);
            reader.onloadend = () => {
                const file: string | ArrayBuffer = reader.result;
                this.file = file;
                this.filename = fileToRead.name;
                let nombre = this.filename.split('.');
                this.ext = nombre[1].toLowerCase();
                if (fileToRead.size / 1024 <= 10000) {
                    if (
                        this.ext == 'pdf' ||
                        this.ext == 'jpg' ||
                        this.ext == 'png' ||
                        this.ext == 'docx' ||
                        this.ext == 'doc' ||
                        this.ext == 'xls' ||
                        this.ext == 'xlsx'
                    ) {
                        return;
                    }
                }

                Swal.fire(
                    'Información',
                    `Verificar las condiciones antes de subir un archivo.`,
                    'error'
                );
                this.file = '';
                this.filename = '';
                this.ext = '';
            };
        }
    }

    insertadjunti() {
        const dialogRef = this.dialog.open(InsertarAdjuntosComponent, {
            width: '60%',
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            let dataModal = result;
            if (
                dataModal.file != '' &&
                dataModal.file != undefined &&
                dataModal.file != null &&
                dataModal.descripcion != '' &&
                dataModal.descripcion != undefined &&
                dataModal.descripcion != null
            ) {
                if (this.idTipoComentario == "2") {

                        if (dataModal.ext !== 'pdf') {
                            Swal.fire(
                                'Información',
                                `Para soluciones del cliente solo es posible, subir archivos PDF .`,
                                'error'
                            );
                            return;
                        }

                }
                this.evidencia.push({
                    "nombreArchivo": dataModal.nombre,
                    "extension": dataModal.ext,
                    "base64": dataModal.file,
                    "descripcion": dataModal.descripcion
                });
            }
        });
    }

    logChange($event) {
        this.mensajeQuill=$event.text;
    }

    guardar() {
        if(this.envioCorreo==true){
            this.envio='S'
            if(this.editor.editorElem.outerText.length>650){
                Swal.fire(
                    'Información',
                    `La cantidad de caracteres máxima del comentario para ser enviada por correo es de: (650).
                    Su cantidad de caracteres actual es de: (${this.editor.editorElem.outerText.length})`,
                    'warning'
                );
                return
            }
        }else{
            this.envio='N'
        }

        this.seguimiento.idTipoComentario = parseInt(this.idTipoComentario);
        this.seguimiento_area.idTipoComentario = parseInt(this.idTipoComentario);
        this.seguimiento.idSolucion = this.solucionCausal ? this.solucionCausal: 0;
        this.seguimiento_area.idSolucion = this.solucionCausal ? this.solucionCausal: 0;
        this.seguimiento.envio = this.envio;
        let mensaje=this.editor.editorElem.outerText

        if (this.listadoSoluciones.length > 0) {
            if (this.seguimiento.idTipoComentario == 2 && this.seguimiento.idSolucion == 0) {
                Swal.fire(
                    'Información',
                    `Debe seleccionar una solución para esta PQRS.`,
                    'error'
                );
                return;
            }
        }

        if (this.listadoSoluciones.length > 0) {
            if (this.seguimiento_area.idTipoComentario == 2 && this.seguimiento_area.idSolucion == 0) {
                Swal.fire(
                    'Información',
                    `Debe seleccionar una solución para esta PQRS.`,
                    'error'
                );
                return;
            }
        }

        if (this.seguimiento.idTipoComentario === 2) {
            if (this.file != null) {
                if (this.ext !== 'pdf') {
                    Swal.fire(
                        'Información',
                        `Verificar las condiciones antes de subir un archivo.`,
                        'error'
                    );
                    return;
                }
            }
        }

        if (this.seguimiento_area.idTipoComentario === 2) {
            if (this.file != null) {
                if (this.ext !== 'pdf') {
                    Swal.fire(
                        'Información',
                        `Verificar las condiciones antes de subir un archivo.`,
                        'error'
                    );
                    return;
                }
            }
        }

        if (this.idTipoComentario=='2') {
            if (this.aprobado=='Si' || this.aprobado=='si') {
                let url = '/agregar-solucion-cliente_comentario';
                Swal.fire({
                    title: 'Cargando',
                    html: 'Guardando solución de PQRS',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {});
                this.seguimiento.detalle = this.editor.editorElem.outerText;
                debugger;
                this._pqrService.Create(url, this.seguimiento).subscribe((response: any) => {
                    Swal.close();
                    if (response) {
                        if (response.status === 200) {
                            if (response.data.respuesta.includes('Error')) {
                                Swal.fire(
                                    'Información',
                                    response.data.respuesta,
                                    'error'
                                );
                                return;
                            }
                            if (this.evidencia.length > 0) {
                                let data = {
                                    idComentario: response.data.respuesta,
                                    fuente: 'registro-pqrs',
                                    identificador: 'pqrs' + this.pqrid,
                                    file:this.evidencia
                                };
        
                                url = '/file/cargar-archivo-pqrs';
                                Swal.fire({
                                    title: 'Cargando',
                                    html: 'Guardando documento de PQRS',
                                    timer: 500000,
                                    didOpen: () => {
                                        Swal.showLoading();
                                    },
                                }).then((result) => {});
                                this._pqrService.postFile(url, data).subscribe((response: any) => {
                                    Swal.close();
                                    if (response) {
                                        Swal.fire(
                                            '¡Información!',
                                            `Se guardó el registro con éxito`,
                                            'success'
                                        ).then((resultado) => {});
                                        if (this.idTipoComentario == '2') {
                                            url = `/sendmail/notificacion-crear-pqrs`;
                                            this._pqrService.envioCorreos(
                                                url,
                                                this.pqrid,
                                                7,
                                                response.data.nombre,
                                                response.data.archivos,
                                                mensaje,
                                                this.envio='N'
                                            );
                                            
                                        }
                                        this.limpiar();
                                        this.recargarData();
                                    }
                                });
                            } else {
                                Swal.fire(
                                    '¡Información!',
                                    `Se guardó el registro con éxito`,
                                    'success'
                                ).then((resultado) => {})
                                if (this.idTipoComentario == '2') {
                                    url = `/sendmail/notificacion-crear-pqrs`;
                                    this._pqrService.envioCorreos(
                                        url,
                                        this.pqrid,
                                        7,
                                        "",
                                        "",
                                        mensaje,
                                        this.envio='N'
                                    );
                                }
                                this.limpiar();
                                this.recargarData();
                            }
        
                            if (this.idTipoComentario == '1') {
                                url = `/sendmail/notificacion-crear-pqrs`;
                                this._pqrService.envioCorreos(url, this.pqrid, 2);
                            }
                        } else {
                            Swal.fire(
                                'Información',
                                `Hubo un error en los datos enviados, favor evaluar`,
                                'success'
                            );
                        }
                    } else {
                        Swal.fire(
                            'Información',
                            'Error en la respuesta del servicio, favor intente nuevamente',
                            'error'
                        );
                    }
                });
            
            } else {
                let url = '/agregar-solucion-comentario';
                Swal.fire({
                    title: 'Cargando',
                    html: 'Guardando solución de PQRS',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {});
                this.seguimiento_area.detalle = this.editor.editorElem.outerText;
                this._pqrService.Create(url, this.seguimiento_area).subscribe((response: any) => {
                    Swal.close();
                    if (response) {
                        if (response.status === 200) {
                            if (response.data.respuesta.includes('Error')) {
                                Swal.fire(
                                    'Información',
                                    response.data.respuesta,
                                    'error'
                                );
                                return;
                            }
                            if (this.evidencia.length > 0) {
                                let data = {
                                    idComentario: response.data.respuesta,
                                    fuente: 'registro-pqrs',
                                    identificador: 'pqrs' + this.pqrid,
                                    file:this.evidencia
                                };
        
                                url = '/file/cargar-archivo-pqrs';
                                Swal.fire({
                                    title: 'Cargando',
                                    html: 'Guardando documento de PQRS',
                                    timer: 500000,
                                    didOpen: () => {
                                        Swal.showLoading();
                                    },
                                }).then((result) => {});
                                this._pqrService.postFile(url, data).subscribe((response: any) => {
                                    Swal.close();
                                    if (response) {
                                        Swal.fire(
                                            '¡Información!',
                                            `Se guardó el registro con éxito`,
                                            'success'
                                        ).then((resultado) => {});
                                        if (this.idTipoComentario == '2') {
                                            url = `/sendmail/notificacion-crear-pqrs`;
                                            this._pqrService.envioCorreos(
                                                url,
                                                this.pqrid,
                                                5,
                                                response.data.nombre,
                                                response.data.archivos,
                                                mensaje,
                                                this.envioCorreo==true?'S':'N'
                                            );
                                        }
                                        this.limpiar();
                                        this.recargarData();
                                    }
                                });
                            } else {
                                Swal.fire(
                                    '¡Información!',
                                    `Se guardó el registro con éxito`,
                                    'success'
                                ).then((resultado) => {});
                                if (this.idTipoComentario == '2') {
                                    url = `/sendmail/notificacion-crear-pqrs`;
                                    this._pqrService.envioCorreos(
                                        url,
                                        this.pqrid,
                                        5,
                                        "",
                                        "",
                                        mensaje,
                                        this.envioCorreo==true?'S':'N'
                                    );
                                }
                                this.limpiar();
                                this.recargarData();
                            }
        
                            if (this.idTipoComentario == '1') {
                                url = `/sendmail/notificacion-crear-pqrs`;
                                this._pqrService.envioCorreos(url, this.pqrid, 2);
                            }
                        } else {
                            Swal.fire(
                                'Información',
                                `Hubo un error en los datos enviados, favor evaluar`,
                                'success'
                            );
                        }
                    } else {
                        Swal.fire(
                            'Información',
                            'Error en la respuesta del servicio, favor intente nuevamente',
                            'error'
                        );
                    }
                });
                
            }
            
        } else {
            
            let url = '/agregar-solucion-comentario';
            Swal.fire({
                title: 'Cargando',
                html: 'Guardando solución de PQRS',
                timer: 500000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((result) => {});
            this.seguimiento_area.detalle = this.detalleSolucion;
            this._pqrService.Create(url, this.seguimiento_area).subscribe((response: any) => {
                Swal.close();
                if (response) {
                    if (response.status === 200) {
                        if (response.data.respuesta.includes('Error')) {
                            Swal.fire(
                                'Información',
                                response.data.respuesta,
                                'error'
                            );
                            return;
                        }
                        if (this.evidencia.length > 0) {
                            let data = {
                                idComentario: response.data.respuesta,
                                fuente: 'registro-pqrs',
                                identificador: 'pqrs' + this.pqrid,
                                file:this.evidencia
                            };
                            
                            url = '/file/cargar-archivo-pqrs';
                                Swal.fire({
                                    title: 'Cargando',
                                    html: 'Guardando documento de PQRS',
                                    timer: 500000,
                                    didOpen: () => {
                                        Swal.showLoading();
                                    },
                                }).then((result) => {});
                                this._pqrService.postFile(url, data).subscribe((response: any) => {
                                    Swal.close();
                                    if (response) {
                                        Swal.fire(
                                            '¡Información!',
                                            `Se guardó el registro con éxito`,
                                            'success'
                                        ).then((resultado) => {});
                                        // if (this.idTipoComentario == '2') {
                                        //     url = `/sendmail/notificacion-crear-pqrs`;
                                        //     this._pqrService.envioCorreos(
                                        //         url,
                                        //         this.pqrid,
                                        //         5,
                                        //         response.data.nombre,
                                        //         response.data.archivos,
                                        //         mensaje,
                                        //         this.envioCorreo==true?'S':'N'
                                        //     );
                                        // }
                                        this.limpiar();
                                        this.recargarData();
                                    }
                                });
                            
                        } else {
                            Swal.fire(
                                '¡Información!',
                                `Se guardó el registro con éxito`,
                                'success'
                            ).then((resultado) => {});
                            // if (this.idTipoComentario == '2') {
                            //     url = `/sendmail/notificacion-crear-pqrs`;
                            //     this._pqrService.envioCorreos(
                            //         url,
                            //         this.pqrid,
                            //         5,
                            //         response.data.nombre,
                            //         response.data.archivos,
                            //         mensaje,
                            //         this.envioCorreo==true?'S':'N'
                            //     );
                            // }
                            this.limpiar();
                            this.recargarData();
                        }
    
                        if (this.idTipoComentario == '1') {
                            url = `/sendmail/notificacion-crear-pqrs`;
                            this._pqrService.envioCorreos(url, this.pqrid, 2);
                        }
                    } else {
                        Swal.fire(
                            'Información',
                            `Hubo un error en los datos enviados, favor evaluar`,
                            'success'
                        );
                    }
                } else {
                    Swal.fire(
                        'Información',
                        'Error en la respuesta del servicio, favor intente nuevamente',
                        'error'
                    );
                }
            });
            
        }        
    }

    limpiar() {
        setTimeout(() => {
            location.reload();
        }, 10000);
        this.seguimiento = {
            idPqrs: parseInt(this.pqrid),
            idPqrsPadre: this.datos.idPadre,
            motivoRechazo: '',
            idTipoComentario: null,
            idSolucion: null,
            detalle: '',
        };
        this.evidencia=[]
        this.filename = '';
        this.file = undefined;
        this.fileP.nativeElement.value = '';
    }

    eliminarEvidencia(dato) {
        this.evidencia.splice(dato, 1);
    }

    recargarData() {
        this.cambiarEstado.emit(true);
    }

    obtenerSoluciones(id) {
        if (this.idSolucion > 0) {
            let url = `select-solucion-causales/${id}`;
            this._pqrService.getSolucionesCausales(url).subscribe((sol) => {
                if (sol) {
                    this.listadoSoluciones = sol;
                } else {
                    this.listadoSoluciones = [];
                }
            });
        }
    }
}
