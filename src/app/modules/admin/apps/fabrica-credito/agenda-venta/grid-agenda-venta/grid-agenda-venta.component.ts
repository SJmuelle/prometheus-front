import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendaComercialService } from 'app/core/services/agenda-comercial.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogDevolverFabricaComponent } from '../../agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { FormDialogReprogramarComponent } from '../../agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';
import { AgendaVentaService } from 'app/core/services/agenda-venta.service';

@Component({
  selector: 'app-grid-agenda-venta',
  templateUrl: './grid-agenda-venta.component.html',
  styleUrls: ['./grid-agenda-venta.component.scss']
})
export class GridAgendaVentaComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<any> = new Subject();
  public mostrar: boolean = true;
  public datos: any[] = [];
  public page: number = 1;
  public tamanoTabl = new FormControl("10");
  public filtrarTabla = new FormControl('');
  public mostrarTotales: boolean = true;
  public totales: any[];
  minuto=0;
  porcentaje: number;
  constructor(
    private _agendaVentaService: AgendaVentaService,
    // private agendaCarteraService: AgendaCarteraService,
    private _matDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cambiarEstado(true);
    this.getAgenda();

    setInterval(() => {
      // this.getAgenda();
      this.minuto=0;
    }, 30000);

    setInterval(() => {
      this.minuto=this.minuto+1;
      this.porcentaje=(this.minuto * 100) / 30;
     //si el 30 es el 100% cuanto es valor de x, cuanto porcentaje seria el 10
    }, 1000);

    //contador
  }




  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  private getAgenda(): void {
    // Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._agendaVentaService.getAgendaVenta().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      // Swal.close();
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
    this.router.navigate(['/credit-factory/formularios/microcredito']);
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
      return moment(date).format('H:MM a')
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




