import { Component, OnInit, Input,Output,EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormDialogDevolverFabricaComponent } from 'app/modules/admin/apps/fabrica-credito/agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { FormDialogReprogramarComponent } from 'app/modules/admin/apps/fabrica-credito/agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';
import moment from 'moment';
@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

    public filtrarTabla = new FormControl('');
    public tamanoTabl = new FormControl("10");

    @Input() datos;
    public page: number = 1;
    @Output() actualizarTabla:  EventEmitter<string> = new EventEmitter;

    constructor( private router: Router,
        private _matDialog: MatDialog) { }

    ngOnInit(): void {


    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        this.changePageToOne();
    }

    public changePageToOne() {

        this.page = 1;
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
     * @description: abre la agenda
     */
       public onGetAgenda(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/credit-management', numeroSolicitud, identificacion]);
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
    /*
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
                this.actualizarTabla.emit('actualizar');
            //    this.getAgendaComercial();
            //    this.agendaComercialService.refrescarListado$.next({ estado: true });
               //  this.onCerrar();
           }
       });
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
            this.actualizarTabla.emit('actualizar');

            // this.getAgendaComercial();
            // this.agendaComercialService.refrescarListado$.next({ estado: true });
        });
    }

    public onGetGridRefrenciacion(data: any): void {
        const { numeroSolicitud, identificacion, undadNegocio,unidadNegocioFabrica} = data;
        // ;
        this.router.navigate([`credit-factory/agenda-referencing/${unidadNegocioFabrica}/${numeroSolicitud}/${identificacion}`]);
    }
}
