import { Component, OnInit, Input,Output,EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { FormDialogDevolverFabricaComponent } from 'app/modules/admin/apps/fabrica-credito/agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { FormDecisionComponent } from 'app/modules/admin/apps/fabrica-credito/agenda-decision/form-decision/form-decision.component';
import { FormDialogReprogramarComponent } from 'app/modules/admin/apps/fabrica-credito/agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

    public filtrarTabla = new FormControl('');
    public tamanoTabl = new FormControl("10");
    public unsubscribe$: Subject<any> = new Subject();

    @Input() datos;
    public page: number = 1;
    @Output() actualizarTabla:  EventEmitter<string> = new EventEmitter;

    constructor( private router: Router,
        private _matDialog: MatDialog,
        private fabricaCreditoService: FabricaCreditoService,
        private _dialog: MatDialog) { }

    ngOnInit(): void {


    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        this.changePageToOne();
        console.log(this.datos, 'Datos tabla');

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

    desistir(numeroSolicitud, identificacion) {
        const datosSolicitud: any = {
            numeroSolicitud: numeroSolicitud,
            identificacion: identificacion
        };
        this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unsubscribe$))
            .subscribe(({ data }) => {
                this._dialog.open(FormDecisionComponent, {
                    width: '60%',
                    data: data,
                    disableClose: false,

                });
            })
    }

        /**
   * @description: abre el resumen
   */
        public goResumen(data: any): void {
            //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
            const { numeroSolicitud, identificacion } = data;
            this.router.navigate(['/credit-factory/agenda-decision/resumen/', numeroSolicitud, identificacion]);
          }

    public isMobil(){
        return window.innerWidth < 600;
    }
}
