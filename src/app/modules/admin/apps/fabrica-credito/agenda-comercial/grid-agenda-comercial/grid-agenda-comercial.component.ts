import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendaReferenciacionService } from '../../../../../../core/services/agenda-referenciacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AgendaComercialService } from '../../../../../../core/services/agenda-comercial.service';
import { FormDialogReprogramarComponent } from '../../agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';
import { FormDialogDevolverFabricaComponent } from '../form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import moment from 'moment';
import { PermisosService } from 'app/core/services/permisos.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';

@Component({
    selector: 'app-grid-agenda-comercial',
    templateUrl: './grid-agenda-comercial.component.html',
    styleUrls: ['./grid-agenda-comercial.component.scss']
})
export class GridAgendaComercialComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<any> = new Subject();
    public mostrar: boolean = true;
    public datos: any[] = [];
    public page: number = 1;
    public tamanoTabl = new FormControl("10");
    public filtrarTabla = new FormControl('');
    public mostrarTotales: boolean = true;
    public totales: any[];
    public rolID: number;
    private scrollSpeed: number = 200;
    constructor(
        private agendaComercialService: AgendaComercialService,
        private _matDialog: MatDialog,
        private agendaReferenciaService: AgendaReferenciacionService,
        private _fabricaCredito: FabricaCreditoService,
        private router: Router,
        public _permisosService: PermisosService
    ) { }

    ngOnInit(): void {
        this.getRolID();
        this.cambiarEstado(true);
        this.getAgendaComercial();
        this.getTotalesAgendaComercial();
    }




    /**
       * @description: Obtiene el listado de agenda de completacion
      */
    private getAgendaComercial(): void {
        this.agendaComercialService.getAgendaComercial().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((res) => {

            if (res.status === 200) {
                this.datos = res.data;
                this.mostrar = false;

            } else {
            }
        });
    }

    /**
     * @description: Guarda la reprogramacion
     */
    public onReprogramar(data): void {
        const dialogRef = this._matDialog.open(FormDialogReprogramarComponent, {
            width: '30%',
            data: {
                numeroSolicitud: data.numeroSolicitud
            },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.getAgendaComercial();
                this.agendaComercialService.refrescarListado$.next({ estado: true });
                //  this.onCerrar();
            }
        });
    }

    /**
     * @description: abre la agenda
     */
    public onGetAgenda(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/credit-management', numeroSolicitud, identificacion]);
    }


    /**
      * @description: abre la agenda
      */
    public onGetAgendaDigital(data: any): void {
        if (data) {
            const { tipoDocumento, identificacion, numeroSolicitud } = data;
            this.router.navigate([`/credit-factory/formularios/microcredito/1/${tipoDocumento}/${identificacion}/${numeroSolicitud}`]);
        } else {
            //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
            this._permisosService.ruta = 'agenda-comercial';
            this.router.navigate([`/credit-factory/formularios/microcredito`]);
        }
    }

    /**
        * @description: abre el formulario corto de libranza publica
        */
    public navigateToLibranzaPublica(): void {
        this.router.navigate([`/credit-factory/formularios/libranza-publica`]);
    }

    /**
     * @description: Guarda el comentario para devolvee
     */
    public onComentario(data): void {
        //
        const dialogRef = this._matDialog.open(FormDialogDevolverFabricaComponent, {
            width: '30%',
            data: {
                numeroSolicitud: data.numeroSolicitud,
                tipo: 'C'
            },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe((res) => {

            this.getAgendaComercial();
            this.agendaComercialService.refrescarListado$.next({ estado: true });

        });
    }

    /**
   * @description: Guarda el comentario para devolvee
   */
    public onComentarioRechazar(data): void {
        //
        const dialogRef = this._matDialog.open(FormDialogDevolverFabricaComponent, {
            width: '30%',
            data: {
                numeroSolicitud: data.numeroSolicitud,
                tipo: 'R'
            },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe((res) => {

            this.getAgendaComercial();
            this.agendaComercialService.refrescarListado$.next({ estado: true });

        });
    }
    /**
     * @description: Obtiene el listado de agenda de comercial
     */
    private getTotalesAgendaComercial(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.agendaComercialService.getTotalesAgendaComercial().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((res) => {
            if (res.status === 200) {
                this.totales = res.data;
                Swal.close();
            } else {
                Swal.close();
                this.totales = []
            }
        });
    }
    /**
     *
     * @param date
     * @returns
     */
    cambiarFecha(date) {

        if (date) {
            moment.locale('es');
            return moment(date).format('MMMM D YYYY')
        }
        return 'No registra';
    }
    /**
     *
     * @param date
     * @returns
     */
    cambiarHora(date) {
        if (date) {

            moment.locale('co');


            return moment(date).format('hh:mm A')
        }
        return 'No registra';
    }

    /**
     *
     * @param estado
     */
    public cambiarEstado(estado) {
        this.mostrarTotales = estado;
    }

    public getRolID(){
        this._fabricaCredito.getRolId().subscribe(data => {
            this.rolID = data.data.rolId
        })
    }

    public changePageToOne(){
        this.page = 1;
    }


    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    nextTotalesSlider(){
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        slider.scroll({
            left: currentScroll + this.scrollSpeed,
            behavior: 'smooth'
        })
    }

    previousTotalesSlider(){
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        slider.scroll({
            left: currentScroll - this.scrollSpeed,
            behavior: 'smooth'
        })
    }
}
