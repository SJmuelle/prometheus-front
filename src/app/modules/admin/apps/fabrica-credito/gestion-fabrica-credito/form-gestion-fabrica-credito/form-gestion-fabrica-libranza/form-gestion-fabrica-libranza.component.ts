import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgendaCompletacionService } from 'app/core/services/agenda-completacion.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';

import { Observable, Subject, Subscription } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
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
import { FormularioCreditoInterface } from 'app/core/interfaces/formulario-fabrica-credito.interface';
import { FormDialogDecisionComponent } from '../../form-dialog-decision/form-dialog-decision.component';
import { PermisosService } from 'app/core/services/permisos.service';

@Component({
    selector: 'app-form-gestion-fabrica-libranza',
    templateUrl: './form-gestion-fabrica-libranza.component.html',
    styleUrls: ['./form-gestion-fabrica-libranza.component.scss']
})
export class FormGestionFabricaLibranzaComponent implements OnInit, OnDestroy {
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
    public redeonlyForm: any;
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
    public entidadBancaria$: Observable<any>;
    public aplicaIngresos$: Observable<any>;
    public salarioBasico: number;
    public fabricaDatos;
    unidadNegocio: any;
    public permisoEditar:boolean=false;
    constructor(
        private agendaCompletacionService: AgendaCompletacionService,
        private fabricaCreditoService: FabricaCreditoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        private router: Router,
        private genericaServices: GenericasService,
        private _dialog: MatDialog,
        public utility: UtilityService,
        public _permisosService: PermisosService

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
        this.listenFormulario();
        this.getTiposEstadosCivil();
        this.getTipoCredito();
        this.getTipoContrato();
        this.getDestinoCredito();
        this.getEstrato();
        this.getDepartamentoExpedicion();
        this.getAplicaIngresos();
        this.getTipoCuentaBancaria();
        this.getEntidadBancaria();
        this.getPagaduria()
        this.getSalarioBasico()
        // this.form.get('fechaNacimiento')?.valueChanges.subscribe(id =>  this.validacion('FEN') )}

        this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()
        if(this.permisoEditar){
            this.form.disable();
        }
    }
    /**
     * @description:
     */
    public onCerrar(event): void {
        this.verComentarios = event;
        this.minimizarComentarios = event;
    }
    /**
     * @description: Minimiza el componente comentarios
     */
    public onMinimiza(event): void {
        this.minimizarComentarios = !event;
        this.verComentarios = event;
    }
    /**
 * @description:
 */
    public onCerrarCentrales(event): void {
        this.verCentrales = event;
        this.minimizarCentrales = event;
    }
    /**
     * @description: Minimiza el componente centrales
     */
    public onMinimizaCentrales(event): void {
        this.minimizarCentrales = !event;
        this.verCentrales = event;
    }
    /**
   * @description:Cierra el componente de devoluciones
   */
    public onCerrarDevolucion(event): void {
        this.verDevoluciones = event;
        this.minimizarDevoluciones = event;
    }
    /**
     * @description: Minimiza el componente Devoluciones
     */
    public onMinimizaDevolucion(event): void {
        this.minimizarDevoluciones = !event;
        this.verDevoluciones = event;
    }
    /**
     * @description: Abre el modal de listado de documentos
     */
    public onDialogo(): void {
        const dialogRef = this._dialog.open(GridDocumentacionComponent, {
            width: '80%',
            data: { numeroSolicitud: this.numeroSolicitud, tipoDocumento: this.tipoDocumento }
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
    /**
     * @description: Modal de decision
     */
    public onDialogoDecision(): void {
        // this.fabricaCreditoService.getCantidadDatos('data')
        //     .subscribe(({ data }) => {
        //         if (data) {

        //         }
        // });
        let dialogRef;
        switch (this.dialog_a_mostrar) {
            case 'CHECKLIST':
                dialogRef = this._dialog.open(FormDialogoChecklistComponent, {
                    minWidth: '60%',
                    maxHeight: '80%',
                    data: {
                        numeroSolicitud: this.numeroSolicitud, tipoDocumento: this.tipoDocumento,
                        agenda: this.agenda_fabrica,
                        unidadNegocio: this.unidadNegocio
                    },
                    disableClose: false,
                });
                dialogRef.afterClosed().toPromise().then(() => {
                    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
                });
                break;
            case 'SIGUIENTE':
                dialogRef = this._dialog.open(FormDialogDecisionComponent, {
                    minWidth: '50%',
                    minHeight: '50%',
                    // data: { numeroSolicitud: this.numeroSolicitud, etapa: 1 },
                    data: {
                        numeroSolicitud: this.numeroSolicitud,
                        etapa: 1,
                        idAgenda: this.agenda_fabrica,
                    },
                    disableClose: false,
                });
                dialogRef.afterClosed().toPromise().then(() => {
                    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
                });
                break;
            default:
                break;
        }


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
     * @description: Direcciona al componente comentarios
     */
    public onComentarios(): void {
        this.router.navigate(['/credit-factory/credit-management/commentaries', this.numeroSolicitud]);
    }

    /**
     * @description:
     */
    public validarCampos(valor1, valor2) {
        if (valor1 == valor2) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * @description:
     */
    public onPostDatos(): void {
        // if (this.form.valid) {

        // alert(this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico)));
        let salarioBasicoAnterior = this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico));
        let descuentoNominaAnterior = this.utility.formatearNumero(String(this.fabricaDatos.descuentoNomina));
        let comisionesHorasExtrasAnterior = this.utility.formatearNumero(String(this.fabricaDatos.comisionesHorasExtras));
        let otrosIngresosAnterior = this.utility.formatearNumero(String(this.fabricaDatos.otrosIngresos));
        let plazoAnterior = this.utility.formatearNumero(String(this.fabricaDatos.plazo));
        let montoAnterior = this.utility.formatearNumero(String(this.fabricaDatos.monto));
        if (
            this.validarCampos(this.form.value.salarioBasico, salarioBasicoAnterior)
            &&
            this.validarCampos(this.form.value.comisionesHorasExtras, comisionesHorasExtrasAnterior)
            &&
            this.validarCampos(this.form.value.descuentoNomina, descuentoNominaAnterior)
            &&
            this.validarCampos(this.form.value.otrosIngresos, otrosIngresosAnterior)
            &&
            this.validarCampos(this.form.value.plazo, plazoAnterior)
            &&
            this.validarCampos(this.form.value.monto, montoAnterior)
        ) {
            this.form.controls['modificado'].setValue('N')
        } else {
            this.form.controls['modificado'].setValue('S')
        }
        if (
            this.validarCampos(this.form.value.pagaduria, this.fabricaDatos.pagaduria)
            &&
            this.validarCampos(this.form.value.tipoContrato, this.fabricaDatos.tipoContrato)
            &&
            this.validarCampos(this.form.value.fechaVinculacion, this.fabricaDatos.fechaVinculacion)
            &&
            this.validarCampos(this.form.value.genero, this.fabricaDatos.genero)
            &&
            this.validarCampos(this.form.value.fechaNacimiento,  this.fabricaDatos.fechaNacimiento)
        ) {
            this.form.controls['modificadoPolitica'].setValue('N')
        } else {
            this.form.controls['modificadoPolitica'].setValue('S')
        }
        const datos: FormularioCreditoInterface = this.form.getRawValue();
        const { codigoBarrio, fechaNacimiento, otrosIngresos, ingresos, fechaVinculacion, plazo, fechaFinalizacionContrato, valorSolicitado, salarioBasico, fechaExpedicionDocumento, antiguedadComprasSemanales, score, cupoTotal, cupoReservado, cupoDisponible, nivelEndeudamiento, ...data } = datos;

        const fechaNacimientoFormato = moment(fechaNacimiento).format('YYYY-MM-DD');
        const fechaVinculacionFormato = moment(fechaVinculacion).format('YYYY-MM-DD');
        const fechaFinalizacionContratoFormato = moment(fechaFinalizacionContrato).format('YYYY-MM-DD');
        // const fechaMatriculaFormato = moment(fechaMatricula).format('YYYY-MM-DD');
        const fechaExpedicionDocumentoFormato = moment(fechaExpedicionDocumento).format('YYYY-MM-DD')
        const compraSemanal = Number(this.utility.enviarNumero(this.form.value.comprasSemanales));
        const ventasMensuales = Number(this.utility.enviarNumero(this.form.value.ventasMensuales));
        const scoreFormato = Number(this.form.value.score);
        const cupoTotalFormato = Number(this.utility.enviarNumero(this.form.value.cupoTotal));
        const salarioBasicoformato = Number(this.utility.enviarNumero(this.form.value.salarioBasico));
        const cupoReservadoFormato = Number(this.utility.enviarNumero(this.form.value.cupoReservado));
        const cupoDisponbileFormato = Number(this.utility.enviarNumero(this.form.value.cupoDisponible));
        const nivelEndeudamientoFormato = Number(this.form.value.nivelEndeudamiento);
        const activos = Number(this.utility.enviarNumero(this.form.value.activos));
        const valorSolicitadoFormato = Number(this.utility.enviarNumero(this.form.value.valorSolicitado));
        const comisionesHorasExtrasFormato = Number(this.utility.enviarNumero(this.form.value.comisionesHorasExtras));
        const descuentoNominaFormato = Number(this.utility.enviarNumero(this.form.value.descuentoNomina));
        const otrosIngresosFormato = Number(this.utility.enviarNumero(this.form.value.otrosIngresos));
        const ingresosFormato = Number(this.utility.enviarNumero(this.form.value.ingresos));
        const plazoFormato = Number(this.form.value.plazo);
        //
        const codigoBarrioFormato = codigoBarrio == undefined ? 0 : Number(codigoBarrio)
        // descuentoNomina
        delete data.ventasMensuales;
        delete data.comprasSemanales;
        delete data.activos;
        delete data.comisionesHorasExtras;
        delete data.descuentoNomina;

        // delete data.otrosIngresos;
        const datosFormularios: FormularioCreditoInterface = {
            otrosIngresos: otrosIngresosFormato,
            plazo: plazoFormato,
            ingresos: ingresosFormato,
            descuentoNomina: descuentoNominaFormato,
            comisionesHorasExtras: comisionesHorasExtrasFormato,
            fechaFinalizacionContrato: fechaFinalizacionContratoFormato,
            fechaVinculacion: fechaVinculacionFormato,
            valorSolicitado: valorSolicitadoFormato,
            salarioBasico: salarioBasicoformato,
            fechaNacimiento: fechaNacimientoFormato,
            fechaExpedicionDocumento: fechaExpedicionDocumentoFormato,
            comprasSemanales: compraSemanal,
            ventasMensuales: ventasMensuales,
            activos: activos,
            antiguedadComprasSemanales: Number(antiguedadComprasSemanales),
            score: Number(scoreFormato),
            nivelEndeudamiento: Number(nivelEndeudamientoFormato),
            cupoTotal: Number(cupoTotalFormato),
            cupoReservado: Number(cupoReservadoFormato),
            cupoDisponible: Number(cupoDisponbileFormato),
            codigoBarrio: codigoBarrioFormato,
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
                // console.log(this.form.getRawValue());
                // console.log(datosFormularios);
            }
        });
        // } else {
        //     this.form.markAllAsTouched();
        // }
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
                // console.log(data);
                this.form.patchValue(data);
                this.agenda_fabrica = data.agenda;
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data;
                this.dialog_a_mostrar = ((data.cantidadCheckList != data.totalCheckList) ? 'CHECKLIST' : 'SIGUIENTE');
                this.createValidacion()
                if (data.tipoDocumento === 'NIT') {
                    const digitoVerificacion: string = this.calcularDigitoVerificacion(data.identificacion);
                    const diitoString: string = digitoVerificacion.toString();
                    this.form.controls.digitoVerificacion.setValue(diitoString);
                }
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
     * @description: Guardado de datos fabrica
     */
    private postFormularioFabrica(datos: FormularioCreditoInterface): void {
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
     * @description: Calcula el digito de verificacion
     */
    private calcularDigitoVerificacion(data): string {
        let vpri; let x; let y; let z;

        // Se limpia el Nit
        data = data.replace(/\s/g, ''); // Espacios
        data = data.replace(/,/g, ''); // Comas
        data = data.replace(/\./g, ''); // Puntos
        data = data.replace(/-/g, ''); // Guiones

        // Se valida el nit
        if (isNaN(data)) {
            return '';
        };

        // Procedimiento
        vpri = new Array(16);
        z = data.length;

        vpri[1] = 3;
        vpri[2] = 7;
        vpri[3] = 13;
        vpri[4] = 17;
        vpri[5] = 19;
        vpri[6] = 23;
        vpri[7] = 29;
        vpri[8] = 37;
        vpri[9] = 41;
        vpri[10] = 43;
        vpri[11] = 47;
        vpri[12] = 53;
        vpri[13] = 59;
        vpri[14] = 67;
        vpri[15] = 71;

        x = 0;
        y = 0;
        for (let i = 0; i < z; i++) {
            y = (data.substr(i, 1));
            // console.log ( y + "x" + vpri[z-i] + ":" ) ;

            x += (y * vpri[z - i]);
            // console.log ( x ) ;
        }

        y = x % 11;
        // console.log ( y ) ;

        return (y > 1) ? 11 - y : y;
    }

    /**
     * @description :creando el formulario
     */
    private createFormulario(): void {
        this.form = this.fb.group({
            id: undefined,
            numeroSolicitud: [''],
            emision: [''],
            fechaIngresoFabrica: [''],
            descripcionEstado: [''],
            descripcionOrigen: [''],
            codigoSubEstado: [''],
            cupoTotal: [''],
            cupoReservado: [''],
            cupoDisponible: [''],
            score: [''],
            descripcionSubestado: [''],
            contadorEmbargos: [''],
            descripcionScore: [''],
            nivelEndeudamiento: [''],
            comprasSemanales: [''],
            antiguedadComprasSemanales: [''],
            ventasMensuales: [''],
            activos: [''],
            declarante: ['', [Validators.required]],
            codigoDepartamentoNegocio: [''],
            descripcionDepartamentoNegocio: [''],
            codigoCiudadNegocio: [''],
            descripcionCiudadNegocio: [''],
            codigoBarrioNegocio: [''],
            descripcionBarrioNegocio: [''],
            direccionNegocio: [''],
            telefonoNegocio: ['', [Validators.pattern(/^[0-9]*$/)]],
            telefono: [''],
            antiguedadNegocio: [''],
            camaraComercio: [''],
            nitNegocio: ['', [Validators.pattern(/^[0-9]*$/)]],
            tipo: [''],
            tipoDocumento: [''],
            identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            digitoVerificacion: [''],
            nombreCompleto: ['', [Validators.required]],
            nombreNegocio: [''],
            fechaMatricula: [''],
            fechaExpedicionDocumento: [''],
            primerNombre: ['', [Validators.required]],
            segundoNombre: [''],
            primerApellido: ['', [Validators.required]],
            segundoApellido: [''],
            celular: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
            email: [''],
            genero: [''],
            nacionalidad: [''],
            fechaNacimiento: [''],
            codigoDepartamentoNacimiento: [''],
            codigoCiudadNacimiento: [''],
            tipoVivienda: [''],
            codigoDepartamento: [''],
            descripcionDepartamento: [''],
            codigoCiudad: [''],
            descripcionCiudad: [''],
            codigoBarrio: [''],
            descripcionBarrio: [''],
            direccionResidencial: [''],
            nivelEstudio: [''],
            viveEnNegocio: [''],
            descripcionTipo: [''],
            valorSolicitado: [''],
            tipoCredito: [''],
            tipoContrato: [''],
            destinoCredito: [''],
            plazo: [''],
            cargo: [''],
            estadoCivil: [''],
            estrato: [''],
            otroDestinoCredito: [''],
            codigoCiudadExpedicion: [''],
            salarioBasico: [''],
            numeroCuentaBancaria: [''],
            descuentoNomina: [""],
            comisionesHorasExtras: [""],
            modificado: [''],
            aplicaIngresos: [''],
            descripcionOtrosIngresos: [''],
            otrosIngresos: [''],
            otraPagaduria: [''],
            pagaduria: [''],
            ingresos: [''],
            tipoCuentaBancaria: [''],
            entidadBancaria: [''],
            fechaVinculacion: [''],
            fechaFinalizacionContrato: [''],
            codigoDepartamentoExpedicion: [''],
            modificadoPolitica:[''],
            aplicaDetalleOferta:[''],
            aplicaCodeudor:[''],
            creditoTitularLineas:[''],
            creditoCodeudorLineas:[''],
            sanamientoFinanciero:[''],
            aplicaEmbargo:[''],
            valorSolicitadoWeb:['']
        });
    }

    /**
    * @description :creando el validaciones
    */
    private createValidacion(): void {
        switch (this.agenda_fabrica) {
            case 'CM':
                this.redeonlyForm = {
                    id: true,
                    numeroSolicitud: true,
                    emision: true,
                    fechaIngresoFabrica: true,
                    descripcionEstado: true,
                    descripcionOrigen: true,
                    codigoSubEstado: true,
                    cupoTotal: true,
                    cupoReservado: true,
                    cupoDisponible: true,
                    score: true,
                    descripcionSubestado: true,
                    descripcionScore: true,
                    nivelEndeudamiento: true,
                    comprasSemanales: true,
                    antiguedadComprasSemanales: true,
                    ventasMensuales: true,
                    activos: true,
                    declarante: true,
                    codigoDepartamentoNegocio: true,
                    descripcionDepartamentoNegocio: true,
                    codigoCiudadNegocio: true,
                    descripcionCiudadNegocio: true,
                    codigoBarrioNegocio: true,
                    descripcionBarrioNegocio: true,
                    direccionNegocio: true,
                    telefonoNegocio: true,
                    telefono: true,
                    antiguedadNegocio: true,
                    camaraComercio: true,
                    nitNegocio: true,
                    tipo: true,
                    tipoDocumento: true,
                    identificacion: true,
                    digitoVerificacion: true,
                    nombreCompleto: true,
                    nombreNegocio: true,
                    fechaMatricula: true,
                    fechaExpedicionDocumento: false,
                    primerNombre: true,
                    segundoNombre: true,
                    primerApellido: true,
                    segundoApellido: true,
                    celular: true,
                    email: true,
                    genero: true,
                    nacionalidad: true,
                    fechaNacimiento: true,
                    codigoDepartamentoNacimiento: true,
                    codigoCiudadNacimiento: true,
                    tipoVivienda: false,
                    codigoDepartamento: false,
                    descripcionDepartamento: false,
                    codigoCiudad: false,
                    descripcionCiudad: false,
                    codigoBarrio: false,
                    descripcionBarrio: false,
                    direccionResidencial: false,
                    nivelEstudio: false,
                    viveEnNegocio: false,
                    descripcionTipo: false,
                    tipoEstadoCivil: false,
                    tipoCredito: false,

                };
                break;

            default:
                this.redeonlyForm = {
                    id: true,
                    numeroSolicitud: true,
                    emision: true,
                    fechaIngresoFabrica: true,
                    descripcionEstado: true,
                    descripcionOrigen: true,
                    codigoSubEstado: true,
                    cupoTotal: true,
                    cupoReservado: true,
                    cupoDisponible: true,
                    score: true,
                    descripcionSubestado: true,
                    descripcionScore: true,
                    nivelEndeudamiento: false,
                    comprasSemanales: false,
                    antiguedadComprasSemanales: false,
                    ventasMensuales: false,
                    activos: false,
                    declarante: false,
                    codigoDepartamentoNegocio: false,
                    descripcionDepartamentoNegocio: false,
                    codigoCiudadNegocio: false,
                    descripcionCiudadNegocio: false,
                    codigoBarrioNegocio: false,
                    descripcionBarrioNegocio: false,
                    direccionNegocio: false,
                    telefonoNegocio: false,
                    telefono: false,
                    antiguedadNegocio: false,
                    camaraComercio: true,
                    nitNegocio: true,
                    tipo: true,
                    tipoDocumento: true,
                    identificacion: true,
                    digitoVerificacion: true,
                    nombreCompleto: true,
                    nombreNegocio: false,
                    fechaMatricula: false,
                    fechaExpedicionDocumento: false,
                    primerNombre: false,
                    segundoNombre: false,
                    primerApellido: true,
                    segundoApellido: false,
                    celular: false,
                    email: false,
                    genero: false,
                    nacionalidad: false,
                    fechaNacimiento: true,
                    codigoDepartamentoNacimiento: false,
                    codigoCiudadNacimiento: false,
                    tipoVivienda: false,
                    codigoDepartamento: false,
                    descripcionDepartamento: false,
                    codigoCiudad: false,
                    descripcionCiudad: false,
                    codigoBarrio: false,
                    descripcionBarrio: false,
                    direccionResidencial: false,
                    nivelEstudio: false,
                    viveEnNegocio: false,
                    descripcionTipo: false,
                    tipoEstadoCivil: false,
                    tipoCredito: false,

                };
                break;
        }


    }

    /**
     * @description: Escucha los cambios del formulario
     */
    public listenFormulario(): void {
        this.form.controls.tipoDocumento.valueChanges.subscribe((tipo) => {
            if (tipo === 'NIT') {
                this.form.controls.primerNombre.setValidators(Validators.nullValidator);
                this.form.controls.primerApellido.setValidators(Validators.nullValidator);
            }
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

    /**
     * @description: Valida que el campo solo sea numeros
     */
    public irAtras() {
        switch (this.agenda_fabrica) {
            case 'CO':
                this.redireccionar('agenda-completion');
                break;
            case 'RE':
                this.redireccionar('agenda-referencing');
                break;
            default:
                this.redireccionar('agenda-comercial');
                break;
        }
    }

    /**
     * @description: Redireciona a la grid de cada agenda
     */
    private redireccionar(data: any) {
        this.router.navigate(['/credit-factory/' + data]);
    }


    public validacion(tipo: string) {
        if (this.form.controls['aplicaIngresos'].value == 'N') {
            this.form.controls['otrosIngresos'].setValue("0");
            this.form.controls['ingresos'].setValue("0");
            this.form.controls['descripcionOtrosIngresos'].setValue("");
        }
        let mensaje = "¿Estás seguro de editar el campo de "
        switch (tipo) {
            case 'S':
                mensaje += ' <b> salario</b>';
                break;
            case 'D':
                mensaje += '<b> descuento de nómina</b>';
                break;
            case 'C':
                mensaje += ' <b> comisiones por horas extras</b>';
                break;
            case 'AI':
                mensaje += ' <b> ingresos adicionales</b>';
                break;
            case 'IA':
                mensaje += ' <b> valor de los ingresos adicionales</b>';
                break;
            case 'PL':
                mensaje += ' <b> plazo del crédito</b>';
                break;
            case 'MO':
                mensaje += ' <b> valor del monto solicitado</b>';
                break;
            case 'PA':
                mensaje += ' <b> empresa en la que trabaja</b>';
                break;
            case 'TC':
                mensaje += ' <b> tipo de contrato</b>';
                break;
            case 'FV':
                mensaje += ' <b> fecha de vinculación</b>';
                break;
            case 'GEN':
                mensaje += ' <b> género </b>';
                break;
            case 'FEN':
                mensaje += ' <b> fecha de nacimiento</b>';
                break;
            default:
                break;
        }

        if ((tipo == 'PA') || (tipo == 'TC')|| (tipo == 'FV')|| (tipo == 'GEN')|| (tipo == 'FEN')) {
            mensaje += "?, Este campo modifica el motor de decisión y políticas SARC.";
        }else{
            mensaje += "?, Este campo actualiza la capacidad de pago del cliente.";
        }
        if (tipo != 'AI' && tipo != 'IA') {
            Swal.fire({
                title: 'Guardar información',
                html: mensaje,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#a3a0a0',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let salarioBasicoForm=Number(this.utility.enviarNumero(this.form.value.salarioBasico));
                    if(this.salarioBasico>salarioBasicoForm){
                        Swal.fire({
                            icon: 'warning',
                            title: 'Validación de campo',
                            text: "El salario ingresado no puede ser menor al SLMV.",
                        });
                        this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico)));
                        return
                    }
                    let sum =
                        Number(this.utility.enviarNumero(this.form.value.salarioBasico))
                        +
                        // Number(this.utility.enviarNumero(this.form.value.descuentoNomina))
                        // +
                        Number(this.utility.enviarNumero(this.form.value.comisionesHorasExtras))
                        +
                        Number(this.utility.enviarNumero(this.form.value.otrosIngresos))
                        ;
                    this.form.controls['ingresos'].setValue(this.utility.formatearNumero(String(sum)));

                } else {
                    switch (tipo) {
                        case 'S':
                            this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico)));
                            break;
                        case 'D':
                            this.form.controls['descuentoNomina'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.descuentoNomina)));
                            break;
                        case 'C':
                            this.form.controls['comisionesHorasExtras'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.comisionesHorasExtras)));
                            break;
                        case 'AI':
                            this.form.controls['aplicaIngresos'].setValue(this.fabricaDatos.aplicaIngresos);
                            break;
                        case 'IA':
                            this.form.controls['otrosIngresos'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.otrosIngresos)));
                            break;
                        case 'PL':
                            this.form.controls['plazo'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.plazo)));
                            break;
                        case 'MO':
                            this.form.controls['monto'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.monto)));
                            break;
                        case 'PA':
                            this.form.controls['pagaduria'].setValue(String(this.fabricaDatos.pagaduria));
                            break;
                        case 'TC':
                            this.form.controls['tipoContrato'].setValue(String(this.fabricaDatos.tipoContrato));
                            break;
                        case 'FV':
                            this.form.controls['fechaVinculacion'].setValue(String(this.fabricaDatos.fechaVinculacion));
                            break;
                        case 'GEN':
                            this.form.controls['genero'].setValue(String(this.fabricaDatos.genero));
                            break;
                        case 'FEN':
                            this.form.controls['fechaNacimiento'].setValue(String(this.fabricaDatos.fechaNacimiento));
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        let sum =
            Number(this.utility.enviarNumero(this.form.value.salarioBasico))
            +
            // Number(this.utility.enviarNumero(this.form.value.descuentoNomina))
            // +
            Number(this.utility.enviarNumero(this.form.value.comisionesHorasExtras))
            +
            Number(this.utility.enviarNumero(this.form.value.otrosIngresos))
            ;
        this.form.controls['ingresos'].setValue(this.utility.formatearNumero(String(sum)));

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
        // this.agendaCompletacionService.resetSeleccionAgenda();
    }


}
