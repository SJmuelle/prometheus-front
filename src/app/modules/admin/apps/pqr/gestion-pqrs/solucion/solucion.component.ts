import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
    selector: 'app-solucion',
    templateUrl: './solucion.component.html',
    styleUrls: ['./solucion.component.scss'],
})
export class SolucionComponent implements OnInit {
    @Output() cambiarEstado: EventEmitter<boolean> = new EventEmitter();
    mensaje: any;
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    seguimiento: any = {};
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
    constructor(
        private _pqrService: PqrService,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((param) => {
            this.pqrid = param.idPQR;
        });
        let url = `/informacion-pqrs/${this.pqrid}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            if (response) {
                this.datos = response[0];
                this.seguimiento = {
                    idPqrs: parseInt(this.pqrid),
                    idPqrsPadre: this.datos.idPadre,
                    motivoRechazo: '',
                    idTipoComentario: null,
                    detalle: '',
                    idSolucion: this.solucionCausal,
                };
                url = `/pqrs-validar-permisos/${this.pqrid}/${usuario.id}`;
                this._pqrService.getListados(url).subscribe((response: any) => {
                    // aprobarComentario: 0
                    // solucionArea: 0
                    // solucionCliente: 0
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
        let usuario = JSON.parse(sessionStorage.getItem('usuario'));
        this.obtenerSoluciones(this.idSolucion);
    }

    public onCharge(input: HTMLInputElement): void {
        // this.showButtonSave = false;
        // this.showButtonRecord = true;
        // this.nameFile = 'masivo.cvs';
        const files = input.files;
        // console.log(files);
        // this.filename = "archivo.ext";
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
                // console.log(this.file);
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

    guardar() {
        this.seguimiento.idTipoComentario = parseInt(this.idTipoComentario);
        this.seguimiento.idSolucion = this.solucionCausal
            ? this.solucionCausal
            : 0;

        if (this.listadoSoluciones.length > 0) {
            if (
                this.seguimiento.idTipoComentario == 2 &&
                this.seguimiento.idSolucion == 0
            ) {
                Swal.fire(
                    'Información',
                    `Debe seleccionar una solución para esta PQRS.`,
                    'error'
                );
                return;
            }
        }

        if (this.seguimiento.idTipoComentario == 2) {
            if (this.file != null) {
                if (this.ext != 'pdf') {
                    Swal.fire(
                        'Información',
                        `Verificar las condiciones antes de subir un archivo.`,
                        'error'
                    );
                    return;
                }
            } else {
                Swal.fire(
                    'Información',
                    `Debe agregar un archivo PDF para dar una respuesta al cliente.`,
                    'error'
                );
                return;
            }
        }

        let url = '/agregar-solucion-comentario';
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando solución de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this._pqrService
            .Create(url, this.seguimiento)
            .subscribe((response: any) => {
                Swal.close();
                if (response) {
                    if (response.status == 200) {
                        console.log(response.data.respuesta);
                        if (response.data.respuesta.includes('Error')) {
                            Swal.fire(
                                'Información',
                                response.data.respuesta,
                                'error'
                            );
                            return;
                        }
                        if (this.file != null) {
                            let nombre = this.filename.split('.');
                            let data = {
                                idComentario: response.data.respuesta,
                                nombreArchivo: `solucion${this.pqrid}_${response.data.respuesta}`,
                                extension: nombre[1].toLowerCase(),
                                fuente: 'registro-pqrs',
                                identificador: 'pqrs' + this.pqrid,
                                base64: this.file,
                                descripcion: this.filename,
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
                            this._pqrService
                                .postFile(url, data)
                                .subscribe((response: any) => {
                                    Swal.close();
                                    if (response) {
                                        Swal.fire(
                                            '¡Información!',
                                            `Se guardó el registro con éxito`,
                                            'success'
                                        ).then((resultado) => {
                                            console.log(response);
                                            if (resultado) {
                                                // if (this.idTipoComentario == '1') {
                                                //     url = `/sendmail/notificacion-crear-pqrs`;
                                                //     this._pqrService.envioCorreos(url, this.pqrid, 5, response.data.nombre, response.data.ubicacion);
                                                //     // this._pqrService.envioCorreos(url, response.data.id, 5);
                                                // }

                                                if (
                                                    this.idTipoComentario == '2'
                                                ) {
                                                    url = `/sendmail/notificacion-crear-pqrs`;
                                                    this._pqrService.envioCorreos(
                                                        url,
                                                        this.pqrid,
                                                        5,
                                                        response.data.nombre,
                                                        response.data.ubicacion
                                                    );
                                                }

                                                this.limpiar();
                                                this.recargarData();
                                            }
                                        });
                                    }
                                });
                        } else {
                            Swal.fire(
                                '¡Información!',
                                `Se guardó el registro con éxito`,
                                'success'
                            ).then((resultado) => {
                                if (resultado) {
                                    this.limpiar();
                                    this.recargarData();
                                }
                            });
                        }

                        if (this.idTipoComentario == '1') {
                            url = `/sendmail/notificacion-crear-pqrs`; ///${this.pqrid}`;
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

    limpiar() {
        this.seguimiento = {
            idPqrs: parseInt(this.pqrid),
            idPqrsPadre: this.datos.idPadre,
            motivoRechazo: '',
            idTipoComentario: null,
            idSolucion: null,
            detalle: '',
        };
        this.filename = '';
        this.file = null;
    }

    recargarData() {
        this.cambiarEstado.emit(true);
    }

    obtenerSoluciones(id) {
        if (this.idSolucion > 0) {
            let url = `/select-solucion-causales/${id}`;
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
