import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDecisionComponent } from '../form-decision/form-decision.component';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'app-resumen',
    templateUrl: './resumen.component.html',
    styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
    public animacionVer: boolean = true;
    public datos: any = [];
    public dataResumenTrazabilidad: any = [];
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    dataPolicitasAdmin: any = {};
    datos2: any[];
    verComentarios: boolean = false;
    resumenCuentasMora: any[] = [];
    formaterMoneda = Intl.NumberFormat('es-co', { style: 'currency', currency: 'COP' })

    constructor(
        private _fabricaCreditoService: FabricaCreditoService,
        private route: ActivatedRoute,
        private router: Router,
        private _dialog: MatDialog,
    ) {
        this.getResumen();
    }

    ngOnInit(): void {
        // this.openModalNegocio()
    }

    /**
   * @description: Obtiene los datos del resumen
   */
    private getResumen(): void {

        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        let data = {
            "numeroSolicitud": this.numeroSolicitud,
            "identificacion": this.identificacion
        }
        this._fabricaCreditoService.getResumenCredito(data).pipe(

        ).subscribe((res) => {
            if (res.status === 200) {
                this.getDatos(res.data);
                Swal.close();
            } else {
                Swal.close();
                this.datos = []
            }
        });
    }

    private getDatos(data): void {

        //general

        let DatosCredito = [], DatosCredito2 = [];
        switch (data.resumenGeneral.unidadNegocio) {
            case 1:
                DatosCredito.push(
                    {
                        titulo: "Información del cliente:",
                        tipo: "campos",
                        icono: "feather:user",
                        color: "text-blue-600",
                        descripcion: "Datos específicos del cliente:",
                        campos: [
                            {
                                icono: "heroicons_outline:user-circle",
                                color: "bg-blue-100 text-blue-800",
                                valor2: this.capitalizeText(data.resumenGeneral.nombreCompleto),
                                valor: "<span class='text-sm font-medium text-secondary'>" + data.resumenCredito.tipoDocumento + '</span>: ' + data.resumenCredito.identificacion,
                                valor3: "<span class='text-sm font-medium text-secondary'>Email</span>: " + this.capitalize(data.resumenCredito.email),
                                valor4: "<span class='text-sm font-medium text-secondary'> Edad: </span>" + data.resumenGeneral.edad + ' Años',
                            },
                            {
                                icono: "heroicons_outline:home",
                                color: "bg-orange-100 text-orange-800",
                                valor2: "<span class='text-sm font-medium text-secondary'> Departamento: </span>" + this.capitalize(data.resumenGeneral.descripcionDepartamento),
                                valor: "<span class='text-sm font-medium text-secondary'> Municipio: </span>" + this.capitalize(data.resumenGeneral.descripcionCiudad),
                                valor3: "<span class='text-sm font-medium text-secondary'> Tipo vivienda: </span>" + this.capitalize(data.resumenGeneral.tipoVivienda),
                            },
                            {
                                icono: "heroicons_outline:currency-dollar",
                                color: "bg-yellow-100 text-yellow-800",
                                valor: "<span class='text-sm font-medium text-secondary'> Tipo de cliente: </span>" + this.capitalize(data.resumenGeneral.tipoSolicitante),
                                valor3: "<span class='text-sm font-medium text-secondary'> Tipo de crédito: </span>" + this.capitalize(data.resumenGeneral.tipoCreditoMicro),
                                valor2: "<span class='text-sm font-medium text-secondary'> Personas a cargo:</span> " + data.resumenGeneral.numeroPersonasACargo,

                            },
                            {
                                icono: "mat_outline:location_on",
                                color: "bg-purple-100 text-purple-800",
                                valor: "<span class='text-sm font-medium text-secondary'> Tercero: </span>" + this.capitalize(data.resumenGeneral.tipoDeudorMicro),
                                valor3: "<span class='text-sm font-medium text-secondary'> Segmento: </span>" + this.capitalize(data.resumenGeneral.segmento),
                                valor2: "<span class='text-sm font-medium text-secondary'> Agenda: </span>" + this.capitalize(data.resumenGeneral.agencia)
                            },
                            {
                                icono: "heroicons_outline:currency-dollar",
                                color: "bg-green-100 text-green-800",
                                valor2: "<span class='text-sm font-medium text-secondary'> Monto: </span>" + this.formaterMoneda.format(data.resumenGeneral.valorSolicitado),
                                valor: "<span class='text-sm font-medium text-secondary'> Plazo: </span>" + data.resumenGeneral.plazo + " Meses",
                                valor3: "<span class='text-sm font-medium text-secondary'> Tasa: </span>" + data.resumenGeneral.tasa
                            }
                        ]
                    },
                )
                break
            case 22:
                DatosCredito.push(
                    {
                        titulo: "Información del cliente:",
                        tipo: "campos",
                        icono: "feather:user",
                        color: "text-blue-600",
                        descripcion: "Datos específicos del cliente:",
                        campos: [
                            {
                                icono: "heroicons_outline:user-circle",
                                color: "bg-blue-100 text-blue-800",
                                label: "Cliente:",
                                valor: data.resumenCredito.nombreCompleto.toLowerCase(),
                                valor2: data.resumenCredito.tipoDocumento + '-' + data.resumenCredito.identificacion
                            },
                            {
                                icono: "feather:dollar-sign",
                                color: "bg-yellow-100 text-yellow-800",
                                label: "Crédito: " + data.resumenGeneral.tipoCredito,
                                valor: "Destino: " + data.resumenGeneral.descripcionDestinoCredito + "",

                            },
                            {
                                icono: "feather:dollar-sign",
                                color: "bg-green-100 text-green-800",
                                valor: "$" + data.resumenCredito.cupoTotal,
                                valor2: "Plazo: " + data.resumenCredito.plazo + " meses",
                                valor3: "Tasa: " + data.resumenCredito.tasa + "%"
                            },
                            {
                                icono: "heroicons_outline:light-bulb",
                                color: "bg-pink-100 text-pink-800",
                                label: "Condiciones: ",
                                valor: "Renovación: " + data.resumenCredito.renovacion,
                                valor2: "Segmento: " + data.resumenCredito.segmento
                            },
                            {
                                icono: "mat_outline:location_on",
                                color: "bg-purple-100 text-purple-800",
                                label: "Ubicación: ",
                                valor: data.resumenCredito.departamentoVivienda.toLowerCase() + ", " + data.resumenCredito.ciudadVivienda.toLowerCase()
                            }
                        ]
                    },
                )
                break;
            case 30:
                DatosCredito.push(
                    {
                        titulo: "Información del cliente:",
                        tipo: "campos",
                        icono: "feather:user",
                        color: "text-blue-600",
                        descripcion: "Datos específicos del cliente:",
                        campos: [
                            {
                                icono: "heroicons_outline:user-circle",
                                color: "bg-blue-100 text-blue-800",
                                label: "Cliente:",
                                valor: data.resumenCredito.nombreCompleto.toLowerCase(),
                                valor2: data.resumenCredito.tipoDocumento + '-' + data.resumenCredito.identificacion
                            },
                            {
                                icono: "feather:dollar-sign",
                                color: "bg-yellow-100 text-yellow-800",
                                valor: "<span class='text-sm font-medium text-secondary'>Tipo crédito: </span> " + data.resumenGeneral.TipoCreditoConsumo,
                                valor2: "<span class='text-sm font-medium text-secondary'>Tipo cliente: </span> " + data.resumenGeneral.tipoCliente,
                                valor3: "<span class='text-sm font-medium text-secondary'>Tarjeta de propiedad: </span> " + (data.resumenGeneral.tarjetaPropiedad == 'S' ? 'Si' : 'No'),
                            },
                            {
                                icono: "feather:dollar-sign",
                                color: "bg-green-100 text-green-800",
                                valor: "$" + data.resumenCredito.cupoTotal,
                                valor2: "Plazo: " + data.resumenCredito.plazo + " meses",
                                valor3: "Tasa: " + data.resumenCredito.tasa + "%"
                            },
                            {
                                icono: "heroicons_outline:light-bulb",
                                color: "bg-pink-100 text-pink-800",
                                label: "Condiciones: ",
                                valor: "Renovación: " + data.resumenCredito.renovacion,
                                valor2: "Segmento: " + data.resumenCredito.segmento
                            },
                            {
                                icono: "mat_outline:location_on",
                                color: "bg-purple-100 text-purple-800",
                                label: "Ubicación: ",
                                valor: data.resumenCredito.departamentoVivienda.toLowerCase() + ", " + data.resumenCredito.ciudadVivienda.toLowerCase()
                            }
                        ]
                    },
                )
                break;
        }


        // resumenCredito
        switch (data.resumenGeneral.unidadNegocio) {
            case 1:
                DatosCredito.push(
                    {
                        titulo: "Información del negocio",
                        tipo: "campos",
                        icono: "heroicons_outline:briefcase",
                        color: "text-gray-400",
                        descripcion: "Actividad económica del titular",
                        campos: [
                            {
                                icono: "heroicons_outline:briefcase",
                                color: "bg-blue-100 text-blue-800",
                                valor2: "<span class='text-sm font-medium text-secondary'>Ocupación: </span> " + this.capitalize(data.resumenCredito.descripcionOcupacion),
                                valor: "<span class='text-sm font-medium text-secondary'>Actividad económica: </span>" + this.capitalize(data.resumenCredito.descripcionActividadEconomica),
                                valor3: "<span class='text-sm font-medium text-secondary'>Actividad especifica: </span>" + this.capitalize(data.resumenCredito.actividadEspecifica)
                            },
                            {
                                icono: "heroicons_outline:library",
                                color: "bg-green-100 text-green-800",
                                valor: "<span class='text-sm font-medium text-secondary'>Tipo ubicación: </span>" + this.capitalize(data.resumenCredito.tipoUbicacionNegocio),
                                valor2: "<span class='text-sm font-medium text-secondary'>Tipo local: </span>" + this.capitalize(data.resumenCredito.tipoLocalNegocio),

                            },

                            {
                                icono: "heroicons_outline:presentation-chart-line",
                                color: "bg-pink-100 text-pink-800",
                                valor: "<span class='text-sm font-medium text-secondary'>Destino crédito: </span>" + data.resumenGeneral.destinoCredito,
                                valor2: "<span class='text-sm font-medium text-secondary'>Valor ventas: </span>" + this.formaterMoneda.format(data.resumenCredito.ventasMensuales),
                                valor3: "<span class='text-sm font-medium text-secondary'>Cuota máx a pagar:: </span>" + data.resumenCredito.valorCuotasCredito,
                            },
                            {
                                icono: "heroicons_outline:office-building",
                                color: "bg-green-100 text-green-800",
                                valor3: "<span class='text-sm font-medium text-secondary'>N° empleados: </span>" + data.resumenCredito.numeroEmpleados,
                                valor4: "<span class='text-sm font-medium text-secondary'>Antiguedad negocio: </span>" + data.resumenCredito.antiguedadNegocio + " Meses",

                            },
                        ]
                    },
                )

                // codeudor
                if (data.resumenCodeudor) {
                    DatosCredito.push(
                        {
                            titulo: "Información del codeudor",
                            tipo: "campos",
                            icono: "feather:user",
                            color: "text-blue-400",
                            descripcion: "Actividad económica del titular",
                            campos: [
                                {
                                    icono: "heroicons_outline:user-circle",
                                    color: "bg-blue-100 text-blue-800",
                                    valor2: data.resumenCodeudor.nombreCompleto,
                                    valor: "<span class='text-sm font-medium text-secondary'>" + data.resumenCodeudor.tipoDocumento + " </span> " + data.resumenCodeudor.identificacion,
                                    valor3: "<span class='text-sm font-medium text-secondary'>Ocupación: </span>" + data.resumenCodeudor.descripcionOcupacion
                                },
                                {
                                    icono: "heroicons_outline:currency-dollar",
                                    color: "bg-yellow-100 text-yellow-800",
                                    valor: "<span class='text-sm font-medium text-secondary'>Actividad económica: </span>" + data.resumenCodeudor.descripcionActividadEconomica,
                                    valor2: "<span class='text-sm font-medium text-secondary'>Actividad especifica: </span>" + data.resumenCodeudor.actividadEspecifica,
                                    valor3: "<span class='text-sm font-medium text-secondary'>Salario: </span>" + this.formaterMoneda.format(data.resumenCodeudor.salarioBasico),
                                },
                            ]
                        },
                    )
                }



                // // datos indicadores
                // DatosCredito.push(
                //     {
                //         titulo: "Indicadores",
                //         tipo: "campos",
                //         icono: "heroicons_outline:briefcase",
                //         color: "text-gray-400",
                //         descripcion: "Actividad económica del titular",
                //         campos: [
                //             {
                //                 icono: "heroicons_outline:user-circle",
                //                 color: "bg-blue-100 text-blue-800",
                //                 valor2: data.resumenCodeudor.nombreCompleto,
                //                 valor: "<span class='text-sm font-medium text-secondary'>" + data.resumenCodeudor.tipoDocumento + " : </span> " + data.resumenCodeudor.identificacion,
                //                 valor3: "<span class='text-sm font-medium text-secondary'>Ocupación: </span>" + data.resumenCodeudor.ocupacion
                //             },
                //             {
                //                 icono: "heroicons_outline:currency-dollar",
                //                 color: "bg-yellow-100 text-yellow-800",
                //                 valor: "<span class='text-sm font-medium text-secondary'>Actividad económica: </span>" + data.resumenCodeudor.actividadEconomica,
                //                 valor2: "<span class='text-sm font-medium text-secondary'>Actividad especifica: </span>" + data.resumenCredito.actividadEspecifica,
                //                 valor3: "<span class='text-sm font-medium text-secondary'>Salario: </span>" + this.formaterMoneda.format(data.resumenCredito.salarioBasico),
                //             },
                //         ]
                //     },
                // )
                break

            case 32:
                DatosCredito.push(
                    {
                        titulo: "Información del negocio",
                        tipo: "campos",
                        icono: "heroicons_outline:briefcase",
                        color: "text-gray-400",
                        descripcion: "Actividad económica del titular",
                        campos: [
                            {
                                icono: "heroicons_outline:briefcase",
                                color: "bg-blue-100 text-blue-800",
                                label: "",
                                valor: "<span class='text-sm font-medium text-secondary'>Actividad económica: </span>" + data.resumenCredito.actividadEconomica.toLowerCase(),
                                valor2: "<span class='text-sm font-medium text-secondary'>Ocupación: </span> " + data.resumenCredito.ocupacion.toLowerCase(),
                                valor3: "<span class='text-sm font-medium text-secondary'>Actividad especifica: </span>" + data.resumenCredito.actividadEspecifica.toLowerCase()
                            },
                            {
                                icono: "heroicons_outline:library",
                                color: "bg-green-100 text-green-800",
                                label: "Nombre del negocio:",
                                valor: data.resumenCredito.nombreNegocio
                            },

                            {
                                icono: "heroicons_outline:document-text",
                                color: "bg-pink-100 text-pink-800",
                                label: "Tiene cámara del comercio:",
                                valor: data.resumenCredito.camaraNegocio == 'S' ? 'Si Tiene' : 'No Tiene'
                            },
                            {
                                icono: "mat_outline:location_on",
                                color: "bg-purple-100 text-purple-800",
                                label: "Ubicación del negocio:",
                                valor: data.resumenCredito.departamentoNegocio + ", " + data.resumenCredito.ciudadNegocio.toLowerCase()
                            }
                        ]
                    },
                )
                break;
            case 30:
                if (data.resumenCredito.ocupacion.toLowerCase() == 'Epldo') {
                    DatosCredito.push(
                        {
                            titulo: "Información laboral",
                            tipo: "campos",
                            icono: "heroicons_outline:briefcase",
                            color: "text-gray-400",
                            descripcion: "Pagaduria",
                            campos: [
                                {
                                    icono: "heroicons_outline:briefcase",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Nombre de la empresa",
                                    // valor: "<span class='text-sm font-medium text-secondary'>Pagaduria </span> " ,
                                    valor: data.resumenCredito.nombrePagaduria.toUpperCase(),
                                    // valor3: "<span class='text-sm font-medium text-secondary'>Tipo de contrato: </span>" + data.resumenCredito.tipoContrato.toLowerCase()
                                },
                                {
                                    icono: "heroicons_outline:light-bulb",
                                    color: "bg-green-100 text-green-800",
                                    label: "Cargo",
                                    valor: data.resumenCredito.cargo.toLowerCase(),

                                },

                                {
                                    icono: "heroicons_outline:document-text",
                                    color: "bg-purple-100 text-purple-800",
                                    label: "Tipo de contrato",
                                    valor: data.resumenCredito.descripcionTipoContrato.toLowerCase()
                                },
                                {
                                    icono: "heroicons_outline:calendar",
                                    color: "bg-pink-100 text-pink-800",
                                    label: "Fechas de contrato",
                                    valor2: "<span class='text-sm font-medium text-secondary'>Fecha de ingreso: </span>" + data.resumenCredito.fechaVinculacion,
                                },
                                {
                                    icono: "feather:dollar-sign",
                                    color: "bg-yellow-100 text-yellow-800",
                                    label: "Valor de ingreso al mes",
                                    valor: this.separatos(data.resumenCredito.salarioBasico)
                                },
                            ]
                        },
                    )
                } else {
                    DatosCredito.push(
                        {
                            titulo: "Información del negocio",
                            tipo: "campos",
                            icono: "heroicons_outline:briefcase",
                            color: "text-gray-400",
                            descripcion: "Actividad económica del titular",
                            campos: [
                                {
                                    icono: "heroicons_outline:briefcase",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "",
                                    valor: "<span class='text-sm font-medium text-secondary'>Ocupación: </span> " + data.resumenCredito.ocupacion.toLowerCase(),
                                    valor2: "<span class='text-sm font-medium text-secondary'>Actividad económica: </span>" + data.resumenCredito.actividadEconomica.toLowerCase(),
                                    valor3: "<span class='text-sm font-medium text-secondary'>Actividad especifica: </span>" + data.resumenCredito.actividadEspecifica.toLowerCase()
                                },
                                {
                                    icono: "heroicons_outline:phone",
                                    color: "bg-purple-100 text-purple-800",
                                    label: "Teléfono del negocio:",
                                    valor: data.resumenCredito.telefonoNegocio
                                },
                                {
                                    icono: "mat_outline:access_time",
                                    color: "bg-green-100 text-green-800",
                                    label: "Antigüedad del negocio:",
                                    valor: data.resumenCredito.antiguedadNegocio
                                },
                                {
                                    icono: "mat_outline:location_on",
                                    color: "bg-purple-100 text-purple-800",
                                    label: "Ubicación del negocio:",
                                    valor: data.resumenCredito.departamentoNegocio + ", " + data.resumenCredito.ciudadNegocio.toLowerCase()
                                },
                                {
                                    icono: "feather:dollar-sign",
                                    color: "bg-yellow-100 text-yellow-800",
                                    label: "Valor de ingreso al mes",
                                    valor: this.separatos(data.resumenCredito.salarioBasico)
                                },
                            ]
                        },
                    )
                }

                break;
            case 22:
                DatosCredito.push(
                    {
                        titulo: "Información laboral",
                        tipo: "campos",
                        icono: "heroicons_outline:briefcase",
                        color: "text-gray-400",
                        descripcion: "Pagaduria",
                        campos: [
                            {
                                icono: "heroicons_outline:briefcase",
                                color: "bg-blue-100 text-blue-800",
                                label: "Pagaduria",
                                // valor: "<span class='text-sm font-medium text-secondary'>Pagaduria </span> " ,
                                valor: data.resumenCredito.nombrePagaduria.toUpperCase(),
                                // valor3: "<span class='text-sm font-medium text-secondary'>Tipo de contrato: </span>" + data.resumenCredito.tipoContrato.toLowerCase()
                            },
                            {
                                icono: "heroicons_outline:light-bulb",
                                color: "bg-green-100 text-green-800",
                                label: "Cargo",
                                valor: data.resumenCredito.cargo.toLowerCase(),

                            },

                            {
                                icono: "heroicons_outline:document-text",
                                color: "bg-purple-100 text-purple-800",
                                label: "Tipo de contrato",
                                valor: data.resumenCredito.descripcionTipoContrato.toLowerCase()
                            },
                            {
                                icono: "heroicons_outline:calendar",
                                color: "bg-pink-100 text-pink-800",
                                label: "Fechas de contrato",
                                valor2: "<span class='text-sm font-medium text-secondary'>Vinculación: </span>" + data.resumenCredito.fechaVinculacion,
                                valor3: "<span class='text-sm font-medium text-secondary'>Finalización: </span>" + data.resumenCredito.fechaFinalizacionContrato
                            },
                            {
                                icono: "feather:dollar-sign",
                                color: "bg-yellow-100 text-yellow-800",
                                label: "Salario",
                                valor: this.separatos(data.resumenCredito.salarioBasico)
                            },
                        ]
                    },
                )
                break;
            default:
                break;
        }

        if (data.resumenGeneral.unidadNegocio !== 1) {
            DatosCredito2.push(
                {
                    titulo: "Modelo + HDC",
                    tipo: "campos",
                    icono: "heroicons_outline:exclamation",
                    color: "text-blue-400",
                    descripcion: "Información recopilada de la consulta de historia de crédito del cliente",
                    campos: [
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Cupo inicial",
                            valor: "$" + data.resumenHdc.cupoInicial
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Saldo obligaciones",
                            valor: "$" + data.resumenHdc.saldoObligaciones
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Cuotas",
                            valor: "$" + data.resumenHdc.cuota
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Máxima mora actual",
                            valor: data.resumenHdc.maximaMoraActual
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Contador embargos",
                            valor: data.resumenHdc.contadorEmbargos
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Sumatoria embargos",
                            valor: "$" + this.separatos(data.resumenHdc.sumatoriaEmbargos)
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Contador gestiones",
                            valor: data.resumenHdc.contadorGestiones
                        }
                    ]
                },
            )
        } else {
            DatosCredito2.push(
                {
                    titulo: "Modelo + HDC",
                    tipo: "campos",
                    icono: "heroicons_outline:exclamation",
                    color: "text-blue-400",
                    descripcion: "Información recopilada de la consulta de historia de crédito del cliente",
                    campos: [
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Mora máx actual",
                            valor: data.resumenHdc.maximaMoraActual
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Mayor calificación",
                            valor: data.resumenHdc.calificacion
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Saldo de las obligaciones Micro",
                            valor: "$" + data.resumenHdc.sumatoriaTotalCrm
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Cupo de las obligaciones Micro",
                            valor: "$" + data.resumenHdc.sumatoriaCupoCrm
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Contador embargos",
                            valor: data.resumenHdc.contadorEmbargos
                        },
                        {
                            icono: "heroicons_outline:academic-cap",
                            clase: "bg-blue-100",
                            color: "bg-blue-100 text-blue-800",
                            label: "Saldo en mora",
                            valor: "$" + this.separatos(data.resumenHdc.maximaMoraActual)
                        },
                    ]
                },
            )
        }

        switch (data.resumenGeneral.unidadNegocio) {
            case 32:
                DatosCredito2.push(
                    {
                        titulo: "Indicadores",
                        tipo: "campos",
                        icono: "attach_money",
                        color: "text-purple-400",
                        descripcion: "Resultado de indicadores financieros y de análisis",
                        campos: [
                            {
                                icono: "heroicons_outline:academic-cap",
                                clase: "bg-purple-100",
                                color: "bg-blue-100 text-blue-800",
                                label: "Score",
                                valor: data.resumenIndicadores.score
                            },
                            {
                                icono: "heroicons_outline:academic-cap",
                                clase: "bg-purple-100",
                                color: "bg-blue-100 text-blue-800",
                                label: "Razón corriente",
                                valor: "$" + this.separatos(data.resumenIndicadores.razonCorrienteUltracem)
                            },
                            {
                                icono: "heroicons_outline:academic-cap",
                                clase: "bg-purple-100",
                                color: "bg-blue-100 text-blue-800",
                                label: "Capital de Trabajo",
                                valor: "$" + this.separatos(data.resumenIndicadores.capitalTrabajoUltracem)
                            },
                            {
                                icono: "heroicons_outline:academic-cap",
                                clase: "bg-purple-100",
                                color: "bg-blue-100 text-blue-800",
                                label: "Endeudamiento",
                                valor: "$" + this.separatos(data.resumenIndicadores.capitalTrabajoUltracem)
                            },
                            {
                                icono: "heroicons_outline:academic-cap",
                                clase: "bg-purple-100",
                                color: "bg-blue-100 text-blue-800",
                                label: "Nivel de riesgo",
                                valor: data.resumenIndicadores.nivelRiesgoUltracem
                            }
                        ]
                    },
                )
                break;
            case 22:
                if (data.resumenIndicadores) {
                    DatosCredito2.push(
                        {
                            titulo: "Capacidad de pago y oferta ",
                            descripcion: "Información capacidad de pago y oferta",
                            tipo: "campos",
                            icono: "attach_money",
                            color: "text-purple-400",
                            campos: [
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Score HDC",
                                    valor: data.resumenIndicadores.score
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Disponible de cuota",
                                    valor: "$" + this.separatos(data.resumenIndicadores.disponibleCuota)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Valor cuota del crédito",
                                    valor: "$" + this.separatos(data.resumenIndicadores.valorCuota)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Total de obligaciones a comprar y recoger",
                                    valor: "$" + this.separatos(data.resumenIndicadores.sumaTotal)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Valor consultores ",
                                    valor: "$" + this.separatos(data.resumenIndicadores.sumaConsultores)
                                },
                            ]
                        },
                    )
                }

                break;
            case 30:
                if (data.resumenIndicadores) {
                    DatosCredito2.push(
                        {
                            titulo: "Capacidad de pago y oferta ",
                            descripcion: "Información capacidad de pago y oferta",
                            tipo: "campos",
                            icono: "attach_money",
                            color: "text-purple-400",
                            campos: [
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Score HDC",
                                    valor: data.resumenIndicadores.score
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Capital trabajo",
                                    valor: "$" + this.separatos(data.resumenIndicadores.capitalTrabajo)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Valor cuota mensual",
                                    valor: "$" + this.separatos(data.resumenIndicadores.valorCuota)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Valor cuota diaria",
                                    valor: "$" + this.separatos(data.resumenIndicadores.valorCuotaDiaria)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Capital trabajo",
                                    valor: "" + this.separatos(data.resumenIndicadores.capitalTrabajo)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Razón corriente",
                                    valor: "" + this.separatos(data.resumenIndicadores.razonCorriente)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Disponible diario descuento",
                                    valor: "$" + this.separatos(data.resumenIndicadores.disponibelDiarioDescuento)
                                },
                                {
                                    icono: "heroicons_outline:academic-cap",
                                    clase: "bg-purple-100",
                                    color: "bg-blue-100 text-blue-800",
                                    label: "Maximo a descontar",
                                    valor: "$" + this.separatos(data.resumenIndicadores.maximoADescontar)
                                },
                            ]
                        },
                    )
                }

                break;
            default:
                break;
        }

        this.datos = DatosCredito;
        this.datos2 = DatosCredito2;

        this.dataResumenTrazabilidad = data.resumenTrazabilidad;
        this.dataPolicitasAdmin = this.formatearPoliticasData(data.policitasAdmin);
        this.resumenCuentasMora = data.resumenCuentasMora ? data.resumenCuentasMora : [];

    }

    /**
       * @description: Organiza las politicas por tipo
       */
    public formatearPoliticasData(politicas: any): any {
        const data = {}
        politicas.forEach(politica => {
            if (!data[politica.tipo]) {
                data[politica.tipo] = []
            }
            data[politica.tipo].push(politica)
        })

        return data
    }

    /**
   * @description: Direcciona al componente comentarios
   */
    public onComentarios(): void {
        this.verComentarios = true;
    }

    /**
   * @description:
   */
    public onCerrar(event): void {
        this.verComentarios = event;

    }

    capitalize(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLocaleLowerCase();
    }

    capitalizeText(text: string) {
        text = text.toLowerCase()
        let chars = text.split(' ')

        chars = chars.map(char => {
            return this.capitalize(char)
        })

        return chars.join(' ')
    }

    separatos(numb) {
        let num = Math.trunc(numb)
        let str = num.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }

    /**
     * @description: Minimiza el componente comentarios
     */
    public onMinimiza(event): void {

        this.verComentarios = event;
    }

    public openModalNegocio(): void {
        const dialogRef = this._dialog.open(FormDecisionComponent, {
            width: '60%',
            data: {},
            disableClose: false
        });
        dialogRef.afterClosed().subscribe((res) => {
            this.router.navigate(['/credit-factory/agenda-decision']);
        })

    }

    // Order by descending property key
    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }

}
