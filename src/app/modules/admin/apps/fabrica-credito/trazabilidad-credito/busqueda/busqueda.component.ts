import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { UtilityService } from 'app/resources/services/utility.service';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<any> = new Subject();

    listadoCount = 0;
    public form: FormGroup;
    public formPeriodo: FormGroup;
    /* eslint-disable */
    listados = [];
    drawerMode: 'side' | 'over';
    drawerOpened: boolean;

    public unidad$: Observable<any>;
    public pagaduria$: Observable<any>;
    public estados$: Observable<any>;
    public subestados$: Observable<any>;
    datos: { entidad: string; details: any; };

    constructor(
        private _fabricaCreditoService: FabricaCreditoService,
        private router: Router,
        private fb: FormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private genericaServices: GenericasService,
    ) { }

    ngOnInit(): void {
        this.getUnidades();
        this.getPagadurias();
        this.getEstado();
        localStorage.setItem("trazabilidad", "no")
        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaChange$
            .subscribe(({ matchingAliases }) => {

                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('md')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
        this.armarForm();
        this.formPeriodo.valueChanges.subscribe((e: any) => {
            if (this.formPeriodo.valid) {
                if ((e.fechaInicial != null) && (e.fechaInicial != '') && (e.fechaFinal != '') && (e.fechaFinal != null)) {
                    let fechaFinal = moment(e.fechaFinal._d).format("YYYY-MM-DD");
                    let fechaInicial = moment(e.fechaInicial._d).format("YYYY-MM-DD");

                    this.form.controls.fechaInicial=new FormGroup({
                        tipo: new FormControl('FECHA_INICIAL'),
                        buscar: new FormControl(fechaInicial)
                    })
                    this.form.controls.fechaIFinal=new FormGroup({
                        tipo: new FormControl('FECHA_FINAL'),
                        buscar: new FormControl(fechaFinal)
                    })
                }
                this.armarConsulta(Object.values(this.form.getRawValue()))
            }
        })

        this.form.valueChanges.subscribe((e: any) => {
            let data = Object.values(e)
            this.armarConsulta(data)
            console.log(Object.values(this.form.getRawValue()), 'valores');

        })

        // this.formPeriodo.valueChanges.subscribe((e: any) => {
        //     let data = Object.values(e)
        //     this.armarConsultaFecha(data)
        // })
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    consulta(dato) {
        let data = {
            busqueda: dato
        };
        Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._fabricaCreditoService
            .busquedaGeneral(data)
            .subscribe((response: any) => {
                Swal.close();
                if (response) {
                    this.listados = response.data;
                    this.listadoCount = this.listados.length;
                } else {
                    this.listados = [];
                    this.listadoCount = this.listados.length;
                }
            });

    }

    consultaFiltro() {
        let dato = this.datos;
        if(dato==null){
            return
        }
        Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._fabricaCreditoService
            .trazabilidadBusquedaFiltro(dato)
            .subscribe((response: any) => {
                Swal.close();
                if (response) {
                    this.listados = response.data.trazabilidad;
                    this.listadoCount = this.listados.length;
                } else {
                    this.listados = [];
                    this.listadoCount = this.listados.length;
                }
            });

    }



    /**
         * @description: abre el resumen
    */
    public goResumen(data: any): void {
        localStorage.setItem("trazabilidad", "si")
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/trazabilidad/detalle-trazabilidad/', numeroSolicitud, identificacion]);
    }

    public cambiarFecha(date) {
        moment.locale('es');
        return moment(date).format('MMMM D YYYY')
    }

    public cambiarHora(date) {
        moment.locale('es');
        return moment(date).format('hh:mm A')
    }

    public armarForm() {
        this.formPeriodo = this.fb.group({
            fechaInicial: [''],
            fechaFinal: [''],
        })
        this.form = this.fb.group({
            estado: new FormGroup({
                tipo: new FormControl('TIPO'),
                buscar: new FormControl('')
            }),
            identificacion: new FormGroup({
                tipo: new FormControl('IDENTIFICACION'),
                buscar: new FormControl('')
            }),
            negocio: new FormGroup({
                tipo: new FormControl('CODIGO-NEGOCIO'),
                buscar: new FormControl('')
            }),
            pagaduria: new FormGroup({
                tipo: new FormControl('PAGADURIA'),
                buscar: new FormControl('')
            }),
            subestado: new FormGroup({
                tipo: new FormControl('SUBESTADO'),
                buscar: new FormControl('')
            }),
            agenda: new FormGroup({
                tipo: new FormControl('AGENDA'),
                buscar: new FormControl('')
            }),
            solicitud: new FormGroup({
                tipo: new FormControl('SOLICITUD'),
                buscar: new FormControl('')
            }),
            fechaFinal: new FormGroup({
                tipo: new FormControl('FECHA_FINAL'),
                buscar: new FormControl('')
            }),
            fechaInicial: new FormGroup({
                tipo: new FormControl('FECHA_INICIAL'),
                buscar: new FormControl('')
            }),
        });
    }

    /**
     * @description: abre la agenda
     */
    public onGetAgenda(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        localStorage.setItem("trazabilidad", "si")
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/credit-management', numeroSolicitud, identificacion]);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private armarConsulta(data) {
        console.log('armando consulta', data);

        const filtered = data.filter(function (element: any) {
            switch (element.tipo) {
                case 'IDENTIFICACION':
                case 'SOLICITUD':
                    if (element.buscar.length > 5) {
                        return element
                    }
                    break;

                default:
                    if (element.buscar.length > 0) {
                        return element
                    }
                    break;
            }

        });

        if (filtered.length > 0) {
            let dataEnvio = {
                entidad: 'TRAZABILIDAD',
                details: filtered
            }
            this.datos = dataEnvio
        }else{
            this.datos = null
        }
    }

    private armarConsultaFecha(data) {
        this.datos.details = data
    }

    /**
 * @description: Obtiene las unidades
 */
    private getUnidades(): void {
        this.unidad$ = this.genericaServices.getUnidadesNegocio();
    }


    /**
     * @description: Obtiene las unidades
     */
    private getPagadurias(): void {
        this.pagaduria$ = this.genericaServices.getPagadurias();
    }


    /**
     * @description: Obtiene los estados de credito
     */
    private getEstado(): void {
        this.estados$ = this.genericaServices.getEstadoCredito();
    }

    public getSubestados(data) {
        this.subestados$ = this.genericaServices.postSubEstados(data);
    }


    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }
}
