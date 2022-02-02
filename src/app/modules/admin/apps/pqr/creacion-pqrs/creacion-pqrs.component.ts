import { Component, OnInit } from '@angular/core';
import { PqrService } from '../pqr.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { InsertarCausalLegalComponent } from './insertar-causal-legal/insertar-causal-legal.component';
import { InsertarAdjuntosComponent } from './insertar-adjuntos/insertar-adjuntos.component';
import { DirectionsComponent } from 'app/shared/modal/directions/directions.component';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-creacion-pqrs',
    templateUrl: './creacion-pqrs.component.html',
    styleUrls: ['./creacion-pqrs.component.scss'],
})
export class CreacionPQRSComponent implements OnInit {
    mostrar_formulario: boolean = true;
    datos: any = {};
    panelOpenState: boolean = false;
    tabMostrar: number;
    identificaiconCliente: any;
    // listados
    listadoTipoCliente: any[];
    listadoLineaNegocio: any[];
    listadoNegocio: any[];
    //formulario
    datosBasicosDisabled: boolean;
    mensaje: any;
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };
    listadoTipoPQRS: any[];
    listadoCasualPQRS: any[];
    listadoProcedimientoPQRS: any[];
    listadoResponsablePQRS: any[];
    listadoOrigenCliente: any[];
    clienteExistente: boolean;
    filename: string;
    file: any;
    evidencia: any = [];
    causalesLegales: any = [];
    campana: any;
    tipo: any;
    UsuarioSaggics: string;
    EstadoSagicc: boolean = false;

    constructor(
        private _pqrService: PqrService,
        private _activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        private router: Router,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((param) => {
            if (param.cliente) {
                this.identificaiconCliente = param.cliente;
                // this.insertadjunti();
                this.tabMostrar = 1;
                this.buscarListados();
                this.UsuarioSaggics = '';
                this.EstadoSagicc = false;
            } else {
                this.identificaiconCliente = param.numeroDocumeto;
                this.campana = param.campana;
                this.tipo = param.tipo;
                this.UsuarioSaggics = param.usuario;
                this.EstadoSagicc = true;

                this._authService
                    .signIn({
                        userName: environment.userName,
                        password: environment.password,
                    })
                    .subscribe(
                        () => {
                            // this.insertadjunti();
                            this.tabMostrar = 1;
                            this.buscarListados();

                            setTimeout(() => {
                                this.datos.canpana = this.campana;
                                this.datos.origen = this.tipo;
                            }, 1000);
                        },
                        (response) => {
                            Swal.fire(
                                '¡Advertencia!',
                                'Esta opción es para clientes nuevos, por favor ingresar mediante hoja de vida/historial de PQRS/Crear PQRS.',
                                'warning'
                            ).then();
                        }
                    );
            }
            // alert(this.identificaiconCliente)
        });
    }

    buscarListados() {
        //datos ingreso
        let urlOrigenCliente = `/tk/informacion-pqrs-origen`;
        this._pqrService
            .getListados(urlOrigenCliente)
            .subscribe((response: any) => {
                if (response) {
                    this.listadoOrigenCliente = response;
                } else {
                    this.listadoOrigenCliente = [];
                }
            });
        let urlTIpoCliente = `/tk/informacion-tipos-cliente`;
        this._pqrService
            .getListados(urlTIpoCliente)
            .subscribe((response: any) => {
                if (response) {
                    this.listadoTipoCliente = response;
                } else {
                    this.listadoTipoCliente = [];
                }
            });
        let urlLineaNegocio = `/informacion-lineas-negocio/${this.identificaiconCliente}`;
        this._pqrService
            .getListados(urlLineaNegocio)
            .subscribe((response: any) => {
                if (response) {
                    this.listadoLineaNegocio = response;
                } else {
                    this.listadoLineaNegocio = [];
                }
            });
        //datos basicos
        if (this.identificaiconCliente == 0) {
            this.datos.identificacion = '';
            this.datos.nombres = '';
            this.datos.apellidos = '';
            this.datos.departamento = '';
            this.datos.ciudad = '';
            this.datos.direccion = '';
            this.datos.barrio = '';
            this.datos.telefono = '';
            this.datos.email = '';
            this.datosBasicosDisabled = false;
            this.clienteExistente = false;
            this.datos.tipo = 2;
            this.datos.tipoPQRS_nombre = 'Nuevo';
            this.identificaiconCliente = null;
            this.datos.primerContacto = false;
        } else {
            let urlinfoCliente = `/informacion-cliente/${this.identificaiconCliente}`;
            this._pqrService
                .getListados(urlinfoCliente)
                .subscribe((response: any) => {
                    if (response) {
                        this.datos.identificacion = this.identificaiconCliente;
                        this.datos.nombres = `${response.primerNombre} ${response.segundoNombre}`;
                        this.datos.apellidos = `${response.primerApellido} ${response.segundoApellido}`;
                        this.datos.departamento = `${response.departamento}`;
                        this.datos.ciudad = `${response.ciudad}`;
                        this.datos.direccion = `${response.direccion}`;
                        this.datos.barrio = `${response.barrio}`;
                        (this.datos.telefono =
                            response.celular == 0
                                ? response.telefono
                                : response.celular),
                            (this.datos.email = `${response.email}`);
                        this.datosBasicosDisabled = true;
                        this.clienteExistente = false;
                        this.datos.tipo = 1;
                        this.datos.tipoPQRS_nombre = 'Cliente';
                    } else {
                        this.datos.identificacion = this.identificaiconCliente;
                        this.datos.nombres = '';
                        this.datos.apellidos = '';
                        this.datos.departamento = '';
                        this.datos.ciudad = '';
                        this.datos.direccion = '';
                        this.datos.barrio = '';
                        this.datos.telefono = '';
                        this.datos.email = '';
                        this.datosBasicosDisabled = false;
                        this.clienteExistente = true;
                        this.datos.tipo = 2;
                        this.datos.tipoPQRS_nombre = 'Nuevo';
                    }

                    this.datos.primerContacto = false;
                });
        }
        //detalle de PQRS
        let urltipoPQRS = `/tk/select-tipo-pqrs`;
        this._pqrService.getListados(urltipoPQRS).subscribe((response: any) => {
            if (response) {
                this.listadoTipoPQRS = response;
            } else {
                this.listadoTipoPQRS = [];
            }
        });
    }

    validaForm(tab) {
        // debugger;
        switch (tab) {
            case 1:
                if (
                    this.datos.origen != '' &&
                    this.datos.origen != undefined &&
                    this.datos.origen != null
                ) {
                    this.tabMostrar = 2;
                }
                break;
            case 2:
                if (
                    this.identificaiconCliente != '' &&
                    this.identificaiconCliente != undefined &&
                    this.identificaiconCliente != null &&
                    this.datos.nombres != '' &&
                    this.datos.nombres != undefined &&
                    this.datos.nombres != null &&
                    this.datos.apellidos != '' &&
                    this.datos.apellidos != undefined &&
                    this.datos.apellidos != null &&
                    this.datos.departamento != '' &&
                    this.datos.departamento != undefined &&
                    this.datos.departamento != null &&
                    this.datos.ciudad != '' &&
                    this.datos.ciudad != undefined &&
                    this.datos.ciudad != null &&
                    this.datos.telefono != '' &&
                    this.datos.telefono != undefined &&
                    this.datos.telefono != null &&
                    this.datos.direccion != '' &&
                    this.datos.direccion != undefined &&
                    this.datos.direccion != null &&
                    this.datos.email != '' &&
                    this.datos.email != undefined &&
                    this.datos.email != null
                ) {
                    this.tabMostrar = 3;
                }
                break;
            case 3:
                if (
                    this.datos.tipoPQRS != '' &&
                    this.datos.tipoPQRS != undefined &&
                    this.datos.tipoPQRS != null &&
                    this.datos.procedimiento != '' &&
                    this.datos.procedimiento != undefined &&
                    this.datos.procedimiento != null &&
                    this.datos.causal != '' &&
                    this.datos.causal != undefined &&
                    this.datos.causal != null
                ) {
                    this.tabMostrar = 4;
                }
                break;
            default:
                break;
        }
    }

    //datos ingreso
    negociosCabeceras(tipo) {
        let url = `/pqrs-negocios-cabecera/${tipo}/${this.identificaiconCliente}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            if (response) {
                this.listadoNegocio = response;
            } else {
                this.listadoNegocio = [];
            }
        });
    }

    seleccionarNegocio(negocio) {
        let index = this.listadoNegocio.findIndex(
            (data) => data.codigoNegocio === negocio
        );
        if (index != undefined) {
            this.datos.agencia = this.listadoNegocio[index].agencia;
            this.datos.entidad = this.listadoNegocio[index].entidad;
        } else {
            this.datos.agencia = '';
            this.datos.entidad = '';
        }
    }

    eliminarCausal(dato) {
        this.causalesLegales.splice(dato, 1);
    }

    eliminarEvidencia(dato) {
        this.evidencia.splice(dato, 1);
    }

    //datos basicos
    buscarDatosBasicos() {
        if (this.identificaiconCliente.length == 0) {
            return;
        }
        let urlinfoCliente = `/informacion-cliente/${this.identificaiconCliente}`;
        this._pqrService
            .getListados(urlinfoCliente)
            .subscribe((response: any) => {
                // debugger;
                if (response) {
                    Swal.fire(
                        '¡Advertencia!',
                        'Esta opción es para clientes nuevos, por favor ingresar mediante Servicio al cliente/Gestión al cliente/historial de PQRS/Crear PQRS.',
                        'warning'
                    ).then();
                    setTimeout(() => {
                        this.router.navigateByUrl('/dashboard');
                    }, 1000);
                } else {
                    this.datos.identificacion = this.identificaiconCliente;
                    this.datos.tipoPQRS_nombre = 'Nuevo';
                }
            });
    }

    //detalles
    validoLegal() {
        // this.datos.responsable = this.listadoResponsablePQRS[0].login;
        let index = this.listadoTipoPQRS.findIndex(
            (data) => data.id == this.datos.tipoPQRS
        );
        if (index != -1) {
            this.datos.legal =
                this.listadoTipoPQRS[index].legal == 'Si' ? true : false;
            this.datos.Tiponombre = this.listadoTipoPQRS[index].tipoPqrs;
        }
    }

    buscarSelectDinamico(path, tipo, variable, titulo) {
        let url = `/${path}/${tipo}`;
        this._pqrService.getListados(url).subscribe((response: any) => {
            if (response.length != 0) {
                this[variable] = response;
                if (variable == 'listadoResponsablePQRS') {
                    this.datos.responsable =
                        this.listadoResponsablePQRS[0].login;
                    this.datos.area = this.listadoResponsablePQRS[0].area;
                    let index = this.listadoProcedimientoPQRS.findIndex(
                        (data) => data.id == tipo
                    );
                    if (index != -1) {
                        this.datos.fechaParaSolucion =
                            this.listadoProcedimientoPQRS[index].diaSolucion;
                    } else {
                        this.datos.fechaParaSolucion = '';
                    }
                }
            } else {
                Swal.fire(
                    '¡Información!',
                    `No tiene ${titulo} parametrizada`,
                    'error'
                ).then();
                this[variable] = [];
            }
        });
    }

    mostrarMensaje() {
        // console.log(this.datos.descripcion);
    }

    guardar() {
        debugger;
        this._pqrService
            .permisoCreacion('tk/validar-permisos-gestion-pqrs')
            .subscribe((response: any) => {
                debugger;
                console.log(response.data.area);
                if (response.data.area !== 'SAC') {
                    Swal.fire(
                        '¡Información!',
                        `Este usuario no tiene permiso para crear una PQRS`,
                        'error'
                    ).then();
                    return;
                } else {
                    let data = {
                        empresa: 'FINV',
                        campanha:
                            this.datos.campana == undefined
                                ? ''
                                : this.datos.campana,
                        origenPqrs: parseInt(this.datos.origen),
                        tipoCliente: parseInt(this.datos.tipo),
                        codigoNegocio:
                            this.datos.negocio == undefined
                                ? ''
                                : this.datos.negocio,
                        sucursal:
                            this.datos.agencia == undefined
                                ? ''
                                : this.datos.agencia,
                        entidad:
                            this.datos.entidad == undefined
                                ? ''
                                : this.datos.entidad,
                        idCliente: this.datos.identificacion,
                        nombres: this.datos.nombres,
                        apellidos: this.datos.apellidos,
                        departamento: this.datos.departamento,
                        ciudad: this.datos.ciudad,
                        barrio: this.datos.barrio,
                        direccion: this.datos.direccion,
                        celular: this.datos.telefono,
                        email: this.datos.email,
                        idProcedimiento: parseInt(this.datos.procedimiento),
                        detallePqrs:
                            this.datos.descripcion == undefined
                                ? ''
                                : this.datos.descripcion,
                        idPqrspadre: '',
                        fechaSolucion: this.datos.fechaParaSolucion,
                        primerContacto: this.datos.primerContacto,
                        adjuntos: this.crearJsonAdjuntos(),
                        hijos: this.crearJsonHijas(),
                        user: this.UsuarioSaggics,
                    };
                    let url = '/crear-pqrs';

                    this.crearJsonHijas();

                    Swal.fire({
                        title: 'Cargando',
                        html: 'Guardando información de PQRS',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        timer: 500000,
                        didOpen: () => {
                            Swal.showLoading();

                            this._pqrService
                                .CreatePqrs(url, data)
                                .subscribe((response: any) => {
                                    Swal.close();
                                    if (response) {
                                        if (response.status == 200) {
                                            Swal.fire({
                                                title: 'Información',
                                                html: `${response.data.descripcion} ${response.data.pqrs}.`,
                                                icon: 'success',
                                                showConfirmButton: true,
                                            }).then((result) => {
                                                debugger;
                                                if (
                                                    this.EstadoSagicc == false
                                                ) {
                                                    let url = `pqr/list`;
                                                    this.router.navigateByUrl(
                                                        url
                                                    );
                                                } else {
                                                    this.mostrar_formulario =
                                                        false;
                                                }
                                            });
                                            setTimeout(() => {
                                                debugger;
                                                if (
                                                    this.EstadoSagicc == false
                                                ) {
                                                    let url = `pqr/list`;
                                                    this.router.navigateByUrl(
                                                        url
                                                    );
                                                } else {
                                                    this.mostrar_formulario =
                                                        false;
                                                }
                                            }, 2000);
                                        } else {
                                            Swal.fire(
                                                '¡Información!',
                                                `Hubo un error en los datos enviados, favor validar`,
                                                'error'
                                            ).then();
                                        }
                                    } else {
                                        Swal.fire(
                                            '¡Advertencia!',
                                            'Error en la respuesta del servicio, favor intente nuevamente',
                                            'error'
                                        ).then();
                                    }
                                });
                        },
                    }).then((result) => {});
                }
            });
    }

    public onCharge(input: HTMLInputElement, ind): void {
        // this.showButtonSave = false;
        // this.showButtonRecord = true;
        // this.nameFile = 'masivo.cvs';
        const files = input.files;
        // console.log(files);
        if (files && files.length) {
            const fileToRead = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(fileToRead);
            reader.onloadend = () => {
                const file: string | ArrayBuffer = reader.result;
                this.evidencia[ind].file = file;
                this.evidencia[ind].filename = fileToRead.name;
                let nombre = this.evidencia[ind].filename.split('.');
                this.evidencia[ind].ext = nombre[1];
                this.evidencia[ind].nombre = nombre[0];
                // console.log(this.evidencia[ind].file);
            };
        }
    }

    guardarAdjunto(ind) {
        this.evidencia.forEach((element) => {
            if (element.file != null) {
                let nombre = element.filename.split('.');
                let data = {
                    idComentario: ind + '',
                    nombreArchivo: nombre[0].toLowerCase(),
                    extension: nombre[1].toLowerCase(),
                    fuente: 'registro-pqrs',
                    identificador: 'pqrs' + ind,
                    base64: element.file,
                    descripcion: element.descripcion,
                };
                let url = '/file/cargar-archivo-pqrs';
                this._pqrService
                    .postFile(url, data)
                    .subscribe((response: any) => {
                        if (response) {
                        }
                    });
            }
        });
    }

    insertarCausal() {
        const dialogRef = this.dialog.open(InsertarCausalLegalComponent, {
            width: '60%',
            data: {
                Tiponombre: this.datos.Tiponombre,
                tipo: this.datos.tipoPQRS,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            let dataModal = result;
            if (
                dataModal.procedimiento != '' &&
                dataModal.procedimiento != undefined &&
                dataModal.procedimiento != null &&
                dataModal.causal != '' &&
                dataModal.causal != undefined &&
                dataModal.causal != null
            ) {
                const encontrodo = this.causalesLegales.find(
                    (element) =>
                        element.procedimiento == dataModal.procedimiento
                );

                if (encontrodo) {
                    Swal.fire(
                        'Advertencia',
                        'Este procedimiento ya fue asociado a este registro.',
                        'error'
                    );
                    return;
                }

                if (this.datos.procedimiento == dataModal.procedimiento) {
                    Swal.fire(
                        'Advertencia',
                        'Este procedimiento ya fue asociado a este registro.',
                        'error'
                    );
                    return;
                }
                this.causalesLegales.push(dataModal);
            }
        });
    }

    guardHijos(respuesta, dataPadre, url) {
        //debugger;
        this.causalesLegales.forEach((element) => {
            let dataHijos = {
                empresa: 'FINV',
                campanha:
                    this.datos.campana == undefined ? '' : this.datos.campana,
                origenPqrs: parseInt(this.datos.origen),
                tipoCliente: parseInt(this.datos.tipo),
                codigoNegocio:
                    this.datos.negocio == undefined ? '' : this.datos.negocio,
                sucursal:
                    this.datos.agencia == undefined ? '' : this.datos.agencia,
                entidad:
                    this.datos.entidad == undefined ? '' : this.datos.entidad,
                idCliente: this.datos.identificacion,
                nombres: this.datos.nombres,
                apellidos: this.datos.apellidos,
                departamento: this.datos.departamento,
                ciudad: this.datos.ciudad,
                barrio: this.datos.barrio,
                direccion: this.datos.direccion,
                celular: this.datos.telefono,
                email: this.datos.email,
                idProcedimiento: parseInt(element.procedimiento),
                detallePqrs:
                    this.datos.descripcion == undefined
                        ? ''
                        : this.datos.descripcion,
                idPqrspadre: respuesta.idPadre + '',
                fechaSolucion: element.fechaParaSolucion,
            };
            this._pqrService
                .Create(url, dataHijos)
                .subscribe((response: any) => {
                    Swal.close();
                    if (response) {
                        if (response.status == 200) {
                            if (response.data.salida != 200) {
                                Swal.fire(
                                    '¡Información!',
                                    `Datos incompletos, favor evaluar`,
                                    'error'
                                ).then();
                                return;
                            }

                            this.guardarAdjunto(response.data.idProcedimiento);
                            let url = `/sendmail/notificacion-crear-pqrs`; /*${response.data.idPadre} `;*/
                            this._pqrService.envioCorreos(
                                url,
                                response.data.idPadre,
                                1,
                                '',
                                ''
                            );
                        } else {
                            Swal.fire(
                                '¡Información!',
                                `Hubo un error en los datos enviados, favor validar`,
                                'error'
                            ).then();
                            return;
                        }
                    } else {
                        Swal.fire(
                            '¡Advertencia!',
                            'Error en la respuesta del servicio, favor intente nuevamente',
                            'error'
                        ).then();
                        return;
                    }
                });
        });
        Swal.fire({
            title: 'Información',
            html: 'La PQRS se ha creado con éxito',
            icon: 'success',
            showLoaderOnConfirm: true,
            showConfirmButton: true,
        }).then((result) => {
            let url = `/pqr/list`;
            this.router.navigateByUrl(url);
        });
        setTimeout(() => {
            let url = `/pqr/list`;
            this.router.navigateByUrl(url);
        }, 5000);
    }

    mostrarDireccion() {
        // debugger;
        const dialogRef = this.dialog.open(DirectionsComponent, {
            width: '60%',
            data: {
                departamento: this.datos.departamento,
                municipio: this.datos.ciudad,
                barrio: this.datos.barrio,
                direccion: this.datos.direccion,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            let dataModal = result;
            if (dataModal.departamentoNombre != undefined) {
                this.datos.departamento = dataModal.departamentoNombre;
                this.datos.ciudad = dataModal.municipioNombre;
                this.datos.barrio =
                    dataModal.barrio == null ? '' : dataModal.barrio;
                this.datos.direccion =
                    (dataModal.viaNombre == undefined
                        ? ''
                        : `${dataModal.viaNombre}`) +
                    (dataModal.callePrincipal == undefined
                        ? ''
                        : ` ${dataModal.callePrincipal}`) +
                    (dataModal.numero == undefined
                        ? ''
                        : ` # ${dataModal.numero}`) +
                    (dataModal.numero2 == undefined
                        ? ''
                        : ` - ${dataModal.numero2}`) +
                    (dataModal.complemento == undefined
                        ? ''
                        : ` ${dataModal.complemento}`);
            }
        });
    }

    insertadjunti() {
        const dialogRef = this.dialog.open(InsertarAdjuntosComponent, {
            width: '60%',
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            // console.log('The dialog was closed');
            // console.log(result);
            let dataModal = result;
            if (
                dataModal.file != '' &&
                dataModal.file != undefined &&
                dataModal.file != null &&
                dataModal.descripcion != '' &&
                dataModal.descripcion != undefined &&
                dataModal.descripcion != null
            ) {
                this.evidencia.push(dataModal);
            }
        });
    }

    crearJsonHijas(): Array<JSON> {
        let dataHijos = [];

        this.causalesLegales.forEach((element) => {
            dataHijos.push({
                empresa: 'FINV',
                campanha:
                    this.datos.campana == undefined ? '' : this.datos.campana,
                origenPqrs: parseInt(this.datos.origen),
                tipoCliente: parseInt(this.datos.tipo),
                codigoNegocio:
                    this.datos.negocio == undefined ? '' : this.datos.negocio,
                sucursal:
                    this.datos.agencia == undefined ? '' : this.datos.agencia,
                entidad:
                    this.datos.entidad == undefined ? '' : this.datos.entidad,
                idCliente: this.datos.identificacion,
                nombres: this.datos.nombres,
                apellidos: this.datos.apellidos,
                departamento: this.datos.departamento,
                ciudad: this.datos.ciudad,
                barrio: this.datos.barrio,
                direccion: this.datos.direccion,
                celular: this.datos.telefono,
                email: this.datos.email,
                idProcedimiento: parseInt(element.procedimiento),
                detallePqrs:
                    this.datos.descripcion == undefined
                        ? ''
                        : this.datos.descripcion,
                idPqrspadre: '',
                fechaSolucion: element.fechaParaSolucion,
                adjuntos: this.crearJsonAdjuntos(),
                primerContacto: false,
                user: this.UsuarioSaggics,
            });
        });

        return dataHijos;
    }

    crearJsonAdjuntos(): Array<JSON> {
        let data = [];
        this.evidencia.forEach((element) => {
            if (element.file != null) {
                let nombre = element.filename.split('.');
                data.push({
                    idComentario: '',
                    nombreArchivo: nombre[0].toLowerCase(),
                    extension: nombre[1].toLowerCase(),
                    fuente: 'registro-pqrs',
                    identificador: 'pqrs',
                    base64: element.file,
                    descripcion: element.descripcion,
                });
            }
        });
        return data;
    }
}
