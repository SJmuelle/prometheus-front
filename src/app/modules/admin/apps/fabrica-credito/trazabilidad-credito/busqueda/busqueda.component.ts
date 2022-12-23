import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { UtilityService } from 'app/resources/services/utility.service';
import moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
    listadoCount = 0;
    public form: FormGroup;
    public formPeriodo: FormGroup;
    /* eslint-disable */
    listados = [];
    drawerMode: 'side' | 'over';
    drawerOpened: boolean;

    constructor(
        private _fabricaCreditoService: FabricaCreditoService,
        private router: Router,
        private fb: FormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) { }

    ngOnInit(): void {
        this.consulta('');
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
                tipo: new FormControl('NEGOCIO'),
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
        this.formPeriodo.valueChanges.subscribe((e: string) => {
            console.log(e)

        })
        this.form.valueChanges.subscribe((e: any) => {
            let data = Object.values(e)
            const filtered = data.filter(function (element: any) {
                if (element.buscar.length > 5) {
                    return element
                }
            });
            console.log(filtered)
            if (filtered.length > 0) {
                let dataEnvio = {
                    entidad: 'TRAZABILIDAD',
                    details: filtered
                }
                this.consultaFiltro(dataEnvio)
            }else{
                // this.consulta('');
            }
        })
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

    consultaFiltro(dato) {
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

    onKeyUp(event) {
        let data = event.target.value;
        if (data.length > 5) {
            this.consulta(data);
        }
        if (data.length === 0) {
            this.consulta('');
        }
    }

    /**
         * @description: abre el resumen
    */
    public goResumen(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/trazabilidad/detalle-trazabilidad/', numeroSolicitud, identificacion]);
    }




    cambiarFecha(date) {
        moment.locale('es');
        return moment(date).format('MMMM D YYYY')
    }

    cambiarHora(date) {
        moment.locale('es');
        return moment(date).format('h:mm a')
    }
}
