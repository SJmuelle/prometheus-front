import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendaComercialService } from 'app/core/services/agenda-comercial.service';
import { AgendaReferenciacionService } from 'app/core/services/agenda-referenciacion.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogDevolverFabricaComponent } from '../../agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { FormDialogReprogramarComponent } from '../../agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';

@Component({
  selector: 'app-grid-agenda-decision',
  templateUrl: './grid-agenda-decision.component.html',
  styleUrls: ['./grid-agenda-decision.component.scss']
})
export class GridAgendaDecisionComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<any> = new Subject();
  public mostrar: boolean = true;
  public datos: any[] = [];
  public datosAux: any[] = [];
  public page: number = 1;
  public tamanoTabl = new FormControl("10");
  public filtrarTabla = new FormControl('');
  public mostrarTotales: boolean = true;
  public totales: any[];
  constructor(
    private agendaComercialService: AgendaComercialService,
    private _matDialog: MatDialog,
    private agendaReferenciaService: AgendaReferenciacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cambiarEstado(true);
    this.getAgendaComercial();
    this.getTotalesAgendaComercial();
  }




  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  private getAgendaComercial(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaComercialService.getAgendaDecision().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      Swal.close();
      if (res.status === 200) {
        this.datos = res.data;
        this.datosAux = res.data;
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
   * @description: abre el resumen
   */
     public goResumen(data: any): void {
      //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
      const { numeroSolicitud, identificacion } = data;
      this.router.navigate(['/credit-factory/agenda-decision/resumen/', numeroSolicitud, identificacion]);
    }

  /**
   * @description: Guarda el comentario para devolvee
   */
  public onComentario(data): void {
    const dialogRef = this._matDialog.open(FormDialogDevolverFabricaComponent, {
      width: '30%',
      data: {
        numeroSolicitud: data.numeroSolicitud,
        tipo:'C'
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
          tipo:'R'
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((res) => {

        this.getAgendaComercial();
        this.agendaComercialService.refrescarListado$.next({ estado: true });
        setTimeout(() => {
            location.reload();
        }, 1000);
      });
    }
  /**
   * @description: Obtiene el listado de agenda de comercial
   */
  private getTotalesAgendaComercial(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaComercialService.getTotalesAgendaDecision().pipe(
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
    return moment(date).format('hh:mm A')
  }

  /**
   *
   * @param estado
   */
  public cambiarEstado(estado) {
    this.mostrarTotales = estado;
  }

  filtrarTablaTotalesEvent(datos){
    this.datos = datos;
    }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}
