import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogCarteraComprarComponent } from '../form-dialog-cartera-comprar/form-dialog-cartera-comprar.component';
import { FormDialogCarteraComponent } from '../form-dialog-cartera/form-dialog-cartera.component';
import { FormDialogComentariosComponent } from '../form-dialog-comentarios/form-dialog-comentarios.component';
import { PermisosService } from 'app/core/services/permisos.service';

@Component({
  selector: 'app-grid-cartera-micro',
  templateUrl: './grid-cartera-micro.component.html',
  styleUrls: ['./grid-cartera-micro.component.scss']
})

export class GridCarteraMicroComponent implements OnInit {
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public permisoEditar:boolean=false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public listadoCartera$: Observable<any>;
  agenda_fabrica: any;
  // totales: any = {};
  totales: {
    contadorAlDia: number;
    contadorGestiones: number;
    contadorMora: number;
    sumaTotal: number;
    tipo: number;
    valorDisponible: number;
    valorRestante: number;
    valorSolicitado: number;
    verificacion: string;
  };
  informacionCompra: { idMostrar: number;  };

  externaTitularCartera: any[] = [];
  externaCodeudorCartera: any[] = [];
  externaSolidarioCartera: any[] = [];

  internoTitularCartera: any[] = [];
  internoCodeudorCartera: any[] = [];
  internoSolidarioCartera: any[] = [];
  // informacionCompra: any;

  constructor(private route: ActivatedRoute,
    private _dialog: MatDialog,
    private fabricaCreditoService: FabricaCreditoService,
    private _listadoCarteraService: ListadoCarteraService,
    public _permisosService: PermisosService


  ) {
    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion)

  }

  ngOnInit() {
    this.getListadoCartera(Number(this.numeroSolicitud));
    this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()

  }


  private getListadoCartera(numeroSolicitud: number): void {
    this.externaTitularCartera = [];
    this.externaCodeudorCartera = [];
    this.externaSolidarioCartera = [];
  
    this.internoTitularCartera = [];
    this.internoCodeudorCartera = [];
    this.internoSolidarioCartera = [];
    
    this._listadoCarteraService.getListadoCartera(numeroSolicitud).subscribe(data => {
      data.data.forEach(item => {
        switch(item.carteraInterna){
          case 'N':
            switch(item.tipoTercero){
              case 'T':
                if(item.alDia === 'f'){
                  this.externaTitularCartera.push(item);
                }else{
                  this.externaTitularCartera.unshift(item)
                }
              break;
              case 'C':
                if(item.alDia === 'f'){
                  this.externaCodeudorCartera.push(item)
                }else{
                  this.externaCodeudorCartera.unshift(item)
                }
              break;
              case 'S':
                if(item.alDia === 'f'){
                  this.externaSolidarioCartera.push(item);
                }else{
                  this.externaSolidarioCartera.unshift(item);
                }
              break;
            }
            break;
          case 'S':
            switch(item.tipoTercero){
              case 'T':
                if(item.alDia === 'f'){
                  this.internoTitularCartera.push(item);
                }else{
                  this.internoTitularCartera.unshift(item);
                }
              break;
              case 'C':
                if(item.alDia === 'f'){
                  this.internoCodeudorCartera.push(item)
                }else{
                  this.internoCodeudorCartera.unshift(item)
                }
              break;
              case 'S':
                if(item.alDia === 'f'){
                  this.internoSolidarioCartera.push(item);
                }else{
                  this.internoSolidarioCartera.unshift(item);
                }
              break;
            }
        }
      })
      console.log('interna Micro', this.internoTitularCartera);
      
    })

    this.validadorTotalLibranza();
  }

  public validadorTotalLibranza() {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
    }
    // ;
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._listadoCarteraService
      .validadorTotalLibranza(data)
      .subscribe((res) => {
        Swal.close();
        
        this.totales = res.data

      });

  }

  public liquidacionSaldos(item){
    console.log('item', item);
    
    const data = {
      numeroSolicitud: item.numeroSolicitud,
      codigoNegocio: item.numeroCuenta,
      idObligacion: item.id,
      gestionCartera: item.gestionCartera,
    }
    console.log('data',data);
    
    // this._listadoCarteraService.agregarLiquidacionSaldos(item).pipe(takeUntil(this._unsubscribeAll)).subscribe(rep => {

    // })
  }

  public cambioEstado(event, item) {

    if (event == 'COM') {
      this.editarCartera(item, 'N');
      return;
    }

    let data = {
      id: item.id,
      numeroSolicitud: Number(this.numeroSolicitud),
      gestionCartera: event
    }
    // ;
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._listadoCarteraService
      .updateCartera(data)
      .subscribe((res) => {
        Swal.close();

        if (res.data.respuesta == 'OK') {
          // Swal.fire('Completado', 'A', 'success');
          this.getListadoCartera(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });

  }

  /**
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe()
      .subscribe(({ data }) => {
        Swal.close();
        this.agenda_fabrica = data;
      })
  }
  public createCartera(tipo): void {
    const dialogRef = this._dialog.open(FormDialogCarteraComponent, {
      minWidth: '30%',
      minHeight: '30%',
      data: {
        numeroSolicitud: Number(this.numeroSolicitud),
        identificacion: Number(this.identificacion),
        tipo: tipo,
        item: null
      }
    });
    dialogRef.afterClosed().toPromise().then((res) => {
      this.getListadoCartera(Number(this.numeroSolicitud));
    });
  }
  public editarCartera(item, tipo): void {
    const dialogRef = this._dialog.open(FormDialogCarteraComprarComponent, {
      minWidth: '40%',
      minHeight: '40%',
      data: {
        numeroSolicitud: Number(this.numeroSolicitud),
        identificacion: Number(this.identificacion),
        tipo: tipo,
        item: item
      }
    });
    dialogRef.afterClosed().toPromise().then((res) => {
      this.getListadoCartera(Number(this.numeroSolicitud));
    });
  }

  public pasar_negociar() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: Number(this.numeroSolicitud),
    };
    this._listadoCarteraService.pasarAgenda(datosSolicitud).pipe()
      .subscribe(({ data }) => {
        Swal.close();
        if (data.verificacion == "OK") {
          Swal.fire('Completado', 'Registro actualizado con exito', 'success');
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          Swal.fire('Error', data.verificacion, 'error');
        }
      })
  }

  public buscandoDatosCompra(item) {


    this._listadoCarteraService.getListadoCarteraDetalleCompra(Number(this.numeroSolicitud), Number(item.idPadre)).subscribe((res) => {

      this.informacionCompra=res.data;
      return res.data;
    });
  }


  public transformTipoTercero(tipo: string){
    switch(tipo){
      case 'T':
      return 'Titular'
      case 'C':
      return 'Codeudor'
      case 'S':
      return 'Dedudor solidario'
      case 'R':
        return 'Representante'
    }
  }

      /**
     * On destroy
     */
      ngOnDestroy(): void
      {
          // Unsubscribe from all subscriptions
          this._unsubscribeAll.next();
          this._unsubscribeAll.complete();
      }
}
