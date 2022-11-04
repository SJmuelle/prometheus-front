import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgendaCompletacionService } from 'app/core/services/agenda-completacion.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';

import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { GridDocumentacionComponent } from '../../grid-documentacion/grid-documentacion.component';
import { FormDialogoChecklistComponent } from '../../form-dialogo-checklist/form-dialogo-checklist.component';
import { DirectionsComponent } from 'app/shared/modal/directions/directions.component';
import { FormularioCreditoPlexa } from 'app/core/interfaces/formulario-fabrica-credito.interface';
import { FormDialogDecisionComponent } from '../../form-dialog-decision/form-dialog-decision.component';

@Component({
    selector: 'app-form-gestion-fabrica-consumo',
    templateUrl: './form-gestion-fabrica-consumo.component.html',
    styleUrls: ['./form-gestion-fabrica-consumo.component.scss']
})
export class FormGestionFabricaConsumoComponent implements OnInit {
    public unSubscribe$: Subject<any> = new Subject<any>();
    public departamentos$: Observable<any>;
    public departamentosNacimiento$: Observable<any>;
    public departamentosExpedicion$: Observable<any>;
    public departamentosNegocio$: Observable<any>;
    public ciudades$: Observable<any>;
    public ciudadesNacimiento$: Observable<any>;
    public ciudadesNegocio$: Observable<any>;
    public barrios$: Observable<any>;
    public barriosNegocio$: Observable<any>;
    public tipoDocumentos$: Observable<any>;
    public generos$: Observable<any>;
    public tipoVivienda$: Observable<any>;
    public nivelEstudio$: Observable<any>;
    public viveNegocio$: Observable<any>;
    public declarante$: Observable<any>;
    public camaraComercio$: Observable<any>;
    public form: FormGroup;
    public subscription$: Subscription;
    public verComentarios: boolean = false;
    public verCentrales: boolean = false;
    public verDevoluciones: boolean = false;
    public minimizarComentarios: boolean = false;
    public minimizarDevoluciones: boolean = false;
    public minimizarCentrales: boolean = false;
    public esVerComentarios: boolean = false;
    public tipoDocumento: string = '';
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    public estado: string = '';
    public agenda_fabrica: string = '';
    public animacionVer: boolean = true;
    public dialog_a_mostrar: string = '';
    public tipoEstadoCivil$: Observable<any>;
    public tipoCredito$: Observable<any>;
    public tipoContrato$: Observable<any>;
    public tipoCuentaBancaria$: Observable<any>;
    public tipoPagaduria$: Observable<any>;
    public destinoCredito$: Observable<any>;
    public estrato$: Observable<any>;
    public ciudadesExpedicion$: Observable<any>;
    public pagaduria$: Observable<any>;
    public tipoServicio$: Observable<any>;
    public turnoVehiculo$: Observable<any>;
    public tipoCombustible$: Observable<any>;
    public listadoOcupaciones$: Observable<any>;
    public actividadEconomica$: Observable<any>;
    public entidadBancaria$: Observable<any>;
    public aplicaIngresos$: Observable<any>;
    public tipoVia$: Observable<any>;
    public tipoViaNegocio$: Observable<any>;
    public salarioBasico: number;
    public fabricaDatos;
    public unidadNegocio: any;
    constructor(
        private fabricaCreditoService: FabricaCreditoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        private genericaServices: GenericasService,
        private _dialog: MatDialog,
        public utility: UtilityService,
    ) {

        if (!this.numeroSolicitud) {
            return;
        } else {
            this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
        }
    }

    ngOnInit(): void {
        this.createFormulario();
        this.getDepartamentos();
        this.getDepartamentoNacimiento();
        this.getDepartamentoNegocio();
        this.getTiposDocumentos();
        this.getGeneros();
        this.getTiposVivienda();
        this.getNivelEstudio();
        this.getViveNegocio();
        this.getDeclarante();
        this.getCamaraComercio();
        this.getTiposEstadosCivil();
        this.getTipoCredito();
        this.getTipoContrato();
        this.getDestinoCredito();
        this.getEstrato();
        this.getDepartamentoExpedicion();
        this.getAplicaIngresos();
        this.getTipoCuentaBancaria();
        this.getEntidadBancaria();
        this.getPagaduria();
        this.getServicio();
        this.getTurnoVehiculo();
        this.getTipoCombustible();
        this.getSalarioBasico();
        this.getTipoOcupacion();
        // this.getActividadEconomica(this.form.value.ocupacion.toString());
        this.getTipoVia();
        this.gettipoViaNegocio();
        this.form.get('entidadBancaria')?.valueChanges.subscribe(id => { this.validacionEntidad(id) })
        this.form.get('ocupacion')?.valueChanges.subscribe(id => {this.getActividadEconomica(id); })
    }





    public openModalDirection(): void {
        const dialogRef = this._dialog.open(DirectionsComponent, {
            width: '60%',
            data: {
                departamento: '',
                municipio: '',
                barrio: '',
                direccion: '',
            },
            disableClose: false
        });

        dialogRef.afterClosed().subscribe((res) => {
            const dataModal: any = res;
            if (dataModal.departamento != undefined) {
                this.form.controls.codigoDepartamento.setValue(dataModal.departamento);
                this.form.controls.descripcionDepartamento.setValue(dataModal.departamentoNombre);
                this.form.controls.codigoCiudad.setValue(dataModal.municipio);
                this.form.controls.descripcionCiudad.setValue(dataModal.municipioNombre);
                this.form.controls.codigoBarrio.setValue((dataModal.codigoBarrio));
                this.form.controls.descripcionBarrio.setValue(dataModal.barrio);

                this.form.controls.direccionResidencial.setValue(
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
                        : ` ${dataModal.complemento}`));
            }
        });
    }

    public openModalNegocio(): void {
        const dialogRef = this._dialog.open(DirectionsComponent, {
            width: '60%',
            data: {
                departamento: '',
                municipio: '',
                barrio: '',
                direccion: '',
            },
            disableClose: false
        });

        dialogRef.afterClosed().subscribe((res) => {
            const dataModal: any = res;
            if (dataModal.departamento != undefined) {
                this.form.controls.codigoDepartamentoNegocio.setValue(dataModal.departamento);
                this.form.controls.descripcionDepartamentoNegocio.setValue(dataModal.departamentoNombre);
                this.form.controls.codigoCiudadNegocio.setValue(dataModal.municipio);
                this.form.controls.descripcionCiudadNegocio.setValue(dataModal.municipioNombre);
                this.form.controls.codigoBarrioNegocio.setValue((dataModal.codigoBarrio));
                this.form.controls.descripcionBarrioNegocio.setValue(dataModal.barrio);
                this.form.controls.direccionNegocio.setValue(
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
                        : ` ${dataModal.complemento}`));
            }
        });
    }



    /**
     * @description:
     */
    public onPostDatos(): void {

        const datos: FormularioCreditoPlexa = this.form.getRawValue();
        const {
            fechaNacimiento,
            fechaExpedicion,
            fechaVinculacion,
            fechaAntiguedadNegocio,
            unidadNegocio,
            convenio,
            antiguedadNegocio,
            barrioResidencia,
            annosTiempoResidencia,
            mesesTiempoResidencia,
            valorSolicitado,
            plazo,
            otrosIngresos,
            ingresos,
            activos,
            pasivos,
            ingresosDiarios,
            compraDia,
            tanqueoDia,
            costoTransaccion,
            ...data } = datos;

        //fechas
        const fechaNacimientoFormato = moment(fechaNacimiento).format('YYYY-MM-DD');
        const fechaExpedicionFormato = moment(this.form.value.fechaExpedicionDocumento).format('YYYY-MM-DD');
        const fechaVinculacionFormato = moment(fechaVinculacion).format('YYYY-MM-DD');
        const fechaAntiguedadNegocioFormato = moment(fechaAntiguedadNegocio).format('YYYY-MM-DD');
        // 

        // NUMEROS
        const unidadNegocioFormato = Number(this.unidadNegocio);
        const convenioFormato = Number(this.utility.enviarNumero(this.form.value.convenio.toString()));
        const antiguedadNegocioFormato = Number(this.utility.enviarNumero(this.form.value.antiguedadNegocio.toString()));
        const barrioResidenciaFormato = Number(this.utility.enviarNumero(this.form.value.codigoBarrio.toString()));
        const annosTiempoResidenciaFormato = Number(this.utility.enviarNumero(this.form.value.annosTiempoResidencia.toString()));
        const mesesTiempoResidenciaFormato = Number(this.utility.enviarNumero(this.form.value.mesesTiempoResidencia.toString()));
        const valorSolicitadoFormato = Number(this.utility.enviarNumero(this.form.value.valorSolicitado.toString()));
        const plazoFormato = Number(this.utility.enviarNumero(this.form.value.plazo.toString()));
        const otrosIngresosFormato = Number(this.utility.enviarNumero(this.form.value.otrosIngresos.toString()));
        const ingresosFormato = Number(this.utility.enviarNumero(this.form.value.ingresos.toString()));
        const activosFormato = Number(this.utility.enviarNumero(this.form.value.activos.toString()));
        const pasivosFormato = Number(this.utility.enviarNumero(this.form.value.pasivos.toString()));
        const ingresosDiariosFormato = Number(this.utility.enviarNumero(this.form.value.ingresosDiarios.toString()));
        const compraDiaFormato = Number(this.utility.enviarNumero(this.form.value.compraDia.toString()));
        const tanqueoDiaFormato = Number(this.utility.enviarNumero(this.form.value.tanqueoDia.toString()));
        const costoTransaccionFormato = Number(this.utility.enviarNumero(this.form.value.costoTransaccion.toString()));
        //







        // delete data.otrosIngresos;
        const datosFormularios: FormularioCreditoPlexa = {
            fechaNacimiento: fechaNacimientoFormato,
            fechaExpedicion: fechaExpedicionFormato,
            fechaVinculacion: fechaVinculacionFormato,
            fechaAntiguedadNegocio: fechaAntiguedadNegocioFormato,
            unidadNegocio: unidadNegocioFormato,
            convenio: convenioFormato,
            antiguedadNegocio: antiguedadNegocioFormato,
            barrioResidencia: barrioResidenciaFormato,
            annosTiempoResidencia: annosTiempoResidenciaFormato,
            mesesTiempoResidencia: mesesTiempoResidenciaFormato,
            valorSolicitado: valorSolicitadoFormato,
            plazo: plazoFormato,
            otrosIngresos: otrosIngresosFormato,
            ingresos: ingresosFormato,
            activos: activosFormato,
            pasivos: pasivosFormato,
            ingresosDiarios: ingresosDiariosFormato,
            compraDia: compraDiaFormato,
            tanqueoDia: tanqueoDiaFormato,
            costoTransaccion: costoTransaccionFormato,
            ...data
        };
        Swal.fire({
            title: 'Guardar información',
            text: '¿Está seguro de guardar información?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#a3a0a0',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.postFormularioFabrica(datosFormularios);
            }
        });
    }

    /**
     * @description: Obtiene la data para cargar al formulario
     */
    private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
        const datosSolicitud: any = {
            numeroSolicitud: numeroSolicitud,
            identificacion: identificacion
        };
        this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                Swal.close();
                this.form.patchValue(data);
                this.agenda_fabrica = data.agenda;
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data;
                if (data.codigoDepartamento) {
                    this.getCiudades(data.codigoDepartamento);
                }
                if (data.codigoDepartamentoNacimiento) {
                    this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
                }
                if (data.codigoDepartamentoNegocio) {
                    this.getCiudadesNegocio(data.codigoDepartamentoNegocio);
                }
                if (data.codigoDepartamentoExpedicion) {
                    this.getCiudadesExpedicion(data.codigoDepartamentoExpedicion);
                }
                if (data.codigoCiudad) {
                    this.getBarrios(data.codigoCiudad);
                }
                if (data.codigoCiudadNegocio) {
                    this.getBarriosNegocio(data.codigoCiudadNegocio);
                }
                if (data.comprasSemanales) {
                    this.form.controls['comprasSemanales'].setValue(this.utility.formatearNumero(String(this.form.value.comprasSemanales)));
                }
                if (data.otrosIngresos) {
                    this.form.controls['otrosIngresos'].setValue(this.utility.formatearNumero(String(this.form.value.otrosIngresos)));
                }
                if (data.ingresos) {
                    this.form.controls['ingresos'].setValue(this.utility.formatearNumero(String(this.form.value.ingresos)));
                }
                if (data.ventasMensuales) {
                    this.form.controls['ventasMensuales'].setValue(this.utility.formatearNumero(String(this.form.value.ventasMensuales)));
                }
                if (data.activos) {
                    this.form.controls['activos'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
                }
                if (data.pasivos) {
                    this.form.controls['pasivos'].setValue(this.utility.formatearNumero(String(this.form.value.pasivos)));
                }
                if (data.cupoTotal) {
                    this.form.controls['cupoTotal'].setValue(this.utility.formatearNumero(String(this.form.value.cupoTotal)));
                }
                if (data.cupoReservado) {
                    this.form.controls['cupoReservado'].setValue(this.utility.formatearNumero(String(this.form.value.cupoReservado)));
                }
                if (data.cupoDisponible) {
                    this.form.controls['cupoDisponible'].setValue(this.utility.formatearNumero(String(this.form.value.cupoDisponible)));
                }
                if (data.salarioBasico) {
                    this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.form.value.salarioBasico)));
                }
                if (data.descuentoNomina) {
                    this.form.controls['descuentoNomina'].setValue(this.utility.formatearNumero(String(this.form.value.descuentoNomina)));
                }
                if (data.valorSolicitado) {
                    this.form.controls['valorSolicitado'].setValue(this.utility.formatearNumero(String(this.form.value.valorSolicitado)));
                }
                if (data.valorSolicitado) {
                    this.form.controls['valorSolicitadoWeb'].setValue(this.utility.formatearNumero(String(this.form.value.valorSolicitadoWeb)));
                }
                if (data.annosTiempoResidencia) {
                    this.form.controls['annosTiempoResidencia'].setValue(this.utility.formatearNumero(String(this.form.value.annosTiempoResidencia)));
                }
                if (data.mesesTiempoResidencia) {
                    this.form.controls['mesesTiempoResidencia'].setValue(this.utility.formatearNumero(String(this.form.value.mesesTiempoResidencia)));
                }
                if (data.valorCuotaDiaria) {
                    this.form.controls['valorCuotaDiaria'].setValue(this.utility.formatearNumero(String(this.form.value.valorCuotaDiaria)));
                }
                if (data.valorCuota) {
                    this.form.controls['valorCuota'].setValue(this.utility.formatearNumero(String(this.form.value.valorCuota)));
                }
                // this.form.controls['aplicaEmbargo'].setValue(this.form.value.aplicaEmbargo=='N'?'No aplica':'Si aplica')
                // form.value.valorSolicitado
                if (data.comisionesHorasExtras) {
                    this.form.controls['comisionesHorasExtras'].setValue(this.utility.formatearNumero(String(this.form.value.comisionesHorasExtras)));
                }
                if (data.cupoDisponible) {
                    this.form.controls['cupoDisponible'].setValue(this.utility.formatearNumero(String(this.form.value.cupoDisponible)));
                }
                //envian en int y el select es string
                if (data.estrato) {
                    this.form.controls['estrato'].setValue(this.form.value.estrato.toString());
                }

                //envian en int y el select es string
                if (data.tipoContrato) {
                    this.form.controls['tipoContrato'].setValue(this.form.value.tipoContrato.toString());
                }
                //envian en int y el select es string
                if (data.tipoCuentaBancaria) {
                    this.form.controls['tipoCuentaBancaria'].setValue(this.form.value.tipoCuentaBancaria.toString());
                }
                //envian en int y el select es string
                if (data.entidadBancaria) {
                    this.form.controls['entidadBancaria'].setValue(this.form.value.entidadBancaria.toString());
                }
                //envian en int y el select es string
                if (data.pagaduria) {
                    this.form.controls['pagaduria'].setValue(this.form.value.pagaduria.toString());
                }
                if (data.listadoOcupaciones) {
                    this.form.controls['ocupacion'].setValue(this.form.value.ocupacion.toString());
                }
                if (data.tipoServicio) {
                    this.form.controls['tipoServicio'].setValue(this.form.value.tipoServicio.toString());
                }
                if (data.turnoVehiculo) {
                    this.form.controls['turnoVehiculo'].setValue(this.form.value.turnoVehiculo.toString());
                }
                if (data.tipoCombustible) {
                    this.form.controls['tipoCombustible'].setValue(this.form.value.tipoCombustible.toString());
                }
                if (data.actividadEconomica) {
                    this.form.controls['actividadEconomica'].setValue(this.form.value.actividadEconomica.toString());
                }
                if (data.compraDia) {
                    this.form.controls['compraDia'].setValue(this.form.value.compraDia.toString());
                }
                if (data.tanqueoDia) {
                    this.form.controls['tanqueoDia'].setValue(this.form.value.tanqueoDia.toString());
                }
                this.tipoDocumento = data.tipoDocumento;
                const datosDocumentos: any = {
                    numeroSolicitud: datosSolicitud.numeroSolicitud,
                    tipoDocumento: this.tipoDocumento
                };
                this.fabricaCreditoService.seleccionDatos.next({ data: datosDocumentos });
                this.estado = data.descripcionEstado;
            });
    }

    public seleccionDepartamento(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudades(codigo);
    }

    /**
     * @description: Departamento de nacimiento
     */
    public seleccionDepartamentoNacimiento(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesNacimiento(codigo);
    }

    /**
     * @description: Departamento de negocio
     */
    public seleccionDepartamentoNegocio(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesNegocio(codigo);
    }

    /**
     * @description: Departamento de expedicion
     */
    public seleccionDepartamentoExpedicion(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesExpedicion(codigo);
    }

    /**
     * @description: Selecciona el codigo para cargar el api barrios
     *
     */
    public seleccionCiudad(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getBarrios(codigo);
    }

    /**
     * @description: Selecciona el codigo para cargar el api barrios
     */
    public seleccionCiudadNegocio(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getBarriosNegocio(codigo);
    }

    /**
     * @description: Obtiene el listado de departamento
     */
    private getDepartamentos(): void {
        this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
    }

    /**
     * @description: Obtiene listado de departamento nacimiento
     */
    private getDepartamentoNacimiento(): void {
        this.departamentosNacimiento$ = this.departamentosCiudadesService.getDepartamentos();
    }

    /**
     * @description:
     */
    private getDepartamentoNegocio(): void {
        this.departamentosNegocio$ = this.departamentosCiudadesService.getDepartamentos();
    }
    /**
 * @description:
 */
    private getDepartamentoExpedicion(): void {
        this.departamentosExpedicion$ = this.departamentosCiudadesService.getDepartamentos();
    }

    /**
     * @description: Obtiene el listado de ciudades
     */
    private getCiudades(codigo: string): void {
        this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
        // this.form.controls.codigoBarrio.setValue("");
    }

    /**
     * @description: Obtiene listado de ciudades nacimiento
     */
    private getCiudadesNacimiento(codigo: string): void {
        this.ciudadesNacimiento$ = this.departamentosCiudadesService.getCiudades(codigo);
    }

    /**
     * @description: Obtiene listado de ciudades negocio
     */
    private getCiudadesNegocio(codigo: string): void {
        this.ciudadesNegocio$ = this.departamentosCiudadesService.getCiudades(codigo);
    }
    /**
 * @description: Obtiene listado de ciudades negocio
 */
    private getCiudadesExpedicion(codigo: string): void {
        this.ciudadesExpedicion$ = this.departamentosCiudadesService.getCiudades(codigo);
    }

    /**
     * @description: Obtiene el listado de barrios
     */
    private getBarrios(codigo: string): void {
        this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
    }

    /**
     * @description: Obtiene el listado de barrios del negocio
     */
    private getBarriosNegocio(codigo: string): void {
        this.barriosNegocio$ = this.departamentosCiudadesService.getBarrios(codigo);
    }

    /**
     * @description: Obtiene los tipos de documentos
     */
    private getTiposDocumentos(): void {
        this.tipoDocumentos$ = this.genericaServices.getTiposDocumentos();
    }

    /**
     * @description: Obtiene los generos
     */
    private getGeneros(): void {
        this.generos$ = this.genericaServices.getGeneros();
    }

    /**
     * @description: Obtiene los tipos de vivienda
     */
    private getTiposVivienda(): void {
        this.tipoVivienda$ = this.genericaServices.getTipoViviendas();
    }

    /**
   * @description: Obtiene los tipos de estados civiles
   */
    private getTiposEstadosCivil(): void {
        this.tipoEstadoCivil$ = this.genericaServices.getTipoEstadoCivil();
    }

    /**
     * @description: Obtiene los tipos de estados civiles
     */
    private getTipoCuentaBancaria(): void {
        this.tipoCuentaBancaria$ = this.genericaServices.getTipoCuentaBancaria();
    }
    /**
    * @description: Obtiene los tipos de estados civiles
    */
    private getTipoCredito(): void {
        this.tipoCredito$ = this.genericaServices.getTipoCredito();
    }
    /**
    * @description: Obtiene los tipos de estados civiles
    */
    private getDestinoCredito(): void {
        this.destinoCredito$ = this.genericaServices.getDestinoCredito();
    }
    /**
    * @description: Obtiene los tipos de estados civiles
    */
    private getEstrato(): void {
        this.estrato$ = this.genericaServices.getestrato();
    }
    /**
    * @description: Obtiene los tipos de estados civiles
    */
    private getPagaduria(): void {
        this.pagaduria$ = this.genericaServices.getPagadurias();
    }
    /**
* * @description: Obtiene los tipos de estados civiles
*/
    private getServicio(): void {
        this.tipoServicio$ = this.genericaServices.getTipoServicios();
    }
    /**
* * @description: Obtiene los tipos de estados civiles
*/
    private getTurnoVehiculo(): void {
        this.turnoVehiculo$ = this.genericaServices.getTurnoVehiculos();
    }
    /**
* * @description: Obtiene los tipos de estados civiles
*/
    private getTipoCombustible(): void {
        this.tipoCombustible$ = this.genericaServices.getTipoCombustibles();
    }
    /**
    * @description: Obtiene los tipos de estados civiles
    */
    private getTipoOcupacion(): void {
        this.listadoOcupaciones$ = this.genericaServices.getlistadoOcupaciones();
    }
    /**
    * @description: Obtiene los tipos de estados civiles
    */

    private getActividadEconomica(codigo: string): void {
        this.actividadEconomica$ = this.genericaServices.postActividadEconomica(codigo);
    }
    /**
    * @description: Obtiene los tipos de estados civiles
    */
    private getTipoContrato(): void {
        this.tipoContrato$ = this.genericaServices.getTipoContrato();
    }
    /**
* @description: Obtiene los tipos de estados civiles
*/
    private getEntidadBancaria(): void {
        this.entidadBancaria$ = this.genericaServices.getEntidadBancaria();
    }
    /**
* @description: Obtiene los tipos de estados civiles
*/
    private getAplicaIngresos(): void {
        this.aplicaIngresos$ = this.genericaServices.getAplicaIngresos();
    }



    /**
     * @description: Obtiene el nivel de estudio
     */
    private getNivelEstudio(): void {
        this.nivelEstudio$ = this.genericaServices.getNivelEstudio();
    }

    /**
     * @description: Obtiene listado de vive en negocio
     */
    private getViveNegocio(): void {
        this.viveNegocio$ = this.genericaServices.getViveNegocio();
    }

    /**
     * @description: Obtiene el listado de declarantes
     */
    private getDeclarante(): void {
        this.declarante$ = this.genericaServices.getDeclarante();
    }

    /**
     * @description:
     */
    private getCamaraComercio(): void {
        this.camaraComercio$ = this.genericaServices.getCamaraComercio();
    }

    /**
     * @description:
     */
    private getTipoVia(): void {
        this.tipoVia$ = this.genericaServices.getTipoVia();
    }
    /**
  * @description:
  */
    private gettipoViaNegocio(): void {
        this.tipoViaNegocio$ = this.genericaServices.getTipoVia();
    }


    /**
     * @description: Guardado de datos fabrica
     */
    private postFormularioFabrica(datos: FormularioCreditoPlexa): void {
        Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
        this.subscription$ = this.fabricaCreditoService.postDatosFabricaCredita(datos)
            .subscribe(() => {
                Swal.fire(
                    'Completado',
                    'Información guardada con éxito',
                    'success'
                );
                setTimeout(() => {
                    location.reload()
                }, 1000);
                //   this.router.navigate(['/credit-factory/agenda-completion']);
            }, (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    text: error.error.msg,
                });
            });
    }



    /**
     * @description :creando el formulario
     */
    private createFormulario(): void {
        this.form = this.fb.group({
            numeroSolicitud:[''],
            unidadNegocio:[''],
            tipo:[''],
            descripcionTipo:[''],
            emision:[''],
            origen:[''],
            descripcionOrigen:[''],
            fechaIngresoFabrica:[''],
            codigoEstado:[''],
            descripcionEstado:[''],
            codigoSubEstado:[''],
            descripcionSubestado:[''],
            cupoTotal:[''],
            cupoReservado:[''],
            cupoDisponible:[''],
            score:[''],
            descripcionScore:[''],
            nivelEndeudamiento:[''],
            tipoDocumento:[''],
            identificacion:[''],
            nombreCompleto:[''],
            primerNombre:[''],
            segundoNombre:[''],
            primerApellido:[''],
            segundoApellido:[''],
            telefono:[''],
            celular:[''],
            email:[''],
            genero:[''],
            descripcionGenero:[''],
            nacionalidad:[''],
            fechaNacimiento:[''],
            codigoDepartamentoNacimiento:[''],
            descripcionDepartamentoNacimiento:[''],
            codigoCiudadNacimiento:[''],
            descripcionCiudadNacimiento:[''],
            tipoVivienda:[''],
            descripcionTipoVivienda:[''],
            codigoDepartamento:[''],
            descripcionDepartamento:[''],
            codigoCiudad:[''],
            descripcionCiudad:[''],
            codigoBarrio:[''],
            descripcionBarrio:[''],
            direccionResidencial:[''],
            nivelEstudio:[''],
            descripcionNivelEstudio:[''],
            viveEnNegocio:[''],
            descripcionViveNegocio:[''],
            fechaMatricula:[''],
            comprasSemanales:[''],
            antiguedadComprasSemanales:[''],
            ventasMensuales:[''],
            activos:[''],
            pasivos:[''],
            declarante:[''],
            descripcionDeclarante:[''],
            codigoDepartamentoNegocio:[''],
            descripcionDepartamentoNegocio:[''],
            codigoCiudadNegocio:[''],
            descripcionCiudadNegocio:[''],
            codigoBarrioNegocio:[''],
            descripcionBarrioNegocio:[''],
            direccionNegocio:[''],
            telefonoNegocio:[''],
            antiguedadNegocio:[''],
            camaraComercio:[''],
            descripcionCamaraComercio:[''],
            nitNegocio:[''],
            nombreNegocio:[''],
            agenda:[''],
            nombreAgenda:[''],
            totalCheckList:[''],
            cantidadCheckList:[''],
            tipoCredito:[''],
            descripcionTipoCredito:[''],
            destinoCredito:[''],
            otroDestinoCredito:[''],
            valorSolicitado:[''],
            plazo:[''],
            estadoCivil:[''],
            fechaExpedicionDocumento:[''],
            codigoDepartamentoExpedicion:[''],
            nombreDepartamentoExpedicion:[''],
            codigoCiudadExpedicion:[''],
            nombreCiudadExpedicion:[''],
            cargo:[''],
            aplicaIngresos:[''],
            descripcionOtrosIngresos:[''],
            otrosIngresos:[''],
            ingresos:[''],
            tipoCuentaBancaria:[''],
            numeroCuentaBancaria:[''],
            entidadBancaria:[''],
            autorizacionBancaria:[''],
            pagaduria:[''],
            otraPagaduria:[''],
            tipoContrato:[''],
            fechaVinculacion:[''],
            fechaFinalizacionContrato:[''],
            salarioBasico:[''],
            descuentoNomina:[''],
            comisionesHorasExtras:[''],
            estrato:[''],
            contadorGestiones:[''],
            valorSolicitadoWeb:[''],
            aplicaEmbargo:[''],
            sanamientoFinanciero:[''],
            aplicaDetalleOferta:[''],
            aplicaCodeudor:[''],
            creditoTitularLineas:[''],
            creditoCodeudorLineas:[''],
            nombreConvenio:[''],
            convenio:[''],
            compraDia:[''],
            tanqueoDia:[''],
            valorCuota:[''],
            valorCuotaDiaria:[''],
            descripcionTipoConsumo:[''],
            nombreEmpresa:[''],
            actividadEconomica:[''],
            descripcionActividadEconomica:[''],
            actividadEspecifica:[''],
            direccionNegocioVia:[''],
            direccionNegocioPrincipal:[''],
            direccionNegocioNroVia:[''],
            direccionNegocioDistanciaVia:[''],
            direccionNegocioCompleto:[''],
            direccionTipoVia:[''],
            direccionViaPrincipal:[''],
            direccionNumeroVia:[''],
            direccionDistanciaVia:[''],
            direccionComplemento:[''],
            annosTiempoResidencia:[''],
            mesesTiempoResidencia:[''],
            tipoCliente:[''],
            descripcionTipoCliente:[''],
            tarjetaPropiedad:[''],
            tipoServicio:[''],
            descripcionTipoServicio:[''],
            numeroTarjetaCirculacion:[''],
            ocupacion:[''],
            marcaVehiculo:[''],
            lineaVehiculo:[''],
            modeloVehiculo:[''],
            numeroPlacaVehiculo:[''],
            turnoVehiculo:[''],
            diasTrabajados:[''],
            tipoCombustible:[''],
            descripcionTipoCombustible:[''],
            ingresosDiarios:[''],
            fechaAntiguedadNegocio:[''],
            celularNequi:[''],
            costoTransaccion:[''],
        });
    }






    /**
        * @description: Obtiene los tipos de estados civiles
     */
    private getSalarioBasico(): void {
        this.genericaServices.getSalarioBasico().subscribe(({ data }) => {
            this.salarioBasico = Number(data.salarioMinimo)
        })
    }




    /**
     * @description: Valida que el campo solo sea numeros
     */
    public soloNumero(field: string) {
        return this.form.controls[field].hasError('pattern');
    }
    public validacionEntidad(tipo: string) {
        this.entidadBancaria$.forEach(element => {
            for (const item of element.data) {
                if (item.codigo == tipo) {
                    this.form.controls['costoTransaccion'].setValue(this.utility.formatearNumero(String(item.costoTransaccion)));
                }
            }

        });

    }


    get primerNombre(): ValidatorFn {
        return this.form.controls.primerNombre.errors?.required ||
            (this.form.controls.primerNombre.dirty ||
                this.form.controls.primerNombre.touched);
    }
    get primerApellido(): ValidatorFn {
        return this.form.controls.primerApellido.errors?.required ||
            (this.form.controls.primerApellido.dirty ||
                this.form.controls.primerApellido.touched);
    }

    ngOnDestroy(): void {
        this.unSubscribe$.unsubscribe();
    }


}
