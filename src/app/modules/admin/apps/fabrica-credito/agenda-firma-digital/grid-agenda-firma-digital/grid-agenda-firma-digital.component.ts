import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AgendaComercialService } from '../../../../../../core/services/agenda-comercial.service';
import moment from 'moment';
import { PermisosService } from 'app/core/services/permisos.service';
import { FormDialogDevolverFabricaComponent } from '../../agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { AgendaFirmaService } from 'app/core/services/agenda-firma.service';
import { DecisionesService } from 'app/core/services/decisiones.service';

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
  public opened: boolean = false;
  public filtrado = 'P'
  public colorState: any = {
    Pendiente: 'bg-red-200 text-red-500',
    Enviados: 'bg-blue-200 text-blue-500',
    Firmados: 'bg-green-200 text-green-500',
  }
  public activeFilter: any = { color: 'bg-red-200 text-red-500', active: 'Pendiente' };
  public estados: any[] = [{ state: 'Pendiente', count: 0, colorCheck: 'red' }, { state: 'Enviados', count: 0, colorCheck: 'blue' },
  { state: 'Firmados', count: 0, colorCheck: 'green' }]
  public activeAll: boolean = false;
  constructor(
    private agendaComercialService: AgendaComercialService,
    private _agendaFirma: AgendaFirmaService,
    private _matDialog: MatDialog,
    private router: Router,
    public _decisionesService: DecisionesService,
    public _permisosService: PermisosService,
  ) {



  }

  ngOnInit(): void {
    this.getTotalesAgendaFirmaDigital();
    this.getAgendaFirmaDigital();
    this.cambiarEstado(true);

    this._agendaFirma.openDrawner$.subscribe((opened) => {
      this.opened = opened;
      this.getAgendaFirmaDigital();
    })
  }




  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  private getAgendaFirmaDigital(): void {
    this.agendaComercialService.getAgendaFirmaDigital().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {

      if (res.status === 200) {
        Swal.close();
        this.datos = res?.data || [];
        this.estados.forEach((item) => {
          const count = this.datos.filter(value => value.etapaFirma === item.state?.charAt(0))
          item.count = count.length
        })
        this.mostrar = false;
      }
    });
  }

  public openDetail(numeroSolicitud): void {
    this._agendaFirma.numeroSolicitud.next(numeroSolicitud)
    this.opened = true;
  }



  public generarNumeroPagare(unidadNegocio,numeroSolicitud, tipo) {
    if (unidadNegocio == 22) {
      let data_pagare = {
        "numeroSolicitud": numeroSolicitud,
      }
      this._decisionesService.generarNumeroPagare(data_pagare)
        .subscribe((res2) => {
          let datoComprobacion = {
            "numeroSolicitud": numeroSolicitud,
            "unidadNegocio": unidadNegocio,
            "tipoTercero": 'T'
          }
          this._decisionesService.comprobacionCampos(datoComprobacion)
            .subscribe((res2) => {
              this.correoDecision(numeroSolicitud, tipo)
            })
        })
    } else {
      this.correoDecision(numeroSolicitud, tipo)
    }
  }

  public correoDecision(numeroSolicitud, tipo): void {

    let data =
    {
      numeroSolicitud: numeroSolicitud,
      tipo: tipo
    }


    Swal.fire({ title: 'Cargando', html: 'Enviado correo...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then(() => { });

    this._agendaFirma.correoDecision(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      Swal.close();
      if (res.status === 200) {
        if (res.data.status == 200) {
          Swal.fire({
            title: res.data.data.title,
            html: `<p>${res.data.data.body} <strong>${res.data.data.value}</strong> </p>`,
            icon: 'success'
          }).then(result => {
            if (result) {
              this.getAgendaFirmaDigital();
            }
          })
        }
        setTimeout(() => {
          this.getAgendaFirmaDigital();
        }, 3000);

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
    Swal.fire({ title: 'Cargando', html: 'Actualizando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then(() => { });
    this._agendaFirma.UpdateEstadoEvidente(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      Swal.close();
      if (res.status === 200) {
        if (res.data.respuesta == 'OK') {
          Swal.fire({
            title: "Realizado",
            html: `Estado evidente cambiado con éxito`,
            icon: 'success'
          }).then(result => {
            if (result) {
              this.getAgendaFirmaDigital();
            }
          })
          setTimeout(() => {
            this.getAgendaFirmaDigital();
          }, 3000);
        }

      } else {
      }
    });
  }

  public obtenerIntentosEvidente(identificacion): void {
    let data =
    {
      identificacion: identificacion
    }
    Swal.fire({ title: 'Cargando', html: 'Actualizando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then(() => { });
    this._agendaFirma.obtenerIntentosEvidente(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      Swal.close();
      if (res.data.length == 0) {
        Swal.fire({
          title: "Mensaje",
          html: `No tiene intentos de evidente que mostrar`,
          icon: 'warning'
        }).then(result => {
          if (result) {
          }
        })
      } else {
      }
    });
  }

  public updateReenviarFirma(numeroSolicitud): void {
    let data =
    {
      numeroSolicitud: numeroSolicitud,
    }
    Swal.fire({ title: 'Cargando', html: 'Enviando correo...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._agendaFirma.updateReenviarFirma(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      if (res.status === 200) {
        Swal.close();
        if (res.data.firma_interna_reenviar) {
          Swal.fire({
            title: "Se reenvio con exito",
            html: `<p>Reenvio de firma con éxito</p>`,
            icon: 'success'
          }).then(result => {
            if (result) {
              this.getAgendaFirmaDigital();
            }
          })
          setTimeout(() => {
            this.getAgendaFirmaDigital();
          }, 3000);
        }

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
    // Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaComercialService.getTotalesAgendaFirmaDigital().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      if (res.status === 200) {
        this.totales = res?.data || [];
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

  public selectFilter(value: string): void {
    this.activeFilter = { color: this.colorState[value], active: value }
    this.filtrado = value?.charAt(0)
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
