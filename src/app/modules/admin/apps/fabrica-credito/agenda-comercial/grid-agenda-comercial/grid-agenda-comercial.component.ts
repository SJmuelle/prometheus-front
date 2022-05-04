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
  public tamanoTabl = new FormControl("5");
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
    this.getTotalesAgendaCompletacion();
    this.cambiarEstado(true)
  }


  public cambiarEstado(estado) {
    this.mostrarTotales = estado;
  }

  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  private getAgendaComercial(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaComercialService.getAgendaComercial().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      Swal.close();
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
        console.log(res);
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
   * @description: Guarda el comentario para devolvee
   */
  public onComentario(data): void {
    //  debugger
    const dialogRef = this._matDialog.open(FormDialogDevolverFabricaComponent, {
      width: '30%',
      data: {
        numeroSolicitud: data.numeroSolicitud
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
  private getTotalesAgendaCompletacion(): void {
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




  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}
