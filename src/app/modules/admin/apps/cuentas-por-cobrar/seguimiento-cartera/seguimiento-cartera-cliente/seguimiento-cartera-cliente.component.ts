import { NgSwitch } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import { Subject, Subscription } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { ModalActualizarClienteComponent } from '../modal-actualizar-cliente/modal-actualizar-cliente/modal-actualizar-cliente.component';
import { ModalDetailsCarteraClienteComponent } from '../modal-details-cartera-cliente/modal-details-cartera-cliente/modal-details-cartera-cliente.component';
import { ModalSelectViewClienteComponent } from '../modal-selectView-cliente/modal-select-view-cliente.component';
import { AplicarPagosCarteraClienteComponent } from './aplicar-pagos-cartera-cliente/aplicar-pagos-cartera-cliente/aplicar-pagos-cartera-cliente.component';

@Component({
  selector: 'app-seguimiento-cartera-cliente',
  templateUrl: './seguimiento-cartera-cliente.component.html',
  styleUrls: ['./seguimiento-cartera-cliente.component.scss']
})
export class SeguimientoCarteraClienteComponent implements OnInit, OnDestroy {
  public infoTitulo: IinfoTitulo = { titulo: 'Seguimiento cartera clientes', subtitulo: 'Realiza los seguimientos a la cartera de los clientes' }
  public dataRows: any[] = []
  public ArrayDataTables: any[] = []
  public formSearch: FormGroup;
  public tittleFilter: string = 'Filtros'
  public openSearch: boolean = true
  public unidadesNegocio: any[] = []
  public periodosFotos: any[] = []
  public allData: any[] = null
  public opened: boolean = false
  public viewMode: any = { display: false, tab: false }
  public subcriptionTwo$: Subscription = new Subscription();
  public optionsTable: IoptionTable[] = [
    {
      name: 'Opciones',
      text: '',
      typeField: 'mat-menu',
      MenuFunctions: [
        {
          nameFunction: 'Visualizar',
          iconAngularMaterial: 'remove_red_eye',
          children: true,
          arrayChildren: {
            nameChildren: 'indexMatMenu1', values: [
              {
                nameFunction: 'Detalle cartera',
                callback: (data) => {
                  this.openDialog('detalleCartera', data)
                },
                iconAngularMaterial: 'vertical_split',
                children: false
              },
              {
                nameFunction: 'Pagos',
                callback: (data) => {
                  this.openDialog('visualizarPagos', data)
                },
                iconAngularMaterial: 'credit_card',
                children: false
              }, {
                nameFunction: 'Gestiones',
                callback: (data) => {
                  this.openDialog('visualizarGestiones', data)
                },
                iconAngularMaterial: 'query_builder',
                children: false
              }, {
                nameFunction: 'Compromisos de pago',
                callback: (data) => {
                  this.openDialog('visualizarCompromisosPago', data)
                },
                iconAngularMaterial: 'timeline',
                children: false
              },
              {
                nameFunction: 'Pantalla dividida',
                callback: (data) => {
                  const searchValues = this.formSearch.getRawValue();
                  const estados = this.estadosCartera.value
                  const dataValues = {
                    ...searchValues,
                    ...data,
                    estados
                  }
                  // this.allData = { ...dataValues }
                  this._carteraClienteServices.saveSearch({ ...dataValues });

                  this.dialog.open(ModalSelectViewClienteComponent, {})
                },
                iconAngularMaterial: 'chrome_reader_mode',
                children: false
              }
            ]
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
          iconAngularMaterial: 'next_week',
          children: false
        },
        {
          nameFunction: 'Editar información',
          callback: (data) => {
            this.openDialog('editarInformacion', data)
          },
          iconAngularMaterial: 'edit',
          children: false
        },
        // {
        //   nameFunction: 'Aplicar pagos',
        //   callback: (data) => {
        //     this.dialog.open(AplicarPagosCarteraClienteComponent, {
        //       data
        //     })
        //   },
        //   iconAngularMaterial: 'playlist_add_check',
        //   children: false
        // }

      ]
    },
    {
      name: 'cedula',
      text: 'Cédula',
      typeField: 'text',
      classTailwind: 'whitespace-pre',
      view: false
    },
    {
      name: 'nombreCliente',
      text: 'Cliente',
      typeField: 'text',
      classTailwind: 'whitespace-pre',
      view: false
    },
    {
      name: 'direccion',
      text: 'Dirección',
      typeField: 'text',
      classTailwind: 'whitespace-pre'
    },
    {
      name: 'barrio',
      text: 'Barrio',
      typeField: 'text',
      classTailwind: 'whitespace-pre',
    },
    {
      name: 'ciudad',
      text: 'Ciudad',
      typeField: 'text',
      classTailwind: 'whitespace-pre'
    },
    {
      name: 'telcontacto',
      text: 'Celular',
      typeField: 'text',
      classTailwind: 'whitespace-pre',
      view: false
    },
    {
      name: 'telefono',
      text: 'Teléfono',
      typeField: 'text',
      classTailwind: 'whitespace-pre',
      view: false
    },
    {
      name: 'negocio',
      text: 'Negocio',
      typeField: 'text',
      classTailwind: 'whitespace-pre'
    },
    {
      name: 'nombreConvenio',
      text: 'U. Negocio',
      typeField: 'text',
      classTailwind: 'whitespace-pre'
    },
    {
      name: 'vencimientoMayor',
      text: 'Vencimiento mayor',
      typeField: 'text',
      classTailwind: 'whitespace-pre'
    },
    {
      name: 'Dia de pago',
      text: 'Día de pago',
      typeField: 'text',
      classTailwind: 'whitespace-pre',
      view: false
    },

    {
      name: 'debidoCobrar',
      text: 'Debido a cobrar',
      typeField: 'text',
      pipeName: 'number',
      classTailwind: 'whitespace-pre'
    },
    {
      name: 'recaudosxCuota',
      text: 'Recaudo',
      typeField: 'text',
      pipeName: 'number',
      classTailwind: 'whitespace-pre',
      view: false
    },
    {
      name: 'cumplimiento',
      text: '% cumplimiento',
      typeField: 'text',
      pipeName: 'percentage',
      view: false
    },
    {
      name: 'valoraPagar',
      text: 'Valor a pagar',
      typeField: 'text',
      pipeName: 'number',
      classTailwind: 'whitespace-pre'
    },
    {
      name: 'fechaultCompromiso',
      text: 'Fecha último compromiso',
      typeField: 'text',
      view: false
    },
    {
      name: 'compromiso de pago',
      text: '$ compromiso de pago',
      typeField: 'text',
      pipeName: 'number',
      classTailwind: 'whitespace-pre',
      view: false
    },
    {
      name: 'reestructuracion',
      text: 'Reest',
      typeField: 'text',
      view: false
    },
    {
      name: 'juridica',
      text: 'Jurídico',
      typeField: 'text',
      view: false
    },
    {
      name: 'agente',
      text: 'Negociación',
      typeField: 'text',
      view: false
    },
  ]
  private unsuscribe$: Subject<any> = new Subject<any>();
  public subcription$: Subscription = new Subscription();
  public estadosCartera: FormControl = new FormControl(['porVencer', 'vencido'])

  public subcriptionTree$: Subscription = new Subscription();

  constructor(
    private _carteraClienteServices: CarteraClientesService,
    private fb: FormBuilder,
    private _sweetAlerService: Sweetalert2Service,
    private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
    this.unsuscribe$.next(null);
    this.unsuscribe$.complete();
    this.subcriptionTwo$.unsubscribe();
    this.subcriptionTree$.unsubscribe();
  }

  ngOnInit(): void {
    this.loadsearch()
    this.formSearchBuilder();
    this.listenObservable();
  }

  public viewDetail(dataRow): void {
    console.log('viewDetail', dataRow);
    this.opened = true
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

        const historico = this.estadosCartera.value.includes('historico');

        if (historico) {
          this._carteraClienteServices.verDetalleCarteraHistorico(detalleCartera).pipe(takeUntil(this.unsuscribe$)).subscribe({
            next: (res) => {
              this._sweetAlerService.stopLoading();
              const valuesData = res?.data
              if (!valuesData.length) {
                this._sweetAlerService.alertInfo({ info: 'Cliente se encuentra al día' });
              } else {
                this.loadingModal({ viewModal, valuesData });
              }
            },
            error: (e) => {
              this._sweetAlerService.alertError();
            }
          })

        } else {
          this._carteraClienteServices.cargarClienteCartera(detalleCartera).pipe(takeUntil(this.unsuscribe$)).subscribe({
            next: (res) => {
              this._sweetAlerService.stopLoading();
              const valuesData = res.data

              if (!valuesData.length) {
                this._sweetAlerService.alertInfo({ info: 'Cliente se encuentra al día' })
              } else {

                this.loadingModal({ viewModal, valuesData });
              }

            },
            error: (e) => {
              this._sweetAlerService.alertError();

            }
          })
        }
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
        this._sweetAlerService.alertError();
      }
    })

    this._carteraClienteServices.listarPeriodosFotos().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.periodosFotos = resp?.data || []
        this.formSearch.controls['periodo'].setValue(resp?.data[0].id)
      },
      error: (e) => {
        this._sweetAlerService.alertError();
      }
    })


  }




  public searchClient(): Promise<any> {
    return new Promise((resolve) => {

      this._sweetAlerService.startLoading({});

      const { periodo, unidadNegocio, identificacion } = this.formSearch.getRawValue();

      const values = { alDia: '', porVencer: '', vencido: '', historico: false }
      this.estadosCartera.value.forEach((item) => {

        switch (item) {
          case 'alDia':
            values.alDia = 'Al Dia'
            break;
          case 'porVencer':
            values.porVencer = 'A Vencer'
            break;
          case 'vencido':
            values.vencido = 'Vencido'
            break;
          case 'historico':
            values.historico = true
            break;
        }

      })

      const data = {
        periodo,
        unidadNegocio,
        identificacion,
        details: [
          { estadoCartera: values.alDia },
          { estadoCartera: values.porVencer },
          { estadoCartera: values.vencido }
        ]
      }


      if (values.historico) {

        this._carteraClienteServices.buscarClienteHistorico(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            if (!resp.data.length) {
              this._sweetAlerService.alertInfo({});
              this.dataRows = []
              this.tittleFilter = 'Filtros'
            } else {
              this.openSearch = false
              this._sweetAlerService.stopLoading();
              this.dataRows = resp?.data || []
              this.tittleFilter = `${this.dataRows[0].nombreCliente} CC - ${this.dataRows[0].cedula}`
            }
            resolve(this.dataRows);
          },
          error: (e) => {
            this._sweetAlerService.alertError();
          }
        })
      } else {
        this._carteraClienteServices.buscarClienteCartera(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            if (!resp.data.length) {
              this._sweetAlerService.alertInfo({});
              this.dataRows = []
              this.tittleFilter = 'Filtros'
            } else {
              this.openSearch = false
              this._sweetAlerService.stopLoading();
              this.dataRows = resp?.data || []


              this.tittleFilter = `${this.dataRows[0].nombreCliente} CC - ${this.dataRows[0].cedula}`
            }
            resolve(this.dataRows);
          },
          error: (e) => {
            this._sweetAlerService.alertError();
            // console.log(e)
          }
        })


      }



    })



  }

  public tittleString(value: string): string {

    if (value) {
      const firstCaracter = (value as string)?.charAt(0)?.toUpperCase();
      const word = (value as string)?.substring(1)?.toLowerCase();
      return `${firstCaracter}${word}`;
    }


  }


  public reloadData(): void {
    this.searchClient().then(() => this._sweetAlerService.alertSuccess())
  }

  private listenObservable(): void {
    this.subcription$ = this._carteraClienteServices.reloadData$.pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: () => {
        this.reloadData();
      }
    })

    this.subcriptionTwo$ = this._carteraClienteServices.selectedOption$.pipe(takeUntil(this.unsuscribe$), skip(1)).subscribe({
      next: (resp) => {
        this.viewMode = { display: false, tab: true }
        const dataSearch = this._carteraClienteServices.getSearchData();
        this.allData = { ...dataSearch }
      }
    })

    this.subcriptionTree$ = this._carteraClienteServices.dataTablesSelected$.pipe(takeUntil(this.unsuscribe$), skip(1)).subscribe({
      next: (resp) => {
        console.log(resp, 'prueba')

        const { length } = resp
        resp.forEach((item, index) => {
          if (length === 1) {
            item.class = 'sm:col-span-2'
          } else {
            item.class = 'sm:col-span-1'
          }
          if ((index === 2) && (length === 3)) {
            item.class = 'sm:col-span-2'
          }
        })

        this.ArrayDataTables = [...resp]
        this.viewMode = { display: true, tab: false }
      }
    })

  }

  private formSearchBuilder(): void {
    const pattern = `^[0-9]+$`
    this.formSearch = this.fb.group({
      periodo: [, [Validators.required]],
      unidadNegocio: [''],
      identificacion: ['1129517344', [Validators.required, Validators.pattern(pattern)]],
      // alDia: [false],
      // porVencer: [true],
      // vencido: [true]
    })
  }

}
