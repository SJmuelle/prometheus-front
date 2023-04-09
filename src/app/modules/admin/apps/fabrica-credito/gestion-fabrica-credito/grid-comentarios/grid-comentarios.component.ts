import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComentariosService } from "../../../../../../core/services/comentarios.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComentariosComponent } from "../form-dialog-comentarios/form-dialog-comentarios.component";
import { FormControl } from "@angular/forms";
import moment from 'moment';
import { PermisosService } from 'app/core/services/permisos.service';

@Component({
    selector: 'app-grid-comentarios',
    templateUrl: './grid-comentarios.component.html',
    styleUrls: ['./grid-comentarios.component.scss']
})
export class GridComentariosComponent implements OnInit {
    public comentarios$: Observable<any>;
    public esVer: boolean = false;
    @Output() cerrarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() minimizarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public page: number = 1;
    public tamanoTabl = new FormControl('5');
    @Input() agenda: string;
    public permisoEditar:boolean;
    constructor(
        private comentariosServices: ComentariosService,
        private route: ActivatedRoute,
        private router: Router,
        private _dialog: MatDialog,
        public _permisosService: PermisosService

    ) {
        router.events.subscribe((url: any) => {});
        this.permisoEditar = this._permisosService.permisoPorModuleTrazxabilidad(router.url)
    }

    ngOnInit(): void {
        this.getData();
    }

    public onComentario(): void {
        const dialogRef = this._dialog.open(FormDialogComentariosComponent, {
            minWidth: '30%',
            minHeight: '30%',
            data: { numeroSolicitud: this.numeroSolicitud }
        });
        dialogRef.afterClosed().toPromise().then((res) => {
            this.getData();
        });
    }

    public onVerComentario(item): void {
        const dialogRef = this._dialog.open(FormDialogComentariosComponent, {
            minWidth: '30%',
            minHeight: '30%',
            data: item
        });
        dialogRef.afterClosed().toPromise();
    }

    public onCerrar(): void {
        this.cerrarComponente.emit(false);
    }

    public onMinimiza(): void {
        this.minimizarComponente.emit(false);
    }

    private getData(): void {
        const numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
        if (numeroSolicitud) {
            this.getComentarios(numeroSolicitud);
        }
    }
    /**
     * @description: Obtiene los comentarios
     */
    private getComentarios(codigo: string): void {
        this.comentarios$ = this.comentariosServices.getComentarios(codigo, this.agenda);
    }

    /**
    * Returns whether the given dates are different days
    *
    * @param current
    * @param compare
    */
    isSameDay(current: string, compare: string): boolean {
        return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
    }

    /**
     * Get the relative format of the given date
     *
     * @param date
     */
    getRelativeFormat(date: string): string {
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');

        // Is today?
        if (moment(date, moment.ISO_8601).isSame(today, 'day')) {
            return 'Hoy';
        }

        // Is yesterday? 
        if (moment(date, moment.ISO_8601).isSame(yesterday, 'day')) {
            return 'Ayer';
        }

        return moment(date, moment.ISO_8601).fromNow();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.idComentario || index;
    }
}
