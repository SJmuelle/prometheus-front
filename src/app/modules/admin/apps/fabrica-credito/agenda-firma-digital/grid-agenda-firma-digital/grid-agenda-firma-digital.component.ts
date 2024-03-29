import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AgendaComercialService } from '../../../../../../core/services/agenda-comercial.service';
import moment from 'moment';
import { PermisosService } from 'app/core/services/permisos.service';
import { FormDialogDevolverFabricaComponent } from '../../agenda-comercial/form-dialog-devolver-fabrica/form-dialog-devolver-fabrica.component';
import { AgendaFirmaService } from 'app/core/services/agenda-firma.service';
import { DecisionesService } from 'app/core/services/decisiones.service';
import { TablaEvidenteComponent } from '../tabla-evidente/tabla-evidente.component';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { ModalDetalleFirmaDigitalComponent } from '../modal-detalle-firma-digital/modal-detalle-firma-digital/modal-detalle-firma-digital.component';

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
  public page_number: number = 0
  public page_size: number = 10
  public filtrarTabla = new FormControl('');
  public mostrarTotales: boolean = true;
  public totales: any[];
  public opened: boolean = false;
  public dataDocuments: any[] = []
  public filtrado = 'P'
  public mode: string = "";
  public minuto: number = 0
  public porcentaje: number = 0
  public intervalVentaFima: any
  public intervalProgressBar: any
  public colorState: any = {
    Pendiente: 'bg-red-200 text-red-500',
    Enviados: 'bg-blue-200 text-blue-500',
    Firmados: 'bg-green-200 text-green-500',
  }
  public datacopy: any[] = []
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
    public dialog: MatDialog,
    public _permisosService: PermisosService,
    public _sweetAlertService: Sweetalert2Service
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
        this.datacopy = this.datos
        this.estados.forEach((item) => {
          const count = this.datos.filter(value => value.etapaFirma?.toUpperCase() === item.state?.charAt(0)?.toUpperCase())
          item.count = count.length
        })
        const filter = this.datacopy.filter((value) => value.etapaFirma?.toUpperCase() === this.filtrado?.toUpperCase())
        this.datos = [...filter]
        this.mostrar = false;
      }
    });
  }

  public openDetail(numeroSolicitud): void {
    this.mode = "Edit-info"
    this._agendaFirma.numeroSolicitud.next(numeroSolicitud)
    this.opened = true;
  }

  public openViewDocument(item: any): void {

    this._sweetAlertService.startLoading({});
    this._agendaFirma.numeroSolicitud.next(item.numeroSolicitud)

    this.mode = "View-document"
    const data = {
      id: item.idUnidadNegocio,
      negocio: item.numeroSolicitud
    }

    this._agendaFirma.verDocumentosFirmaDigital(data).subscribe({
      next: (resp) => {


        this.dataDocuments = resp?.data || []
        const valid: any[] = []
        this.dataDocuments.forEach((item) => {
          if (item.archivoCargado !== 'N') {
            valid.push({ ...item })
          }
        })

        this.dataDocuments = [...valid]

        setTimeout(() => {
          if (!valid.length) {
            this._sweetAlertService.alertInfo({ info: 'Lo sentimos, no se encontraron documentos en la consulta' });
          } else {
            this.opened = true;
          }

        }, 200);



      },
      error: (e) => {
        this._sweetAlertService.alertError();
      }
    })



  }



  public generarNumeroPagare(unidadNegocio, numeroSolicitud, tipo) {
    if (unidadNegocio == 22) {
      let data_pagare = {
        "numeroSolicitud": numeroSolicitud,
      }

      let datoComprobacion = {
        "numeroSolicitud": numeroSolicitud,
        "unidadNegocio": unidadNegocio,
        "tipoTercero": 'T'
      }
      Swal.fire({ title: 'Cargando', html: 'Enviando correo...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then(() => { });

      this._decisionesService.comprobacionCampos(datoComprobacion)
        .subscribe((res2) => {
          this.correoDecision(numeroSolicitud, tipo)
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


    Swal.fire({ title: 'Cargando', html: 'Enviando correo...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then(() => { });

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

  public UpdateEstadoEvidente(item, tipo = ''): void {

    let data =
    {
      // numeroSolicitud: item.numeroSolicitud,
      numeroSolicitud: 555555555,
      identificacion: item.identificacion
    }

    if (item.idUnidadNegocio === 32 && item.tipoDocumento === 'NIT') {

      data.identificacion = item.identificacionRepresentante
    }


    if (tipo === 'C') {
      data.identificacion = item.identificacionCodeudor
    }

    if (tipo === 'S') {

      data.identificacion = item.identificacionDeudor
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

  public obtenerIntentosEvidente(item, tipo = ''): void {
    let data =
    {
      identificacion: item.identificacion
    }

    if (item.idUnidadNegocio === 32 && item.tipoDocumento === 'NIT') {

      data.identificacion = item.identificacionRepresentante
    }

    if (tipo === 'C') {
      data.identificacion = item.identificacionCodeudor
    }

    if (tipo === 'S') {

      data.identificacion = item.identificacionDeudor
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
        const dialogRef = this.dialog.open(TablaEvidenteComponent,
          {
            maxWidth: '90vw',
            width: window.innerWidth < 600 ? '90%' : '60%',
            data: res.data,
            disableClose: false
          });
        dialogRef.afterClosed().subscribe(result => {
        });
      }
    });
  }

  public viewEvidente(row): void {

    this.loadingModal(row);
  }

  public loadingModal(valuesData): void {
    const dialogRef = this.dialog.open(ModalDetalleFirmaDigitalComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width: '30%',
        data: valuesData,
        disableClose: false
      })


  }


  public updateReenviarFirma(numeroSolicitud, tipo): void {
    let data =
    {
      numeroSolicitud: numeroSolicitud,

    }
    console.log('tipo', tipo);
    Swal.fire({ title: 'Cargando', html: 'Enviando correo...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._agendaFirma.updateReenviarFirma(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      if (res.status === 200) {
        Swal.close();
        if (res.data.firma_interna_reenviar) {
          this.correoDecision(numeroSolicitud, tipo)
          // Swal.fire({
          //   title: "Se reenvio con exito",
          //   html: `<p>Reenvio de firma con éxito</p>`,
          //   icon: 'success'
          // }).then(result => {
          //   if (result) {
          //     this.getAgendaFirmaDigital();
          //   }
          // })
          // setTimeout(() => {
          //   this.getAgendaFirmaDigital();
          // }, 3000);
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

    const filter = this.datacopy.filter((value) => value.etapaFirma?.toUpperCase() === this.filtrado?.toUpperCase())
    this.datos = [...filter]

    if (this.filtrado === "F") {

      this.intervalVentaFima = setInterval(() => {
        this.getAgendaFirmaDigital();
        this.minuto = 0;
      }, 30000);

      this.intervalProgressBar = setInterval(() => {
        this.minuto = this.minuto + 1;
        this.porcentaje = (this.minuto * 100) / 30;
      }, 1000);

    } else {
      this.porcentaje = 0;
      this.minuto = 0;
      clearInterval(this.intervalVentaFima);
      clearInterval(this.intervalProgressBar)
    }

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    clearInterval(this.intervalVentaFima);
    clearInterval(this.intervalProgressBar)

  }

}
