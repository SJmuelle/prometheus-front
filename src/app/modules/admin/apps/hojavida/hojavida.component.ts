import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalIngresoComponent } from 'app/components/hojadevida/modal-ingreso/modal-ingreso.component';
import { ModalcarteraComponent } from 'app/components/hojadevida/modalcartera/modalcartera.component';
import { ModalcreditoComponent } from 'app/components/hojadevida/modalcredito/modalcredito.component';
import { CarteraService } from 'app/resources/services/hojadevida/cartera/cartera.service';
import { CreditoService } from 'app/resources/services/hojadevida/credito/credito.service';
import { HistorialGestionService } from 'app/resources/services/hojadevida/historial-gestion.service';
import { HojadevidaService } from 'app/resources/services/hojadevida/hojadevida.service';
import { NegociacionesService } from 'app/resources/services/hojadevida/negociaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hojavida',
  templateUrl: './hojavida.component.html',
  styleUrls: ['./hojavida.component.scss']
})
export class HojavidaComponent implements OnInit {
  listCodigoNegocio: any;
  info_cliente: any;
  mostrarDatoCliente: boolean;
  listadoCredito: any;
  filtrarTabla: string;
  filtrarTablaCartera: any;
  filtrarTablaHN: any;
  ListadoCartera: any = [];
  listadoNegociaciones: any = [];
  listaHistoria: any = [];
  listadoExtractos: any = [];
  tab: any;
  listadoReporteCentrales: any = [];
  codigoNegocio2: any;
  tamanoTablaHG: number;
  filtrarTablaHG: string;
  tamanoTablaNeg: number;
  filtrarTablaNeg: string;
  filtrarTablaExt: string;
  tamanoTablaExt: number;
  filtrarReporteC: string;
  tamanoTablaRC: number;
  btnBuscar: boolean;


  constructor(private _hojadevidaService: HojadevidaService,
    private _creditoService: CreditoService,
    public dialog: MatDialog,
    private _carteraService: CarteraService,
    private _historialService: HistorialGestionService,
    private _negociacionesService: NegociacionesService) { }

  busqueda: string;
  clienteID: number;
  codigoNegocio: string;
  ngOnInit(): void {
    this.mostrarDatoCliente = false;
    this.filtrarTabla = "";
    this.tab = 0;
    this.btnBuscar = false;
    // const dialogRef = this.dialog.open(ModalIngresoComponent, {
    //   // width: '1080px',
    //   // maxHeight: '550px',
    //   data: { codigoNegocio: '64695384' },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    // });
  }

  getListadoCredito() {

    this._hojadevidaService
      .getNegocios(this.clienteID)
      .subscribe((res1: any) => {
        this.listCodigoNegocio = res1.data;
      });
  }

  buscarClientes() {
  
    if (this.busqueda == "1") {
      if (this.clienteID == null || this.clienteID == undefined || this.clienteID == 0) {
        Swal.fire(
          '¡Advertencia!',
          'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
          'error'
        );
        return;
      }
      this.btnBuscar = true;
      if (this.codigoNegocio2 == null || this.codigoNegocio2 == undefined || this.codigoNegocio2.length == 0) {
        this.codigoNegocio = this.clienteID + '';
      } else {
        this.codigoNegocio = this.codigoNegocio2
      }
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      this._hojadevidaService
        .getInfoCliente(this.codigoNegocio)
        .subscribe((res2: any) => {
          this.btnBuscar = false;
          if (res2.status == 202) {
            Swal.fire(
              '¡Advertencia!',
              `${this.busqueda == "2" ? 'El código del negocio ' : 'El documento '} ingresado no corresponde a ningún registro guardado. Favor verificar`,
              'error'
            );
            this.info_cliente = {};
            this.mostrarDatoCliente = false;
            return
          } else {
            this.info_cliente = res2.data;
            this.mostrarDatoCliente = true;
            this.onTabChanged(this.tab);
          }

        });
    } else {
      if (this.codigoNegocio == null || this.codigoNegocio == undefined || this.codigoNegocio.length == 0) {
        Swal.fire(
          '¡Advertencia!',
          'Para este tipo de búsqueda, mínimo es necesario el código negocio',
          'error'
        );
        return;
      }
      this._hojadevidaService
        .getInfoCliente(this.codigoNegocio)
        .subscribe((res2: any) => {
          this.info_cliente = res2.data;
          this.mostrarDatoCliente = true;
          this.onTabChanged(this.tab);
        });
    }
  }
  limpiar() {
    this.busqueda = null;
    this.clienteID = null;
    this.codigoNegocio = null;
    this.listadoExtractos = [];
  }

  // SUBSCRIBES
  getCreditoData() {

  }



  onTabChanged(index): void {
    this.btnBuscar = false;
    this.tab = index;
    switch (index) {
      case 0:
        Swal.fire({ title: 'Cargando', html: 'Buscando información de Credito', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this.listadoCredito = [];
        // SERVICIO DE LA PESTAÑA DEL CREDITO
        this._creditoService
          .getCredito(this.codigoNegocio)
          .subscribe((respCredito: any) => {
            Swal.close();
            if (respCredito.data) {
              this.listadoCredito = respCredito.data;
            } else {
              this.listadoCredito = [];
            }
          });
        break;
      case 1:
        Swal.fire({ title: 'Cargando', html: 'Buscando información de Cartera', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._carteraService
          .getCartera(this.info_cliente.identificacion, this.codigoNegocio)
          .subscribe((respCartera: any) => {
            console.log(respCartera);
            Swal.close();
            if (respCartera.data) {
              this.ListadoCartera = respCartera.data;
            } else {
              this.ListadoCartera = [];
            }
          });
        break;
      case 2:
        this.filtrarTablaHG = "";
        this.tamanoTablaHG = 5;
        Swal.fire({ title: 'Cargando', html: 'Buscando información de historial de gestión', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._historialService
          .getHistorialGestion(this.codigoNegocio)
          .subscribe((response: any) => {
            Swal.close();
            if (response.data) {
              this.listaHistoria = response.data;
            } else {
              this.listaHistoria = [];
            }
          });
        break;
      case 3:
        this.filtrarTablaNeg = "";
        this.tamanoTablaNeg = 5;
        Swal.fire({ title: 'Cargando', html: 'Buscando información de negociaciones', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._negociacionesService
          .getNegociaciones(this.codigoNegocio)
          .subscribe((response: any) => {
            // this.listadoNegociaciones = response.data;
            Swal.close();
            if (response.data) {
            
              this.listadoNegociaciones = response.data;
            } else {
              this.listadoNegociaciones = [];
            }
          });
        break;
      case 4:
        this.filtrarTablaExt = "";
        this.tamanoTablaExt = 5;
        Swal.fire({ title: 'Cargando', html: 'Buscando Historial de extractos', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._negociacionesService
          .getInformacionExtractos(this.codigoNegocio)
          .subscribe((response: any) => {
            // this.listadoExtractos = response.data;
            Swal.close();
            if (response.data) {
           
              this.listadoExtractos = response.data;
            } else {
              this.listadoExtractos = [];
            }
          });
        break;
      case 5:
        this.filtrarReporteC = "";
        this.tamanoTablaRC = 5;
        Swal.fire({ title: 'Cargando', html: 'Buscando información de reporte de las centrales', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._negociacionesService
          .getReporteCentrales(this.codigoNegocio)
          .subscribe((response: any) => {
            // this.listadoReporteCentrales = response.data;
            Swal.close();
            if (response.data) {
              
              this.listadoReporteCentrales = response.data;
            } else {
              this.listadoReporteCentrales = [];
            }
          });
        break;
      default:
        break;
    }
  }

  openDialogCredito(codigoNegocio): void {
    
    const dialogRef = this.dialog.open(ModalcreditoComponent, {
      // mixWidth: '480px',
      // mixHeight: '550px',
      data: { codigoNegocio },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  openDialogCartera(index, saldo,id): void {
    if(saldo==0){
      Swal.fire(
        '¡Información!',
        `El credito no tienen detalle`,
        'success'
      );
      return;
    }
    const dialogRef = this.dialog.open(ModalcarteraComponent, {
      // width: '1080px',
      // maxHeight: '550px',
      data: { codigoNegocio: index, ideNegocio:id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openDialogIngreso(index): void {
    const dialogRef = this.dialog.open(ModalIngresoComponent, {
      // width: '1080px',
      // maxHeight: '550px',
      data: { codigoNegocio: index, NombreCliente: `${this.info_cliente.primerNombre} ${this.info_cliente.segundoNombre} ${this.info_cliente.primerApellido} ${this.info_cliente.segundoApellido}` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  mostrar_mensaje(titulo, mensaje) {
    if (mensaje == undefined) {
      return '';
    }
    let first = mensaje.substr(0, 1).toUpperCase();
    mensaje = first + mensaje.substr(1);
    Swal.fire(
      titulo,
      mensaje,
    );
  }
  buscar_url(codigo) {
    Swal.fire({ title: 'Cargando', html: 'Buscando plan de pago', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._carteraService
      .getPlanPago(codigo)
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        Swal.close();
        if (respuesta.data) {
          // respuesta.data="http://prometheus.fintra.co:8094/fintra/exportar/migracion/119236/f_plan_de_pagos.pdf";
          window.open(respuesta.data, 'Plan de pago', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=300,height=200,left = 390,top = 50');
        } else {
          Swal.fire(
            '¡Advertencia!',
            'Este crédito no tiene plan de pago',
            'error'
          );
        }
      });
  }
  busacar_url2(url) {

    
    window.open(url, 'Plan de pago', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=300,height=200,left = 390,top = 50');

  }

}
