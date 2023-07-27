import { NgSwitch } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import { values } from 'lodash';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalActualizarClienteComponent } from '../modal-actualizar-cliente/modal-actualizar-cliente/modal-actualizar-cliente.component';
import { ModalDetailsCarteraClienteComponent } from '../modal-details-cartera-cliente/modal-details-cartera-cliente/modal-details-cartera-cliente.component';
import moment from 'moment'
@Component({
  selector: 'app-seguimiento-cartera-cliente',
  templateUrl: './seguimiento-cartera-cliente.component.html',
  styleUrls: ['./seguimiento-cartera-cliente.component.scss']
})
export class SeguimientoCarteraClienteComponent implements OnInit, OnDestroy {
  public infoTitulo: IinfoTitulo = { titulo: 'Seguimiento cartera clientes', subtitulo: 'Realiza los seguimientos a la cartera de los clientes' }
  public dataRows: any[] = []
  public formSearch: FormGroup;
  public openSearch: boolean = true
  public unidadesNegocio: any[] = []
  public periodosFotos: any[] = []
  public optionsTable: IoptionTable[] = [
    {
      name: 'Opciones',
      text: 'Opciones',
      typeField: 'mat-menu',
      MenuFunctions: [
        {
          nameFunction: 'Visualizar',
          iconFuseTemplate: 'search',
          children: true,
          arrayChildren: {
            nameChildren: 'indexMatMenu1', values: [
              {
                nameFunction: 'Detalle cartera',
                callback: (data) => {
                  this.openDialog('detalleCartera', data)
                },
                iconFuseTemplate: 'search',
                children: false
              },
              {
                nameFunction: 'Visualizar pagos',
                callback: (data) => {
                  this.openDialog('visualizarPagos', data)
                },
                iconFuseTemplate: 'search',
                children: false
              }, {
                nameFunction: 'Visualizar gestiones',
                callback: (data) => {
                  this.openDialog('visualizarGestiones', data)
                },
                iconFuseTemplate: 'search',
                children: false
              }, {
                nameFunction: 'Visualizar Compromisos de pago',
                callback: (data) => {
                  this.openDialog('visualizarCompromisosPago', data)
                },
                iconFuseTemplate: 'search',
                children: false
              }]
          }
        },
        // {
        //   nameFunction: 'Estado cuenta Geotech',
        //   callback: (data) => {
        //     this.openDialog('estadoCuentaGeotech', data)
        //   },
        //   iconFuseTemplate: 'search',
        //   children: false
        // },
        {
          nameFunction: 'Agregar gestiones',
          callback: (data) => {
            this.openDialog('agregarGestiones', data)
          },
          iconFuseTemplate: 'search',
          children: false
        },
        {
          nameFunction: 'Editar información',
          callback: (data) => {
            this.openDialog('editarInformacion', data)
          },
          iconFuseTemplate: 'search',
          children: false
        },

      ]
    },
    {
      name: 'cedula',
      text: 'Cedula',
      typeField: 'text',
    },
    {
      name: 'nombreCliente',
      text: 'Cliente',
      typeField: 'text',
    },
    {
      name: 'direccion',
      text: 'Dirección',
      typeField: 'text',
    },
    {
      name: 'barrio',
      text: 'Barrio',
      typeField: 'text',
    },
    {
      name: 'ciudad',
      text: 'Ciudad',
      typeField: 'text',
    },
    {
      name: 'telcontacto',
      text: 'Telefono',
      typeField: 'text',
    },
    {
      name: 'telefono',
      text: 'Celular',
      typeField: 'text',
    },
    {
      name: 'negocio',
      text: 'Negocio',
      typeField: 'text',
    },
    {
      name: 'nombreConvenio',
      text: 'U. Negocio',
      typeField: 'text',
    },
    {
      name: 'vencimientoMayor',
      text: 'Vencimiento mayor',
      typeField: 'text',
    },
    {
      name: 'Dia de pago',
      text: 'Dia de pago',
      typeField: 'text',
    },
    {
      name: 'Valor saldo',
      text: 'Valor saldo',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'debidoCobrar',
      text: 'Debido cobrar',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'recaudosxCuota',
      text: 'Recaudo',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'cumplimiento',
      text: '% cumplimiento',
      typeField: 'text',
      pipeName: 'percentage'
    },
    {
      name: 'valoraPagar',
      text: 'Valor a pagar',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'fechaultCompromiso',
      text: 'Fecha ultimo compromiso',
      typeField: 'text',
    },
    {
      name: 'reestructuracion',
      text: 'Reest',
      typeField: 'text',
    },
    {
      name: 'juridica',
      text: 'Juridico',
      typeField: 'text',
    },
    {
      name: 'agente',
      text: 'Negociación',
      typeField: 'text',
    },
  ]
  private unsuscribe$: Subject<any> = new Subject<any>();
  constructor(
    private _carteraClienteServices: CarteraClientesService,
    private fb: FormBuilder,
    private _sweetAlerService: Sweetalert2Service,
    private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.unsuscribe$.next(null);
    this.unsuscribe$.complete();
  }

  ngOnInit(): void {
    this.loadsearch()
    this.formSearchBuilder();
  }

  public openDialog(viewModal: string, dataRow: any): void {
    this._sweetAlerService.startLoading({});

    const { periodo, unidadNegocio } = this.formSearch.getRawValue();

    switch (viewModal) {
      case 'detalleCartera':
        const detalleCartera = {
          periodo: periodo,
          unidadNegocio: unidadNegocio,
          negocio: dataRow.negocio
        }
        this._carteraClienteServices.cargarClienteCartera(detalleCartera).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (res) => {
            this._sweetAlerService.stopLoading();
            const valuesData = res.data
            this.loadingModal({ viewModal, valuesData });
          },
          error: (e) => {
            this._sweetAlerService.alertError();

          }
        })
        break;
      case 'visualizarPagos':
        const data = {
          ...dataRow,
          periodo
        }
        this._carteraClienteServices.dataCliente$.next(data)



        const visualizarPagos = {
          periodo,
          negocio: dataRow.negocio
        }
        this._carteraClienteServices.verPagosClientes(visualizarPagos).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (res) => {
            this._sweetAlerService.stopLoading();
            const valuesData = res.data
            this.loadingModal({ viewModal, valuesData });

          },
          error: (e) => {
            this._sweetAlerService.alertError();
          }
        })

        break
      case 'visualizarGestiones':
        const visualizarGestiones = dataRow.negocio
        this._carteraClienteServices.verGestionesCliente(visualizarGestiones).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            if (!!resp.data.length) {
              this._sweetAlerService.stopLoading();
              const valuesData = resp.data
              this.loadingModal({ viewModal, valuesData, });
            } else {
              this._sweetAlerService.alertInfo({});
            }
          },
          error: (e) => {
            this._sweetAlerService.alertError();
          }
        })
        break
      case 'visualizarCompromisosPago':
        const visualizarCompromisosPago = dataRow.negocio
        this._carteraClienteServices.verCompromisosPagos(visualizarCompromisosPago).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this._sweetAlerService.stopLoading();
            const valuesData = resp.data
            this.loadingModal({ viewModal, valuesData, });
          },
          error: (e) => {
            this._sweetAlerService.alertError();
          }
        })

        break;
      case 'estadoCuentaGeotech':
        this._sweetAlerService.stopLoading();
        break;
      case 'agregarGestiones':
        setTimeout(() => {
          this._sweetAlerService.stopLoading();
          const valuesData = dataRow
          const width = '50%'
          this.loadingModal({ viewModal, valuesData, width });
        }, 400);
        break;
      case 'editarInformacion':
        setTimeout(() => {
          const { cedula, negocio } = dataRow
          this._carteraClienteServices.verInformacionCliente(cedula).pipe(takeUntil(this.unsuscribe$)).subscribe({
            next: (resp) => {
              this._sweetAlerService.stopLoading();
              const valuesData = { ...resp?.data, cedula, negocio }
              const width = '50%'
              this.modalUpdateClient({ viewModal, valuesData, width });
            },
            error: (e) => {
              this._sweetAlerService.alertError();
            }
          })

        }, 400);
        break;
      default:
        this._sweetAlerService.stopLoading();
        break

    }






  }

  public loadingModal({ viewModal, valuesData, width = '80%' }): void {
    const dialogRef = this.dialog.open(ModalDetailsCarteraClienteComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width,
        data: { viewModal, valuesData },
        disableClose: false
      })


  }

  public modalUpdateClient({ viewModal, valuesData, width = '80%' }): void {
    const dialogRef = this.dialog.open(ModalActualizarClienteComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width,
        data: { viewModal, valuesData },
        disableClose: false
      })


  }

  public loadsearch(): void {
    this._carteraClienteServices.listarUnidadNEgocio().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.unidadesNegocio = resp?.data || []

      },
      error: (e) => {
        console.log(e)
      }
    })

    this._carteraClienteServices.listarPeriodosFotos().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.periodosFotos = resp?.data || []
        this.formSearch.controls['periodo'].setValue(resp?.data[0].id)
      },
      error: (e) => {
        console.log(e)
      }
    })


  }




  public searchClient(): void {
    this._sweetAlerService.startLoading({});

    const { periodo, unidadNegocio, identificacion, ...values } = this.formSearch.getRawValue();



    const data = {
      periodo,
      unidadNegocio,
      identificacion,
      details: [
        { estadoCartera: values.alDia ? 'Al Dia' : '' },
        { estadoCartera: values.porVencer ? 'A Vencer' : '' },
        { estadoCartera: values.vencido ? 'Vencido' : '' }
      ]
    }

    //PRUEBA
    // this._sweetAlerService.stopLoading();
    // this.dataRows = [{ cedula: '104736' }, { cedula: '104755' }, { cedula: '104766' }]
    // this.openSearch = false

    this._carteraClienteServices.buscarClienteCartera(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        if (!resp.data.length) {
          this._sweetAlerService.alertInfo({});
          this.dataRows = []

        } else {
          this.openSearch = false
          this._sweetAlerService.stopLoading();
          this.dataRows = resp?.data || []
        }

      },
      error: (e) => {
        this._sweetAlerService.alertError();
        console.log(e)
      }
    })


  }

  private formSearchBuilder(): void {
    const pattern = `^[0-9]+$`
    this.formSearch = this.fb.group({
      periodo: [, [Validators.required]],
      unidadNegocio: [''],
      identificacion: [, [Validators.required, Validators.pattern(pattern)]],
      alDia: [false],
      porVencer: [true],
      vencido: [true]
    })
  }

}
