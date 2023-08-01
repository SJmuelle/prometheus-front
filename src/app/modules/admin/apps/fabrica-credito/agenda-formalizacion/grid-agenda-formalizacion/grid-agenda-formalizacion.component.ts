import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgendaFormalizacionService } from '../../../../../../core/services/agenda-formalizacion.service';
import { Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { delay, takeUntil } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import moment from "moment";
import 'moment/locale/es';

@Component({
    selector: 'app-grid-agenda-formalizacion',
    templateUrl: './grid-agenda-formalizacion.component.html',
    styleUrls: ['./grid-agenda-formalizacion.component.scss']
})
export class GridAgendaFormalizacionComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<any> = new Subject();
    public page: number = 1;
    // public tamanoTabl:number=5;
    public filtrarTabla = new FormControl('');
    public tamanoTabl = new FormControl("10");
    public mostrar: boolean = true;
    public datos: any[] = [];
    public mostrarTotales: boolean = true;
    public totales: any[];
    public headerColums: string[] = ['numeroSolicitud', 'identificacion', 'nombreCompleto', 'monto', 'agencia', 'asesor'];
    constructor(
        private agendaFormalizacionService: AgendaFormalizacionService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cambiarEstado(true);
        this.getAgendaFormalizacion();
        this.getTotalesAgendaFormalizacion()
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
    private getAgendaFormalizacion(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.agendaFormalizacionService.getAgendaFormalizacion().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((res) => {
            if (res.status === 200) {
                this.datos = res.data;
                this.mostrar = false;
                Swal.close();
            } else {
                Swal.close();
            }
        });
    }

    /**
   * @description: Obtiene el listado de agenda de completacion
  */
    private getTotalesAgendaFormalizacion(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.agendaFormalizacionService.getTotalesAgendaFormalizacion().pipe(
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

    cambiarFecha(date) {
        moment.locale('es');
        return moment(date).format('MMMM D YYYY')
    }

    cambiarHora(date) {
        moment.locale('es');
        return moment(date).format('hh:mm A')
    }


    /**
   * @description: abre el resumen
   */
    public goResumen(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/agenda-decision/resumen/', numeroSolicitud, identificacion]);
    }

    public changePageToOne(){
        this.page = 1;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }

}
