import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgendaCompletacionService } from '../../../../../../core/services/agenda-completacion.service';
import { Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { delay, takeUntil } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import moment from "moment";
import 'moment/locale/es';

@Component({
    selector: 'app-grid-agenda-completacion',
    templateUrl: './grid-agenda-completacion.component.html',
    styleUrls: ['./grid-agenda-completacion.component.scss']
})
export class GridAgendaCompletacionComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<any> = new Subject();
    public page: number = 1;
    // public tamanoTabl:number=5;
    public filtrarTabla = new FormControl('');
    public tamanoTabl = new FormControl("10");
    public mostrar: boolean = true;
    public datos: any[] = [];
    public datosAux: any[] = [];
    public mostrarTotales: boolean = true;
    public totales: any[];
    public headerColums: string[] = ['numeroSolicitud', 'identificacion', 'nombreCompleto', 'monto', 'agencia','asesor'];

    public loadingDataTable: boolean = false;

    constructor(
        private agendaCompletacionService: AgendaCompletacionService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cambiarEstado(true);
        this.getAgendaCompletacion();
        this.getTotalesAgendaCompletacion()
    }

    public cambiarEstado(estado) {
        this.mostrarTotales = estado;
    }

    public onGetAgenda(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/credit-management', numeroSolicitud, identificacion]);
    }
    /**
     * @description: Obtiene el listado de agenda de completacion
    */
    private getAgendaCompletacion(): void {
        this.loadingDataTable = true;
        this.agendaCompletacionService.getAgendaCompletacion().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((res) => {
            if (res.status === 200) {
                this.datos = res.data;
                this.datosAux = res.data;
                this.mostrar = false;
                Swal.close();
            } else {
                Swal.close();
            }
            this.loadingDataTable = false;
        });
    }

    /**
   * @description: Obtiene el listado de agenda de completacion
  */
    private getTotalesAgendaCompletacion(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.agendaCompletacionService.getTotalesAgendaCompletacion().pipe(
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

    cambiarFecha(date){
        moment.locale('es');
        return moment(date).format('MMMM D YYYY')
    }

    cambiarHora(date){
        moment.locale('es');
        return moment(date).format('hh:mm A')
    }

    filtrarTablaTotalesEvent(datos){
        this.datos = datos;
    }

    actualizarTabla($event){
        // this.getAgendaComercial();
        // this.agendaComercialService.refrescarListado$.next({ estado: true });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }

}
