import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendaComercialService } from 'app/core/services/agenda-comercial.service';
import { AgendaReferenciacionService } from 'app/core/services/agenda-referenciacion.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogDevolverFabricaComponent } from '../../../fabrica-credito/agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { FormDialogReprogramarComponent } from '../../../fabrica-credito/agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/tailwind';

@Component({
  selector: 'app-listado-pagadurias',
  templateUrl: './listado-pagadurias.component.html',
  styleUrls: ['./listado-pagadurias.component.scss']
})
export class ListadoPagaduriasComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  open: boolean = true;

  public unsubscribe$: Subject<any> = new Subject();
  public mostrar: boolean = true;
  public datos: any[] = [];
  public page: number = 1;
  public tamanoTabl = new FormControl("10");
  public filtrarTabla = new FormControl('');
  public mostrarTotales: boolean = true;
  public totales: any[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private agendaComercialService: AgendaComercialService,
    private _matDialog: MatDialog,
    private agendaReferenciaService: AgendaReferenciacionService,
    private _gestionPagaduriaService: GestionPagaduriaService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    
    private _changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    this.cambiarEstado(true);
    this.getAgendaComercial();

    // Subscribe to MatDrawer opened change
    this.matDrawer.openedChange.subscribe((opened) => {
      if (!opened) {
        // Remove the selected contact when drawer closed
        // this.selectedContact = null;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode if the given breakpoint is active
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
        }
        else {
          this.drawerMode = 'over';
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }


  /**
     * On backdrop clicked
     */
  onBackdropClicked(): void {
    this.open = false;
    this._changeDetectorRef.markForCheck();
  }

  mostrarDetalle() {
    this.open = true;
    this._changeDetectorRef.markForCheck();

  }
  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  private getAgendaComercial(): void {
    this._gestionPagaduriaService.getPagaduria().pipe(
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
   * @description: abre la agenda
   */
  public onGetAgenda(data: any): void {
    //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
    const { numeroSolicitud, identificacion } = data;
    this.router.navigate(['/pagaduria/agenda-pagaduria/detalleCreditoPagaduria', numeroSolicitud, identificacion]);
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

  detalle(pagaduria){
    this.router.navigate([`parametria/gestion-pagaduria/${pagaduria}`]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}