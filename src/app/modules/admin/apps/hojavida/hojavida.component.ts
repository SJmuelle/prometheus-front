import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalIngresoComponent } from 'app/components/hojadevida/modal-ingreso/modal-ingreso.component';
import { ModalcarteraComponent } from 'app/components/hojadevida/modalcartera/modalcartera.component';
import { ModalcreditoComponent } from 'app/components/hojadevida/modalcredito/modalcredito.component';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import { CarteraService } from 'app/resources/services/hojadevida/cartera/cartera.service';
import { CreditoService } from 'app/resources/services/hojadevida/credito/credito.service';
import { HistorialGestionService } from 'app/resources/services/hojadevida/historial-gestion.service';
import { HojadevidaService } from 'app/resources/services/hojadevida/hojadevida.service';
import { NegociacionesService } from 'app/resources/services/hojadevida/negociaciones.service';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import moment, { Moment } from 'moment';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr/pqr.service';
import { CertificadorDeudaComponent } from './modales/certificador-deuda/certificador-deuda.component';


/**
 * Se utiliza un arreglo de opciones para pintar la tabla
 */



@Component({
    selector: 'app-hojavida',
    templateUrl: './hojavida.component.html',
    styleUrls: ['./hojavida.component.scss'],
})
export class HojavidaComponent implements OnInit {
    listCodigoNegocio: any = [];
    info_cliente: any = {};
    mostrarDatoCliente: boolean;
    listadoCredito: any = [];
    filtrarTabla: string;
    filtrarTablaCartera: string;
    filtrarTablaHN: string;
    ListadoCartera: any = [];
    listadoNegociaciones: any = [];
    listaHistoria: any = [];
    listadoExtractos: any = [];
    tab: number;
    listadoReporteCentrales: any = [];
    codigoNegocio2: string;
    tamanoTablaHG: number;
    filtrarTablaHG: string;
    tamanoTablaNeg: number;
    filtrarTablaNeg: string;
    filtrarTablaExt: string;
    tamanoTablaExt: number;
    filtrarReporteC: string;
    tamanoTablaRC: number;
    btnBuscar: boolean;
    filtrarPQRS: string;
    tamanoPQRS: number;
    listadoPQRS: any = [];
    formCertificados: FormGroup;
    fechaMinima: Moment;
    // CERTIFICACIONES
    historialCertificado: any = [];
    infoLiquidacion: any = [];
    public dataOptionTable: any[] = [
        {
            name: 'negocio',
            text: 'Negocio',
            typeField: 'text',
        },
        {
            name: 'periodoLote',
            text: 'Periodo',
            typeField: 'text',
        },
        {
            name: 'novedad',
            text: 'Novedad',
            typeField: 'text',
        },
        {
            name: 'cuotasMora',
            text: ' Dìas en mora ',
            typeField: 'text',
        },
        {
            name: 'saldoDeuda',
            text: 'Valor',
            typeField: 'text',
            pipeName: 'number'
        },
        {
            name: 'saldoMora',
            text: ' Saldo en mora ',
            typeField: 'text',
            pipeName: 'number'
        },
    ];

    public dataOptionTablePQRS: any[] = [
        {
            name: 'fechaCreacion',
            text: 'Fecha',
            typeField: 'text',
            pipeName: 'date'
        },
        {
            name: 'numeroPqrs',
            text: 'Numero',
            typeField: 'text',
        },
        {
            name: 'tipoPqrs',
            text: 'Tipo',
            typeField: 'text',
        },
        {
            name: 'causalPqrs',
            text: 'Causal',
            typeField: 'text',
        },
        {
            name: 'estado',
            text: 'Estado',
            typeField: 'text',
        },
        {
            name: 'responsable',
            text: 'Responsable',
            typeField: 'text',

        },
        {
            name: 'solucion',
            text: 'Solución',
            typeField: 'text',
        },
    ];

    public dataOptionTableHistorial: IoptionTable[] = [
        {
            name: 'fechaGestion',
            text: 'Fecha gestión',
            typeField: 'text',
            pipeName: 'date'

        },
        {
            name: 'gestor',
            text: 'Gestor',
            typeField: 'text',
        },
        {
            name: 'tipoGestion',
            text: 'Tipo gestión',
            typeField: 'text',
        },
        {
            name: 'proximaAccion',
            text: 'Proxima acción',
            typeField: 'text',
        },
        {
            name: 'fechaProxAccion',
            text: 'Fecha prox acción',
            typeField: 'text',
            pipeName: 'date'
        },
        {
            name: 'Detalle',
            text: 'Detalle',
            typeField: 'function',
            callback: (dataRow) => {
                const titulo = dataRow.tipoGestion;
                const name = dataRow.detalleGestion;
                this.mostrar_mensaje(titulo, name);
            }

        },
    ];

    public dataOptionTableNegociaciones: IoptionTable[] = [
        {
            name: 'codigoNegocio',
            text: 'Código negocio',
            typeField: 'text',

        },
        {
            name: 'fechaCreacion',
            text: 'Fecha creación',
            typeField: 'text',
            pipeName: 'date'
        },
        {
            name: 'usuarioCreacion',
            text: 'Usuario creación',
            typeField: 'text',
        },
        {
            name: 'tipoNegociacion',
            text: 'Tipo negociación',
            typeField: 'text',
        },
        {
            name: 'fechaAplicacion',
            text: 'Fecha aplicación',
            typeField: 'text',
            pipeName: 'date'
        },
    ];

    public dataOptionExtratos: any[] = [
        {
            name: 'consecutivo',
            text: 'Consecutivo',
            typeField: 'text',
        },
        {
            name: 'fechaEnvio',
            text: 'Fecha envio',
            typeField: 'text',
            pipeName: 'date'
        },
        {
            name: 'metodoEnvio',
            text: 'Método envio',
            typeField: 'text',
        },
        {
            name: 'Detalle',
            text: 'Extracto',
            typeField: 'function',
            callback: (dataRow) => {
                const { extracto } = dataRow
                this.busacar_url2(extracto)
            }

        },
    ];


    constructor(
        private _hojadevidaService: HojadevidaService,
        private _creditoService: CreditoService,
        private _pqrService: PqrService,
        public dialog: MatDialog,
        private _carteraService: CarteraService,
        private route: ActivatedRoute,
        private router: Router,
        private _historialService: HistorialGestionService,
        private _negociacionesService: NegociacionesService,
        private _tableSearch: TableDataFilterService,
        private fb: FormBuilder
    ) { }

    busqueda: string;
    clienteID: number;
    codigoNegocio: string;

    ngOnInit(): void {
        this.mostrarDatoCliente = false;
        this.filtrarTabla = '';
        this.tab = 0;
        this.btnBuscar = false;
        this.createFormulario();
        this.fechaValida();
        const fecha = new DatePipe('en-US');

        this.formCertificados.controls.tipoCertificado.valueChanges.subscribe(
            (res) => {
                if (res == 2) {
                    this.formCertificados.controls.fechaMaxima.setValidators([
                        Validators.required,
                    ]);
                } else {
                    this.formCertificados.controls.fechaMaxima.clearValidators();
                    this.formCertificados.controls.fechaMaxima.reset();
                }
                this.formCertificados.controls.fechaMaxima.updateValueAndValidity();
            }
        );
    }

    getListadoCredito() {
        this._hojadevidaService
            .getNegocios(this.clienteID)
            .subscribe((res1: any) => {
                this.listCodigoNegocio = res1;
            });
    }

    public search(value: string): void {
        this._tableSearch.sendFilterData(value);

    }

    buscarClientes() {
        if (this.busqueda == '1') {
            if (
                this.clienteID == null ||
                this.clienteID == undefined ||
                this.clienteID == 0
            ) {
                Swal.fire(
                    '¡Advertencia!',
                    'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
                    'error'
                );
                return;
            }
            this.btnBuscar = true;
            if (
                this.codigoNegocio2 == null ||
                this.codigoNegocio2 == undefined ||
                this.codigoNegocio2.length == 0
            ) {
                this.codigoNegocio = this.clienteID + '';
            } else {
                this.codigoNegocio = this.codigoNegocio2;
            }
            Swal.fire({
                title: 'Cargando',
                html: 'Buscando información...',
                timer: 500000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((result) => { });
            this._hojadevidaService
                .getInfoCliente(this.codigoNegocio)
                .subscribe((res2: any) => {
                    this.btnBuscar = false;
                    if (res2.status == 202) {
                        Swal.fire(
                            '¡Advertencia!',
                            `${this.busqueda == '2'
                                ? 'El código del negocio '
                                : 'El documento '
                            } ingresado no corresponde a ningún registro guardado. Favor verificar`,
                            'error'
                        );
                        this.info_cliente = {};
                        this.mostrarDatoCliente = false;
                        return;
                    } else {
                        if (res2.data.length == 0) {
                            Swal.fire(
                                '¡Advertencia!',
                                `${this.busqueda == '2'
                                    ? 'El código del negocio '
                                    : 'El documento '
                                } ingresado no corresponde a ningún registro guardado. Favor verificar`,
                                'error'
                            );
                            this.info_cliente = {};
                            this.mostrarDatoCliente = false;
                            return;
                        }
                        this.info_cliente = res2.data;
                        this.mostrarDatoCliente = true;
                        this.onTabChanged(this.tab);
                        this.historialCertificados(
                            this.info_cliente.identificacion
                        );
                    }
                });
        } else {
            if (
                this.codigoNegocio == null ||
                this.codigoNegocio == undefined ||
                this.codigoNegocio.length == 0
            ) {
                Swal.fire(
                    '¡Advertencia!',
                    'Para este tipo de búsqueda, mínimo es necesario el código negocio',
                    'error'
                );
                return;
            }
            Swal.fire({
                title: 'Cargando',
                html: 'Buscando información...',
                timer: 500000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((result) => { });
            this._hojadevidaService
                .getInfoCliente(this.codigoNegocio)
                .subscribe((res2: any) => {
                    Swal.close();
                    if (res2.status == 202) {
                        Swal.fire(
                            '¡Advertencia!',
                            `${this.busqueda == '2'
                                ? 'El código del negocio '
                                : 'El documento '
                            } ingresado no corresponde a ningún registro guardado. Favor verificar`,
                            'error'
                        );
                        this.info_cliente = {};
                        this.mostrarDatoCliente = false;
                        return;
                    }
                    if (res2.data.length == 0) {
                        Swal.fire(
                            '¡Advertencia!',
                            `${this.busqueda == '2'
                                ? 'El código del negocio '
                                : 'El documento '
                            } ingresado no corresponde a ningún registro guardado. Favor verificar`,
                            'error'
                        );
                        this.info_cliente = {};
                        this.mostrarDatoCliente = false;
                        return;
                    }
                    this.info_cliente = res2.data;
                    this.mostrarDatoCliente = true;
                    this.onTabChanged(this.tab);
                    this.historialCertificados(
                        this.info_cliente.identificacion
                    );
                });
        }
    }

    limpiar() {
        this.busqueda = null;
        this.clienteID = null;
        this.codigoNegocio = null;
        this.listadoExtractos = [];
        this.listadoPQRS = [];
    }

    onTabChanged(index): void {
        this.btnBuscar = false;
        this.tab = index;
        switch (index) {
            case 0:
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de crédito',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => { });
                this.listadoCredito = [];
                // SERVICIO DE LA PESTAÑA DEL CREDITO
                this._creditoService
                    .getCredito(this.codigoNegocio)
                    .subscribe((respCredito: any) => {
                        Swal.close();
                        if (respCredito.data) {
                            this.listadoCredito = respCredito.data;
                        } else {
                            this.listadoCredito = [];
                        }
                    });
                break;
            case 1:
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de cartera',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => { });
                this._carteraService
                    .getCartera(this.info_cliente.identificacion)
                    .subscribe((respCartera: any) => {
                        Swal.close();
                        if (respCartera.data) {
                            this.ListadoCartera = respCartera.data;
                        } else {
                            this.ListadoCartera = [];
                        }
                    });
                break;
            case 2:
                this.filtrarTablaHG = '';
                this.tamanoTablaHG = 5;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de historial de gestión',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => { });
                this._historialService
                    .getHistorialGestion(this.codigoNegocio)
                    .subscribe((response: any) => {
                        Swal.close();
                        if (response.data) {
                            this.listaHistoria = response.data;
                        } else {
                            this.listaHistoria = [];
                        }
                    });
                break;
            case 3:
                this.filtrarTablaNeg = '';
                this.tamanoTablaNeg = 5;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de negociaciones',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => { });
                this._negociacionesService
                    .getNegociaciones(this.codigoNegocio)
                    .subscribe((response: any) => {
                        // this.listadoNegociaciones = response.data;
                        Swal.close();
                        if (response.data) {
                            this.listadoNegociaciones = response.data;
                        } else {
                            this.listadoNegociaciones = [];
                        }
                    });
                break;
            case 4:
                this.filtrarTablaExt = '';
                this.tamanoTablaExt = 5;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando Historial de extractos',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => { });
                this._negociacionesService
                    .getInformacionExtractos(this.codigoNegocio)
                    .subscribe((response: any) => {
                        // this.listadoExtractos = response.data;
                        Swal.close();
                        if (response.data) {
                            this.listadoExtractos = response.data;
                        } else {
                            this.listadoExtractos = [];
                        }
                    });
                break;
            case 5:
                this.filtrarReporteC = '';
                this.tamanoTablaRC = 5;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de reporte de las centrales',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => { });
                this._negociacionesService
                    .getReporteCentrales(this.codigoNegocio)
                    .subscribe((response: any) => {
                        // this.listadoReporteCentrales = response.data;
                        Swal.close();
                        if (response.data) {
                            this.listadoReporteCentrales = response.data;
                        } else {
                            this.listadoReporteCentrales = [];
                        }
                    });
                break;
            case 6:
                this.filtrarPQRS = '';
                this.tamanoPQRS = 5;
                Swal.fire({
                    title: 'Cargando',
                    html: 'Buscando información de reporte de las centrales',
                    timer: 500000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => { });
                let url = `informacion-historial-pqrs/${this.info_cliente.identificacion}`;
                this._pqrService.getListados(url).subscribe((response: any) => {
                    // this.listadoReporteCentrales = response.data;
                    Swal.close();

                    if (response) {
                        this.listadoPQRS = response;
                    } else {
                        this.listadoPQRS = [];
                    }
                });
            case 7:
                this.historialCertificados(this.info_cliente.identificacion);
                break;
            default:
                break;
        }
    }

    openDialogCredito(codigoNegocio): void {
        const dialogRef = this.dialog.open(ModalcreditoComponent, {
            // mixWidth: '480px',
            // mixHeight: '550px',
            data: { codigoNegocio },
        });
        dialogRef.afterClosed().subscribe((result) => { });
    }

    openDialogCartera(index, saldo, id): void {
        if (saldo == 0) {
            Swal.fire(
                '¡Información!',
                `El credito no tienen detalle`,
                'success'
            );
            return;
        }
        const dialogRef = this.dialog.open(ModalcarteraComponent, {
            // width: '1080px',
            // maxHeight: '550px',
            data: { codigoNegocio: index, ideNegocio: id },
        });

        dialogRef.afterClosed().subscribe((result) => { });
    }

    openDialogIngreso(index): void {
        const dialogRef = this.dialog.open(ModalIngresoComponent, {
            // width: '1080px',
            // maxHeight: '550px',
            data: {
                codigoNegocio: index,
                NombreCliente: `${this.info_cliente.primerNombre} ${this.info_cliente.segundoNombre} ${this.info_cliente.primerApellido} ${this.info_cliente.segundoApellido}`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => { });
    }

    mostrar_mensaje(titulo, mensaje) {
        if (mensaje == undefined) {
            return '';
        }
        let first = mensaje.substr(0, 1).toUpperCase();
        mensaje = first + mensaje.substr(1);
        Swal.fire(titulo, mensaje);
    }

    buscar_url(codigo) {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando plan de pago',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        this._carteraService.getPlanPago(codigo).subscribe((respuesta: any) => {
            Swal.close();
            if (respuesta.data) {
                // respuesta.data="http://prometheus.fintra.co:8094/fintra/exportar/migracion/119236/f_plan_de_pagos.pdf";
                window.open(
                    respuesta.data,
                    'Plan de pago',
                    'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=300,height=200,left = 390,top = 50'
                );
            } else {
                Swal.fire(
                    '¡Advertencia!',
                    'Este crédito no tiene plan de pago',
                    'error'
                );
            }
        });
    }

    busacar_url2(url) {
        window.open(
            url,
            'Plan de pago',
            'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=300,height=200,left = 390,top = 50'
        );
    }

    abrirPQRS() {
        let url = `pqr/creacion/${this.info_cliente.identificacion}`;
        this.router.navigateByUrl(url);
    }

    // CERTIFICACIONES
    private createFormulario(): void {
        const fecha = new DatePipe('en-US');
        this.formCertificados = this.fb.group({
            negocio: ['', Validators.required],
            propietario: ['', Validators.required],
            tipoCertificado: ['', Validators.required],
            fechaMaxima: '',
            tratoCliente: ['', Validators.required],
        });
    }

    dialogDeuda() {
        let { primerNombre, segundoNombre, primerApellido, segundoApellido } =
            this.info_cliente;
        const dialogRef = this.dialog.open(CertificadorDeudaComponent, {
            width: '90%',
            data: {
                documento: this.formCertificados.controls.negocio.value,
                fecha: this.formCertificados.controls.fechaMaxima.value,
                cliente: {
                    primerNombre,
                    segundoNombre,
                    primerApellido,
                    segundoApellido,
                },
            },
        });

        dialogRef.afterClosed().subscribe((resp) => {
            this.limpiarCertificaciones();
            this.descargar();
        });
    }

    limpiarCertificaciones() { }

    fechaValida(): void {
        const anioActual = moment(new Date(), 'yyyy-MM-dd');
        this.fechaMinima = anioActual;
    }

    historialCertificados(certificado) {
        // let url = `/cargar-historial-certificados/${certificado}`;
        // this._pqrService.getListados(url).subscribe((resp) => {
        //     this.historialCertificado = resp;
        //     console.log(this.historialCertificado);
        // });
    }


    generarCertificado() {
        if (this.formCertificados.controls.tipoCertificado.value == 2) {
            this.dialogDeuda();
        } else {
            this.descargar();
        }
    }

    descargar() {
        let url = `/generar-certificado-info`;
        let data = {
            "negocio": this.formCertificados.controls.negocio.value,
            "cedula": this.info_cliente.identificacion,
            "tipoCertificado": Number(this.formCertificados.controls.tipoCertificado.value),
            "tipoCliente": Number(this.formCertificados.controls.propietario.value),
            "titulo": Number(this.formCertificados.controls.tratoCliente.value),
            "fecha": this.formCertificados.controls.tipoCertificado.value == 2 ? this.formCertificados.controls.fechaMaxima.value : '',
            "valor": 0
        }
        this._pqrService.generarCertificados(url, data).subscribe((resp) => {
            const downloadLink = document.createElement('a');
            document.body.appendChild(downloadLink);
            downloadLink.href = 'data:application/pdf;base64,' + resp.data.base64;
            downloadLink.target = '_self';
            switch (this.formCertificados.controls.tipoCertificado.value) {
                case "1":
                    downloadLink.download = 'Certificado al día.pdf';
                    break;
                case "2":
                    downloadLink.download = 'Certificado de deuda.pdf';
                    break;
                case "3":
                    downloadLink.download = 'Certificado de paz y salvo.pdf';
                    break;
                case "4":
                    downloadLink.download = 'Certificado de vínculo comercial.pdf';
                    break;
            }

            downloadLink.click();
        });
    }
}
