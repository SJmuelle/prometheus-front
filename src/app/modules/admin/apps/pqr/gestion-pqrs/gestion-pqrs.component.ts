import { Component, DebugElement, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';

@Component({
    selector: 'app-gestion-pqrs',
    templateUrl: './gestion-pqrs.component.html',
    styleUrls: ['./gestion-pqrs.component.scss'],
})
export class GestionPQRSComponent implements OnInit {
    no_mostrar: boolean = true;
    pqrid: any;
    datos: any = {};
    tab: any;
    listadoSoluciones: any = 0;
    listadoHistorial: any = [];
    listadoAsignaciones: any = [];
    listadoNotificaciones: any = [];
    filtrarTablaAlertas: string;
    tamanoTablaAlertas: number = 5;
    filtrarTablaAsignaciones: string;
    tamanoTablaAsignaciones: number = 5;
    filtrarTablaHistorial: string;
    tamanoTablaHistorial: number = 5;
    seguimiento: {
        idPqrs: any;
        idPqrsPadre: number;
        motivoRechazo: string;
        idTipoComentario: number;
        detalle: string;
    };
    aprobarComentario: boolean;
    listarAdjuntos: any[];

    constructor(
        private _pqrService: PqrService,
        private _activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((param) => {
            this.pqrid = param.idPQR;
            this.buscarDatos();
        });
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
        let url = `/informacion-pqrs/${this.pqrid}`;
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
        //prueba
        // url = `/pqrs-escalar/${this.pqrid}`;
        // this._pqrService.getListados(url).subscribe((response: any) => {});

        //reposnable
        let usuario = JSON.parse(sessionStorage.getItem('usuario'));
        url = `/pqrs-validar-permisos/${this.pqrid}/${usuario.id}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            this.aprobarComentario =
                response.aprobarComentario == 1 ? true : false;
        });

        url = `/listar-adjuntos-pqrs/${this.pqrid}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            if (response) {
                this.listarAdjuntos = response;
            } else {
                this.listarAdjuntos = [];
            }
        });
    }

    onTabChanged(index): void {
        this.tab = index;
        let url;

        switch (index) {
            case 2:
                this.filtrarTablaHistorial = '';
                this.tamanoTablaHistorial = 5;
                url = `/informacion-historial-seguimiento/${this.pqrid}/0`;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de PQRS',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {});
                this._pqrService.getListados(url).subscribe((data: any) => {
                    this.listadoHistorial = data;
                    Swal.close();
                });
                break;
            case 3:
                this.filtrarTablaAsignaciones = '';
                this.tamanoTablaAsignaciones = 5;
                url = `/informacion-historial-asignaciones/${this.pqrid}`;
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
                this.filtrarTablaAlertas = '';
                this.tamanoTablaAlertas = 5;
                url = `/informacion-historial-notificaciones/${this.pqrid}`;
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
        debugger;
        let url = data.idComentario + data.extension;
        // url = url.replace('/', '\\');
        // url = url.replace('/', '\\');
        // window.open(url);
        window.open(url, 'el nombre', 'width=200,height=100');
    }

    cambiarEstado(item, estado) {
        let url = '/pqrs-responder-solucion';
        let data = {
            idComentario: parseInt(item.id),
            idPqrs: parseInt(this.pqrid),
            respuesta: estado,
            comentario: 'A',
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
                                this.guardar_data(data, url);
                            }
                        });
                    } else {
                        this.guardar_data(data, url);
                    }
                }
            });
    }

    guardar_data(data, url) {
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

    verAdjunto(id) {
        this.filtrarTablaHistorial = '';
        this.tamanoTablaHistorial = 5;
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
            // window.open(data.base64, 'Plan de pago', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=300,height=200,left = 390,top = 50');

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
