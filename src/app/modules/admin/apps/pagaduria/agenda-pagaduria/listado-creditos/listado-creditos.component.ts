import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendaComercialService } from 'app/core/services/agenda-comercial.service';
import { AgendaReferenciacionService } from 'app/core/services/agenda-referenciacion.service';
import { PermisosService } from 'app/core/services/permisos.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogDevolverFabricaComponent } from '../../../fabrica-credito/agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { FormDialogReprogramarComponent } from '../../../fabrica-credito/agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';

@Component({
  selector: 'app-listado-creditos',
  templateUrl: './listado-creditos.component.html',
  styleUrls: ['./listado-creditos.component.scss']
})
export class ListadoCreditosComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<any> = new Subject();
  public mostrar: boolean = true;
  public datos: any[] = [];
  public page: number = 1;
  public tamanoTabl = new FormControl("10");
  public filtrarTabla = new FormControl('');
  public mostrarTotales: boolean = true;
  public totales: any[];
  estadoPagaduria: any;

  constructor(private agendaComercialService: AgendaComercialService,
    private _matDialog: MatDialog,
    private agendaReferenciaService: AgendaReferenciacionService,
    private router: Router) { }

  ngOnInit(): void {
    this.cambiarEstado(true);
    this.getAgendaComercial('P');
    this.getTotalesAgendaComercial();
    localStorage.setItem('data', '')

  }




  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  public getAgendaComercial(estado): void {
    this.estadoPagaduria=estado;
    let dato = { "estadoPagaduria": estado }
    this.agendaComercialService.getAgendaPagaduria(dato).pipe(
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
   * @description: Obtiene el listado de agenda de completacion
  */
  public tabChanged(event): void {
    // console.log('Pestaña seleccionada:', );
    this.getAgendaComercial(event.tab._viewContainerRef._hostTNode.attrs[3])
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
        this.getAgendaComercial('P');
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
    this.router.navigate(['/pagaduria/agenda-pagaduria/detalleCreditoPagaduria', numeroSolicitud, identificacion, this.estadoPagaduria]);
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


      this.agendaComercialService.refrescarListado$.next({ estado: true });

    });
  }
  /**
   * @description: Obtiene el listado de agenda de comercial
   */
  private getTotalesAgendaComercial(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaComercialService.getTotalesAgendaComiteComercial().pipe(
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
      moment.locale('es');
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


  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}
