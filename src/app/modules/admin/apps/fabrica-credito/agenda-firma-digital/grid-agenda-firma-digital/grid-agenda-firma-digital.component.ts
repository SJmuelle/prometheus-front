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
import moment from 'moment';
import { PermisosService } from 'app/core/services/permisos.service';
import { FormDialogDevolverFabricaComponent } from '../../agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { AgendaFirmaService } from 'app/core/services/agenda-firma.service';

@Component({
  selector: 'app-grid-agenda-firma-digital',
  templateUrl: './grid-agenda-firma-digital.component.html',
  styleUrls: ['./grid-agenda-firma-digital.component.scss']
})
export class GridAgendaFirmaDigitalComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<any> = new Subject();
  public mostrar: boolean = true;
  public datos: any[] = [];
  public page: number = 1;
  public tamanoTabl = new FormControl("10");
  public filtrarTabla = new FormControl('');
  public mostrarTotales: boolean = true;
  public totales: any[];
  constructor(
    private agendaComercialService: AgendaComercialService,
    private _agendaFirma: AgendaFirmaService,
    private _matDialog: MatDialog,
    private router: Router,
    public _permisosService: PermisosService
  ) { }

  ngOnInit(): void {
    this.cambiarEstado(true);
    this.getAgendaFirmaDigital();
    this.getTotalesAgendaFirmaDigital();
  }




  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  private getAgendaFirmaDigital(): void {
    this.agendaComercialService.getAgendaFirmaDigital().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {

      if (res.status === 200) {
        this.datos = res.data;
        this.mostrar = false;

      } else {
      }
    });
  }


  public correoDecision(numeroSolicitud, tipo): void {
    let data =
    {
      numeroSolicitud: numeroSolicitud,
      tipo: tipo
    }
    this._agendaFirma.correoDecision(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      debugger
      if (res.status === 200) {


      } else {
      }
    });
  }

  public UpdateEstadoEvidente(numeroSolicitud, identificacion): void {
    let data =
    {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    }
    this._agendaFirma.UpdateEstadoEvidente(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      debugger
      if (res.status === 200) {


      } else {
      }
    });
  }

  public updateReenviarFirma(numeroSolicitud, identificacion): void {
    let data =
    {
      numeroSolicitud: numeroSolicitud,
    }
    this._agendaFirma.updateReenviarFirma(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      debugger
      if (res.status === 200) {


      } else {
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

      this.getAgendaFirmaDigital();
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

      this.getAgendaFirmaDigital();
      this.agendaComercialService.refrescarListado$.next({ estado: true });

    });
  }
  /**
   * @description: Obtiene el listado de agenda de comercial
   */
  private getTotalesAgendaFirmaDigital(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaComercialService.getTotalesAgendaFirmaDigital().pipe(
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


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
