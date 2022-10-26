import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { AdjuntosComponent } from './adjuntos/adjuntos.component';
import { AgregarComentarioComponent } from './agregar-comentario/agregar-comentario.component';
import { VerComentarioComponent } from './ver-comentario/ver-comentario.component';

@Component({
    selector: 'app-gestion-pqrs',
    templateUrl: './gestion-pqrs.component.html',
    styleUrls: ['./gestion-pqrs.component.scss'],
})
export class GestionPQRSComponent implements OnInit {
    no_mostrar: boolean = true;
    unicoges: any =[];
    pqrid: any;
    datos: any = {};
    procedimientoid: any;
    comentarioid:number;
    comentariotipoid:number;
    envio:any;
    motivo:any;
    estado: string;
    UsuarioSaggics: string;
    tab: any;
    listadoSoluciones: any = 0;
    listadoGestion: any = [];
    listadoAdjuntos: any = [];
    listadoSeguimiento: any = [];
    listadoAsignaciones: any = [];
    listadoNotificaciones: any = [];
    filtrarTablaAlertas: string;
    tamanoTablaAlertas: number = 5;
    filtrarTablaAsignaciones: string;
    tamanoTablaAsignaciones: number = 5;
    filtrarTablaGestion: string;
    tamanoTablaGestion: number = 5;
    filtrarTablaSeguimiento: string;
    pageSeguimiento: number = 1;
    tamanoTablaSeguimiento: number = 5;
    seguimiento: {
        idPqrs: any;
        idPqrsPadre: number;
        motivoRechazo: string;
        idTipoComentario: number;
        detalle: string;
    };
    aprobarComentario: boolean;
    listarAdjuntos: any[];
    mostrarEditor: boolean = false;
    mostrarDescripcion: boolean = true;
    evidencia: any = [];
    descripcion: string = '';
    edicion={
        id:0,
        detalle_pqrs:this.datos.detalle
    }
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };
    @ViewChild('editor') editor2;
    mensajeQuill: string;
    archivo =[];
    objAdjunto: any = {};
    confIdComen: boolean;

    constructor(
        private _pqrService: PqrService,
        private _activatedRoute: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((param) => {
            this.pqrid = param.idPQR;
            this.buscarDatos();
        });
    }

    buscarUsuarioSagicc() {
        let urlOrigenCliente = `/generic/qry/obtener-usuario-prometheus/${this.UsuarioSaggics}`;
        this._pqrService.getListadosUnico(urlOrigenCliente).subscribe((response: any) => {
            if (response) {
                this.UsuarioSaggics=response.respuesta
            }
        });
    }

    vercomentario(id){
        const dialogRef = this.dialog.open(VerComentarioComponent, {
            width: '60%',
            height: '40%',
            data: id
        });
        dialogRef.afterClosed().toPromise();
    }

    logChange($event) {
        this.mensajeQuill=$event.text;
    }

    agregarcomentario(){
        const dialogRef = this.dialog.open(AgregarComentarioComponent, {
            width: '60%',
            data: {id: parseInt(this.pqrid), estado: this.datos.estado}
        })
        dialogRef.afterClosed().subscribe((result)=>{
            this.buscarDatos()
        })
    }

    onCharge(input: HTMLInputElement, ind): void {
        const files = input.files;
        if (files && files.length) {
            const fileToRead = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(fileToRead);
            reader.onloadend = () => {
                const file: string | ArrayBuffer = reader.result;
                this.evidencia[ind].file = file;
                this.evidencia[ind].filename = fileToRead.name;
                let nombre = this.evidencia[ind].filename.split('.');
                this.evidencia[ind].ext = nombre[1].toLowerCase();
                this.evidencia[ind].nombre = nombre[0];
            };
        }
    }

    insertadjunti() {
        this._pqrService.permisoCreacion('tk/validar-permisos-gestion-pqrs').subscribe((response: any)=>{
            if (response.data.area !== 'SAC') {
                Swal.fire(
                    '¡Información!',
                    `Este usuario no tiene permiso para añadir adjuntos.`,
                    'error'
                ).then();
                return;
            } else {
                const dialogRef = this.dialog.open(AdjuntosComponent, {
                    width: '60%',
                    data: {idPadre:parseInt(this.pqrid), idProcedimiento:this.procedimientoid},
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
                        this.evidencia.push({
                            "nombreArchivo": dataModal.nombre,
                            "extension": dataModal.ext,
                            "base64": dataModal.file,
                            "descripcion": dataModal.descripcion
                        });
                    }
                    let url = '/adjuntar-pqrs';
                    let data = {
                        idPadre: this.pqrid,
                        idProcedimiento: this.procedimientoid,
                        identificador:'pqrs',
                        file:this.evidencia,
                        user: ""
                    };
                    this._pqrService.postFile(url, data).subscribe((response: any) => {
                        if (response) {
                            this.buscarDatos()
                        }
                    });   
                });
            }
        })
        
    }

    crearJsonAdjuntos(): Array<JSON> {
        return  this.evidencia;
    }

    editarDescripcion(){
        this._pqrService.permisoCreacion('tk/validar-permisos-gestion-pqrs').subscribe((response: any)=>{
            if (response.data.area !== 'SAC') {
                Swal.fire(
                    '¡Información!',
                    `Este usuario no tiene permiso para editar descripción de la PQRS.`,
                    'error'
                ).then();
                return;
            } else {
                if (this.mostrarEditor==false && this.mostrarDescripcion==true) {
                    this.mostrarEditor=true;
                    this.mostrarDescripcion=false;
                }
            }
        })
        
    }

    guardarDescripcion(id, descripcion){
        let url = '/actualizar_pqr_descripcion';
        this.edicion={
            id:parseInt(id),
            detalle_pqrs:descripcion
        }
        this._pqrService.ActualizarDescripcion(url, this.edicion).subscribe((response:any)=>{
            Swal.fire(
              '¡Exito!',
              `Detalle actualizado correctamente.`,
              'success'
            ).then();

          })
        if (this.mostrarEditor==true && this.mostrarDescripcion==false) {
            this.mostrarEditor=false;
            this.mostrarDescripcion=true;
        }
    }

    buscarDatos() {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        //datos ingreso
        let url = `informacion-pqrs/${this.pqrid}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            Swal.close();
            if (response) {
                this.datos = response[0];
                this.listadoSoluciones = this.datos.idCausal;
                this.no_mostrar = false;
            } else {
                this.datos = {};
            }
        });
        //reposnable
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        url = `pqrs-validar-permisos/${this.pqrid}/${usuario.id}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            this.aprobarComentario =
                response.aprobarComentario == 1 ? true : false;
        });

        url = `listar-adjuntos-pqrs/${this.pqrid}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            if (response) {
                this.listarAdjuntos = response;
            } else {
                this.listarAdjuntos = [];
            }
        });

        url = `listar-comentarios-seguimiento/${this.pqrid}`;
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando comentario de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this._pqrService.getListados(url).subscribe((response: any) => {
            Swal.close();
            if (response) {
                this.listadoSeguimiento = response;
            } else {
                this.listadoSeguimiento = [];
            }
        });

        let urlproc = `id_comentario_pqrs/${this.pqrid}`;
        this._pqrService.getListados(urlproc).subscribe((response:any) =>{
            if (response) {
                this.procedimientoid = response[0].id;
            }
        });


    }

    onTabChanged(index): void {
        this.tab = index;
        let url;

        switch (index) {
            case 2:
                this.filtrarTablaGestion = '';
                this.tamanoTablaGestion = 5;
                url = `informacion-historial-seguimiento/${this.pqrid}/0`;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de PQRS',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {});
                this._pqrService.getListados(url).subscribe((data: any) => {
                    let unicos = [];
                    for (const iterator of data) {
                        const resultado = unicos.find( u => u.id === iterator.id );
                        if(resultado==undefined){
                            unicos.push(iterator)
                        }
                    }
                    this.listadoGestion = unicos.reverse();
                    Swal.close();
                    if (unicos.length<=0) {
                        Swal.fire({
                            icon: 'info',
                            title: '¡Información!',
                            text: 'No existen soluciones por aprobar o rechazar'
                        }).then()
                    } else {
                        this.listadoAdjuntos = [];
                        this.archivo = [];
                        for (let index = 0; index < unicos.length; index++) {
                            const elemento = unicos[index];
                            this.comentarioid = elemento.id;
                            this.comentariotipoid = elemento.id_tipo_comentario;
                            this.envio = elemento.envio;
                            this.motivo = elemento.detalle;
                            this.estado = elemento.estado;
                            let urlad = `adjunto-comentario/${this.comentarioid}`;
                            this._pqrService.getListados(urlad).subscribe((response:any) =>{
                                if (response.length > 0) {
                                    for (let index = 0; index < response.length; index++) {
                                        const element = response[index];
                                        this.listadoAdjuntos.push(element)
                                    }
                                }
                            });
                        }
                    }
                    
                    
                });
                
                break;
            case 3:
                this.filtrarTablaAsignaciones = '';
                this.tamanoTablaAsignaciones = 5;
                url = `informacion-historial-asignaciones/${this.pqrid}`;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de PQRS',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {});
                this._pqrService.getListados(url).subscribe((data: any) => {
                    Swal.close();
                    this.listadoAsignaciones = data;
                });
                break;
            case 4:
                this.filtrarTablaSeguimiento = '';
                this.tamanoTablaSeguimiento = 5;
                url = `listar-comentarios-seguimiento/${this.pqrid}`;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando comentario de PQRS',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {});
                this._pqrService.getListados(url).subscribe((response: any) => {
                    Swal.close();
                    if (response) {
                        this.listadoSeguimiento = response;
                    } else {
                        this.listadoSeguimiento = [];
                    }
                });
                break;
            case 5:
                this.filtrarTablaAlertas = '';
                this.tamanoTablaAlertas = 5;
                url = `informacion-historial-notificaciones/${this.pqrid}`;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de PQRS',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {});
                this._pqrService.getListados(url).subscribe((data: any) => {
                    this.listadoNotificaciones = data;
                    Swal.close();
                });
                break;
            default:
                break;
        }
    }

    busacar_url(data) {
        let url = data.idComentario + data.extension;
        window.open(url, 'el nombre', 'width=200,height=100');
    }

    cambiarEstado(item, estado) {
        if (this.listadoAdjuntos.length>0) {
            for (let index = 0; index < this.listadoAdjuntos.length; index++) {
                this.objAdjunto = {
                    idComentario:this.listadoAdjuntos[index].id_comentario,
                    documento:this.listadoAdjuntos[index].documento,
                    filepath:this.listadoAdjuntos[index].filepath,
                    filename:this.listadoAdjuntos[index].filename,
                    extension:this.listadoAdjuntos[index].extension,
                    descripcion:this.listadoAdjuntos[index].descripcion
                }
                if (item.id==this.objAdjunto.idComentario) {
                    this.archivo.push(this.objAdjunto)
                }
            }
        }
        if (item.id_tipo_comentario==2) {
            let url = '/pqrs-responder-solucion-cliente';
            let data = {
                idComentario: parseInt(item.id),
                idPqrs: parseInt(this.pqrid),
                respuesta: estado,
                comentario: 'A'
            };
            const swalWithBootstrapButtons = Swal.mixin({});

            swalWithBootstrapButtons
                .fire({
                    text: `¿Está seguro que desea ${
                        estado == true ? 'aprobar' : 'rechazar'
                    } la solución?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: `Si, ${
                        estado == true ? 'aprobar' : 'rechazar'
                    } la solución`,
                    cancelButtonText: 'No, cancelar',
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        if (!estado) {
                            Swal.fire({
                                title: 'Ingresar el motivo del rechazo',
                                input: 'textarea',
                                inputAttributes: {
                                    autocapitalize: 'off',
                                },
                                showCancelButton: true,
                                showLoaderOnConfirm: true,
                                confirmButtonText: 'Rechazar solicitud',
                                cancelButtonText: 'Cancelar',
                                allowOutsideClick: () => !Swal.isLoading(),
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    if (result.value.length == 0) {
                                        Swal.fire(
                                            'Información',
                                            'El motivo es obligatorio',
                                            'error'
                                        );
                                        return;
                                    }
                                    if (result.value.length > 150) {
                                        Swal.fire(
                                            'Información',
                                            'El motivo no puede superar los 150 carácteres',
                                            'error'
                                        );
                                        return;
                                    }
                                    data.comentario = result.value;
                                    this.guardar_data(item, data, url);
                                }
                            });
                        } else {
                            this.guardar_data(item, data, url);
                        }
                    }
                });

        } else {
            let url = '/pqrs-responder-solucion';
            let data = {
                idComentario: parseInt(item.id),
                idPqrs: parseInt(this.pqrid),
                respuesta: estado,
                comentario: 'A'
            };
            const swalWithBootstrapButtons = Swal.mixin({});

            swalWithBootstrapButtons
                .fire({
                    text: `¿Está seguro que desea ${
                        estado == true ? 'aprobar' : 'rechazar'
                    } la solución?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: `Si, ${
                        estado == true ? 'aprobar' : 'rechazar'
                    } la solución`,
                    cancelButtonText: 'No, cancelar',
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        if (!estado) {
                            Swal.fire({
                                title: 'Ingresar el motivo del rechazo',
                                input: 'textarea',
                                inputAttributes: {
                                    autocapitalize: 'off',
                                },
                                showCancelButton: true,
                                showLoaderOnConfirm: true,
                                confirmButtonText: 'Rechazar solicitud',
                                cancelButtonText: 'Cancelar',
                                allowOutsideClick: () => !Swal.isLoading(),
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    if (result.value.length == 0) {
                                        Swal.fire(
                                            'Información',
                                            'El motivo es obligatorio',
                                            'error'
                                        );
                                        return;
                                    }
                                    if (result.value.length > 150) {
                                        Swal.fire(
                                            'Información',
                                            'El motivo no puede superar los 150 carácteres',
                                            'error'
                                        );
                                        return;
                                    }
                                    data.comentario = result.value;
                                    this.guardar_data(item, data, url);
                                }
                            });
                        } else {
                            this.guardar_data(item, data, url);
                        }
                    }
                });
        }


    }

    guardar_data(item, data, url) {
        if (item.id_tipo_comentario==2) {
            Swal.fire({
                title: 'Cargando',
                html: 'Guardando información de PQRS',
                timer: 500000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((result) => {});
            this._pqrService.Create(url, data).subscribe((response: any) => {
                Swal.close();
                if (response) {
                    if (response.status == 200) {
                        if (response.data.respuesta == 'OK') {
                            Swal.fire(
                                'Información',
                                `Se guardó el registro con éxito`,
                                'success'
                            );
                            this.onTabChanged(2);
                            let url = `/sendmail/notificacion-crear-pqrs`;
                            if (this.archivo[0].idComentario==0) {
                                if (data.respuesta == true) {
                                    this._pqrService.enviaCorreos(
                                        url,
                                        data.idPqrs,
                                        5,
                                        data.comentario,
                                        "",
                                        item.detalle,
                                        item.envio
                                    );
                                } else {
                                    this._pqrService.envioCorreos(
                                        url,
                                        data.idPqrs,
                                        4,
                                        data.comentario,
                                        "",
                                        item.detalle,
                                        "N"
                                    );
                                }
                            } else {
                                if (data.respuesta == true) {
                                    this._pqrService.enviaCorreos(
                                        url,
                                        data.idPqrs,
                                        5,
                                        data.comentario,
                                        this.archivo,
                                        item.detalle,
                                        item.envio
                                    );
                                } else {
                                    this._pqrService.envioCorreos(
                                        url,
                                        data.idPqrs,
                                        4,
                                        data.comentario,
                                        "",
                                        item.detalle,
                                        "N"
                                    );
                                }
                            }
                            this.buscarDatos();
                        } else {
                            Swal.fire(
                                'Información',
                                response.data.respuesta,
                                'error'
                            );
                        }
                    } else {
                        Swal.fire(
                            'Información',
                            `Hubo un error en los datos enviados, favor validar`,
                            'error'
                        );
                    }
                } else {
                    Swal.fire(
                        'Advertencia',
                        'Error en la respuesta del servicio, favor intente nuevamente',
                        'error'
                    );
                }
            });
        } else {
            Swal.fire({
                title: 'Cargando',
                html: 'Guardando información de PQRS',
                timer: 500000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((result) => {});
            this._pqrService.Create(url, data).subscribe((response: any) => {
                Swal.close();
                if (response) {
                    if (response.status == 200) {
                        if (response.data.respuesta == 'OK') {
                            Swal.fire(
                                'Información',
                                `Se guardó el registro con éxito`,
                                'success'
                            );
                            this.onTabChanged(2);

                            let url = `/sendmail/notificacion-crear-pqrs`;
                            // /${data.idPqrs}/${data.respuesta == true ? 1 : 0}/${data.comentario}`;
                            this._pqrService.envioCorreos(
                                url,
                                data.idPqrs,
                                data.respuesta == true ? 3 : 4,
                                data.comentario
                            );
                            this.buscarDatos();
                        } else {
                            Swal.fire(
                                'Información',
                                response.data.respuesta,
                                'error'
                            );
                        }
                    } else {
                        Swal.fire(
                            'Información',
                            `Hubo un error en los datos enviados, favor validar`,
                            'error'
                        );
                    }
                } else {
                    Swal.fire(
                        'Advertencia',
                        'Error en la respuesta del servicio, favor intente nuevamente',
                        'error'
                    );
                }
            });

        }

    }

    eliminarAdjunto(item){
        this._pqrService.permisoCreacion('tk/validar-permisos-gestion-pqrs').subscribe((response: any)=>{
            if (response.data.area !== 'SAC') {
                Swal.fire(
                    '¡Información!',
                    `Este usuario no tiene permiso para eliminar adjuntos.`,
                    'error'
                ).then();
                return;
            } else {
                Swal.fire({
                    title: '¿Desea eliminar ' +item.descripcion+ '?',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: `No`
                }).then((resultado) => {
                    if (resultado.isConfirmed) {
                        let url = '/update-adjunto';
                        let data = {
                            id:item.idComentario
                        }
                        this._pqrService.Create(url, data).subscribe((response:any)=>{
                            if (response) {
                                this.buscarDatos()
                            }
                        })
                    }
                });
            }
        })
        
    }

    verAdjunto(id) {
        this.filtrarTablaGestion = '';
        this.tamanoTablaGestion = 5;
        let data = {
            idAdjunto: id,
        };
        let url = `/file/load/mostrar-adjunto-pqrs`;
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información de PQRS',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this._pqrService.postFile(url, data).subscribe((data: any) => {
            const downloadLink = document.createElement('a');
            document.body.appendChild(downloadLink);
            downloadLink.href = data.data.base64;
            downloadLink.target = '_self';
            downloadLink.download = data.data.nombreArchivo;
            downloadLink.click();
            Swal.close();
        });
    }

    cargarDatos(event) {
        if (event == true) {
            this.buscarDatos();
        }
    }
}
