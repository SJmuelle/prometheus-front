import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { AgendaReferenciacionService } from '../../../../../../core/services/agenda-referenciacion.service';
import { Router } from '@angular/router';
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {
    FormGestionReferenciacionModalComponent
} from '../form-gestion-referenciacion-modal/form-gestion-referenciacion-modal.component';
import Swal from "sweetalert2";
import { takeUntil } from "rxjs/operators";
import moment from 'moment';
import { FormDialogReprogramarComponent } from '../form-dialog-reprogramar/form-dialog-reprogramar.component';

@Component({
    selector: 'app-grid-agenda-referenciacion',
    templateUrl: './grid-agenda-referenciacion.component.html',
    styleUrls: ['./grid-agenda-referenciacion.component.scss']
})
export class GridAgendaReferenciacionComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<any> = new Subject();
    public filtrarTabla = new FormControl('');
    public tamanoTabl = new FormControl('5');
    public page: number = 1;
    public mostrar: boolean = true;
    public datos: any[] = [];
    public mostrarTotales: boolean = true;
    public totales: any[];
    constructor(
        private agendaReferenciaService: AgendaReferenciacionService,
        private router: Router,
        private _matDialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getAgendaReferenciacion();
        this.escuchaObservable();
        this.getTotalesAgendReferenciacion();
        this.cambiarEstado(true);
    }

    public onGetAgenda(data: any): void {
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate([`credit-factory/credit-management/${numeroSolicitud}/${identificacion}`]);
    }
    public onGetGridRefrenciacion(data: any): void {
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate([`credit-factory/agenda-referencing/${numeroSolicitud}/${identificacion}`]);
    }

    public onOpenDialog(item: any): void {
        const dialogRef = this._matDialog.open(FormGestionReferenciacionModalComponent, {
            minWidth: '90%',
            minHeight: '80%',
            data: { numeroSolicitud: item.numeroSolicitud }
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.getAgendaReferenciacion();
            }
        });
    }

    private getAgendaReferenciacion(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.agendaReferenciaService.getAgendaReferenciacion().pipe(
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
     * @description: Escucha el observabke
     */
    private escuchaObservable(): void {
        this.agendaReferenciaService.refrescarListado$.subscribe(({ estado }) => {
            if (estado) {
                this.getAgendaReferenciacion();
            }
        });
    }
    /**
     * @description: Obtiene el listado de agenda de comercial
     */
    private getTotalesAgendReferenciacion(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.agendaReferenciaService.getTotalesAgendaReferenciacion().pipe(
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
                console.log(res);
                // this.getAgendaReferenciacion();
                // this.agendaReferenciaService.refrescarListado$.next({ estado: true });
                //  this.onCerrar();
            }
        });
    }

    /**
     * 
     * @param date 
     * @returns 
     */
    cambiarFecha(date) {
        moment.locale('es');
        return moment(date).format('MMMM D YYYY')
    }
    /**
     * 
     * @param date 
     * @returns 
     */
    cambiarHora(date) {
        moment.locale('es');
        return moment(date).format('h:mm a')
    }

    /**
     * 
     * @param estado 
     */
    public cambiarEstado(estado) {
        this.mostrarTotales = estado;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }
}
