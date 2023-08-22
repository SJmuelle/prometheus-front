import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { filter, skip, takeUntil } from 'rxjs/operators';
import { ModalSubDetalleClienteComponent } from '../modal-sub-detalle-cliente/modal-sub-detalle-cliente/modal-sub-detalle-cliente.component';

@Component({
  selector: 'app-modal-tab-detalle-cliente',
  templateUrl: './modal-tab-detalle-cliente.component.html',
  styleUrls: ['./modal-tab-detalle-cliente.component.scss']
})
export class ModalTabDetalleClienteComponent implements OnInit, OnDestroy {
  public options: string[] = ['Detalle cartera', 'Detalle Pagos', 'Plan de pagos', 'Detalle gestiones', 'Compromisos de pagos', 'Agregar gestiones', 'Editar información']
  public Alldata: any = null
  public selectTab: number = 0
  public formEditClient: FormGroup = new FormGroup({});
  public detalleCartera: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cedula', text: 'Cedula', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'cuota', text: 'Cuota', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaVencimiento', text: 'Fecha vencimiento', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'diasVencidoHoy', text: 'Dias de vencimiento hoy', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'vencimientoMayor', text: 'Vencimiento mayor', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'diasVencidos', text: 'Dias vencidos', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'status', text: 'Estado', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valorAsignado', text: 'Valor asignado', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'debidoCobrar', text: 'Debido cobrar', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'interesMora', text: 'Interes de mora', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'gastoCobranza', text: 'Gasto cobranza', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'totalesParciales', text: 'Total parciales', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
  ]

  public visualizarPagos: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cedula', text: 'Cédula', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'descripcionIngreso', text: 'Descripción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'ingreso', text: 'Ingreso', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cuota', text: 'Cuota', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaIngreso', text: 'Fecha ingreso', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'fechaConsignacion', text: 'Fecha consignación', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'branchCode', text: 'Código banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'bankAccountNo', text: 'Cuenta banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valorIngreso', text: 'Valor ingreso', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
  ]

  public visualizarGestiones: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text', },
    { name: 'tipoGestion', text: 'Tipo de gestión', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'resultadoGestion', text: 'Resultado gestión', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'proAccion', text: 'Próxima acción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaProxGestion', text: 'Fecha próxima acción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text', classTailwind: 'whitespace-pre' },
  ]

  public visualizarCompromisosPago: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text', },
    { name: 'fechaaPagar', text: 'Fecha a pagar', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'direccion', text: 'Dirección', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'barrio', text: 'Barrio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'ciudad', text: 'Ciudad', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valoraPagar', text: 'Valor a pagar', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre text-end', footerSum: true },

  ]

  public visualizarPlanPago: IoptionTable[] = [
    { name: 'ingreso', text: 'Ingreso', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cedula', text: 'Cédula', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'nombre_cliente', text: 'Cliente', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'cuota', text: 'Cuota', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'branch_code', text: 'Código banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'bank_account_no', text: 'Cuenta banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fecha_ingreso', text: 'Fecha ingreso', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'fecha_consignacion', text: 'Fecha consignación', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'descripcion_ingreso', text: 'Descripción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'negocio', text: 'Negocio', typeField: 'text', classTailwind: 'whitespace-pre' },
    // documento
    { name: 'documento', text: 'Factura', typeField: 'text', classTailwind: 'whitespace-pre' },

    { name: 'valor_ingreso', text: 'Valor ingreso', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end whitespace-pre' },

  ]


  public dataRowdetalleCartera: any[] = []
  public dataRowvisualizarPagos: any[] = []
  public dataRowvisualizarGestiones: any[] = []
  public dataRowvisualizarCompromisosPago: any[] = []
  public dataRowPlanPagos: any[] = []

  public cardValues: any[] = [
    { text: 'Debido a cobrar', value: 0, icon: 'assets/icons/icon dollar.svg', color: '#009da9' },
    { text: 'Interés de mora', value: 0, icon: 'assets/icons/icon interes.svg', color: '#2dd4bf' },
    { text: 'Gastos de cobranza', value: 0, icon: 'assets/icons/icon alert.svg', color: '#FF8600' },
    { text: 'Total a pagar', value: 0, icon: 'assets/icons/icon total.svg', color: '#818cf8' },
  ]

  public unsuscribe$: Subject<void> = new Subject<void>();
  public formAgregarGestiones: FormGroup = new FormGroup({});

  public tipoGestor: any[] = []
  public tipoGestion: any[] = []
  public ciudadeseditar: any[] = []
  public listarResultadoGestion: any[] = []
  public listarProximaAccion: any[] = []
  public estadoCliente: any[] = []
  public motivoNoPago: any[] = []
  public departamentos: any[] = []
  public tipoContacto: any[] = []
  public ciudades: any[] = []
  public barrios: any[] = []
  public dapartamentosEdit: any[] = []
  public barriosGestiones: any[] = []
  public suscription$: Subscription = new Subscription();

  constructor(
    private _seguimientoCarteraService: CarteraClientesService,
    private _sweetAlerService: Sweetalert2Service,
    private fb: FormBuilder,
    private dialog: MatDialog,
    // private dialogRef: MatDialogRef<ModalTabDetalleClienteComponent>
  ) { }


  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
    this.suscription$.unsubscribe();

  }




  ngOnInit(): void {
    this.Alldata = this._seguimientoCarteraService.getSearchData();
    this.initformEdit();
    this.initform();
    this.initdataTab();
    this.cargarSelects();
    this.loadSelect();
    this.listenObservable();
  }

  public cargarSelects(): void {

    const today = new Date();

    this.formAgregarGestiones.controls['Fecha'].setValue(today)
    this.formAgregarGestiones.controls['Cliente'].setValue(this.Alldata['nombreCliente'])
    this.formAgregarGestiones.controls['Negocio'].setValue(this.Alldata['negocio'])
    this.formAgregarGestiones.controls['Cliente'].disable()
    this.formAgregarGestiones.controls['Negocio'].disable()
    this.formAgregarGestiones.controls['Cliente'].updateValueAndValidity();
    this.formAgregarGestiones.controls['Negocio'].updateValueAndValidity();



    this._seguimientoCarteraService.ListarTipoGestor().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoGestor = resp?.data || []
      },
      error: (e) => { this._sweetAlerService.alertError(); }
    })

    this._seguimientoCarteraService.listarTipoGestion().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoGestion = resp?.data || []
      },
      error: (e) => { this._sweetAlerService.alertError(); }
    })

    this._seguimientoCarteraService.listarTipoContacto().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoContacto = resp?.data || []
      },
      error: (e) => { this._sweetAlerService.alertError(); }
    })

  }

  public resetDocimiclio(): void {
    this.formAgregarGestiones.controls['departamento'].setValue(null)
    this.formAgregarGestiones.controls['ciudad'].setValue(null)
    this.formAgregarGestiones.controls['barrio'].setValue(null)

    this.ciudades = []
    if (this.formAgregarGestiones.controls['domicilio'].value) {
      this.formAgregarGestiones.controls['departamento'].setValue(this.Alldata['coddpto']);
      const departamento = this.Alldata['coddpto']
      this._seguimientoCarteraService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (resp) => {
          this.ciudades = resp?.data || []
          this.formAgregarGestiones.controls['ciudad'].setValue(this.Alldata['codciu']);
        },
        error: (e) => { this._sweetAlerService.alertError() }

      })

      this._seguimientoCarteraService.listarBarrios(this.Alldata['codciu']).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (resp) => {
          this.barriosGestiones = resp?.data || []
          this.formAgregarGestiones.controls['barrio'].setValue(this.Alldata['barrio'])
        },
        error: (e) => {
          this._sweetAlerService.alertError()
        }
      })
      this.formAgregarGestiones.controls['departamento'].setValidators([Validators.required])
      this.formAgregarGestiones.controls['ciudad'].setValidators([Validators.required])
      this.formAgregarGestiones.controls['barrio'].setValidators([Validators.required])
      this.formAgregarGestiones.controls['direccion'].setValidators([Validators.required])

      this.formAgregarGestiones.controls['departamento'].updateValueAndValidity()
      this.formAgregarGestiones.controls['ciudad'].updateValueAndValidity()
      this.formAgregarGestiones.controls['barrio'].updateValueAndValidity()
      this.formAgregarGestiones.controls['direccion'].updateValueAndValidity()
    } else {
      this.formAgregarGestiones.controls['departamento'].clearValidators()
      this.formAgregarGestiones.controls['ciudad'].clearValidators()
      this.formAgregarGestiones.controls['barrio'].clearValidators()
      this.formAgregarGestiones.controls['direccion'].clearValidators()

      this.formAgregarGestiones.controls['departamento'].updateValueAndValidity()
      this.formAgregarGestiones.controls['ciudad'].updateValueAndValidity()
      this.formAgregarGestiones.controls['barrio'].updateValueAndValidity()
      this.formAgregarGestiones.controls['direccion'].updateValueAndValidity()
    }
  }


  public initdataTab(): void {

    this.dataRowdetalleCartera = []
    this._sweetAlerService.startLoading({});

    const detalleCartera = {
      periodo: this.Alldata.periodo,
      unidadNegocio: this.Alldata.unidadNegocio,
      negocio: this.Alldata.negocio,
    }

    const historico = this.Alldata.estados.includes('historico');

    if (historico) {
      this._seguimientoCarteraService.verDetalleCarteraHistorico(detalleCartera).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (res: any) => {
          setTimeout(() => {
            this._sweetAlerService.stopLoading();
            this.dataRowdetalleCartera = res?.data || []
            this.cardValues.forEach((item) => {
              item.value = 0
            })
            this.dataRowdetalleCartera.forEach((item) => {
              this.cardValues[0].value += Number(item.debidoCobrar)
              this.cardValues[1].value += Number(item.interesMora)
              this.cardValues[2].value += Number(item.gastoCobranza)
              this.cardValues[3].value += Number(item.totalesParciales)
            })
          }, 400);
        },
        error: (e) => {
          this._sweetAlerService.alertError();
        }
      })

    } else {
      this._seguimientoCarteraService.cargarClienteCartera(detalleCartera).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (res) => {
          setTimeout(() => {
            this._sweetAlerService.stopLoading();
            this.dataRowdetalleCartera = res?.data || []
            this.cardValues.forEach((item) => {
              item.value = 0
            })

            this.dataRowdetalleCartera.forEach((item) => {

              this.cardValues[0].value += Number(item.debidoCobrar)
              this.cardValues[1].value += Number(item.interesMora)
              this.cardValues[2].value += Number(item.gastoCobranza)
              this.cardValues[3].value += Number(item.totalesParciales)
            })
          }, 400);

        },
        error: (e) => {
          this._sweetAlerService.alertError();
        }
      })
    }








  }

  public onTabChanged(event: MatTabChangeEvent): void {
    const tabValue = event.index
    this.selectTab = tabValue
    switch (tabValue) {
      case 0:
        this.initdataTab();
        break;
      case 1:
        // this.detallePagos();
        this.PlanPagos();
        break;
      case 2:
        this.detalleGestiones();
        break;
      case 3:
        this.compromisosPagos();
        break;
      // case 4:
      //   break;
    }



  }


  public PlanPagos(): void {
    this.dataRowPlanPagos = []

    this._sweetAlerService.startLoading({});

    const { negocio, periodo } = this.Alldata
    const detallePagos = {
      negocio,
      periodo
    }
    this._seguimientoCarteraService.verDetallePagoCliente(detallePagos).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        setTimeout(() => {
          this._sweetAlerService.stopLoading();
          this.dataRowPlanPagos = resp?.data.filter((value: any) => value.valor_ingreso > 0) || []
        }, 400)

      }, error: (e) => {
        this._sweetAlerService.alertError()
      }
    })



  }


  public detallePagos(): void {
    this.dataRowvisualizarPagos = []

    this._sweetAlerService.startLoading({});
    const visualizarPagos = {
      periodo: this.Alldata.periodo,
      negocio: this.Alldata.negocio
    }
    this._seguimientoCarteraService.verPagosClientes(visualizarPagos).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (res) => {
        setTimeout(() => {
          this._sweetAlerService.stopLoading();
          this.dataRowvisualizarPagos = res?.data || [];
        }, 400);

      },
      error: (e) => {
        this._sweetAlerService.alertError();
      }
    })



  }

  // public closedModal(): void {
  //   this.dialogRef.close();
  // }

  public detalleGestiones(): void {

    this.dataRowvisualizarGestiones = []

    this._sweetAlerService.startLoading({});

    const visualizarGestiones = this.Alldata.negocio
    this._seguimientoCarteraService.verGestionesCliente(visualizarGestiones).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (res) => {


        setTimeout(() => {
          this._sweetAlerService.stopLoading();
          this.dataRowvisualizarGestiones = res?.data || [];
        }, 400);

      },
      error: (e) => {
        this._sweetAlerService.alertError();
      }
    })

  }

  public changeSelects(eventSelect, select: string): void {

    switch (select) {
      case 'Tipodecontacto':
        const selectTipodecontacto = eventSelect.value
        const controls = ['Resultadogestión', 'Estadocliente', 'Motivonopago', 'Proximaacción']

        controls.forEach((controls) => {
          this.formAgregarGestiones.controls[controls]?.setValue(null)
        })

        const listarResultadoGestion = selectTipodecontacto
        this._seguimientoCarteraService.listarResultadoGestion(listarResultadoGestion).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.listarResultadoGestion = resp?.data || []
          },
          error: (e) => { this._sweetAlerService.alertError(); }
        })

        const estadoCliente = selectTipodecontacto
        this._seguimientoCarteraService.listarEstadoCliente(estadoCliente).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.estadoCliente = resp?.data || []
          },
          error: (e) => { this._sweetAlerService.alertError() }
        })

        const listarProximaAccion = selectTipodecontacto
        this._seguimientoCarteraService.listarProximaAccion(listarProximaAccion).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.listarProximaAccion = resp?.data || []
          },
          error: (e) => { this._sweetAlerService.alertError() }
        })

        break;

      case 'Resultadogestión':
        const selectResultadoGestión = eventSelect.value
        const controlsValue = ['Motivonopago', 'departamento', 'ciudad']

        controlsValue.forEach((item) => {
          this.formAgregarGestiones.controls[item]?.setValue(null);
        })

        const Tipodecontacto = this.formAgregarGestiones.controls['Tipodecontacto'].value

        const listarMotivoNoPago = { id: Tipodecontacto, select: selectResultadoGestión }
        this._seguimientoCarteraService.listarMotivoNoPago(listarMotivoNoPago).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            if (!resp?.data?.length) {
              this.motivoNoPago = [{ id: '0', descripcion: 'Sin motivo' }]
              this.formAgregarGestiones.controls['Motivonopago'].setValue('0')

            } else {
              this.motivoNoPago = resp?.data || []
            }
            this.formAgregarGestiones.controls['Motivonopago'].markAsUntouched()

          },
          error: (e) => { this._sweetAlerService.alertError() }
        })

        if (selectResultadoGestión === '62') {
          this.formAgregarGestiones.controls['domicilio'].setValue(false)

          this.formAgregarGestiones.controls['valorPagar'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['fechaPagar'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['valorPagar'].updateValueAndValidity()
          this.formAgregarGestiones.controls['fechaPagar'].updateValueAndValidity()

          this._seguimientoCarteraService.listarDepartamentos().pipe(takeUntil(this.unsuscribe$)).subscribe({
            next: (resp) => {
              this.departamentos = resp?.data || []
              this.formAgregarGestiones.controls['departamento'].setValue(this.Alldata['coddpto']);
              this.formAgregarGestiones.controls['barrio'].setValue(this.Alldata['barrio']);
              this.formAgregarGestiones.controls['direccion'].setValue(this.Alldata['direccion']);
            },
            error: (e) => { this._sweetAlerService.alertError() }
          })
        } else {
          this.formAgregarGestiones.controls['valorPagar'].clearValidators()
          this.formAgregarGestiones.controls['fechaPagar'].clearValidators()
          this.formAgregarGestiones.controls['valorPagar'].updateValueAndValidity()
          this.formAgregarGestiones.controls['fechaPagar'].updateValueAndValidity()
        }

        if (selectResultadoGestión === '64') {
          this.formAgregarGestiones.controls['Motivonopago'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['Motivonopago'].updateValueAndValidity()

        } else {
          this.formAgregarGestiones.controls['Motivonopago'].clearValidators()
          this.formAgregarGestiones.controls['Motivonopago'].updateValueAndValidity()
        }

        if (selectResultadoGestión !== '62') {
          this.formAgregarGestiones.controls['departamento'].clearValidators()
          this.formAgregarGestiones.controls['ciudad'].clearValidators()
          this.formAgregarGestiones.controls['barrio'].clearValidators()
          this.formAgregarGestiones.controls['direccion'].clearValidators()

          this.formAgregarGestiones.controls['departamento'].updateValueAndValidity()
          this.formAgregarGestiones.controls['ciudad'].updateValueAndValidity()
          this.formAgregarGestiones.controls['barrio'].updateValueAndValidity()
          this.formAgregarGestiones.controls['direccion'].updateValueAndValidity()
        }

        break;
      case 'departamento':
        const departamento = eventSelect.value
        this.formAgregarGestiones.controls['ciudad'].setValue(null)
        this.formAgregarGestiones.controls['barrio'].setValue(null)

        this._seguimientoCarteraService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.ciudades = resp?.data || []

          },
          error: (e) => { this._sweetAlerService.alertError() }
        })
        break;
      case 'ciudad':
        this.formAgregarGestiones.controls['barrio'].setValue(null)
        const ciudad = eventSelect.value
        this._seguimientoCarteraService.listarBarrios(ciudad).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.barriosGestiones = resp?.data || []
          },
          error: (e) => {
            this._sweetAlerService.alertError();
          }

        })
        break;

    }
  }

  public openDiag(): void {


    const data = {
      viewModal: 'Seleccionar Dirección',
      valuesData: [],
      width: '30%'
    }

    this.loadingModal(data)

  }


  public loadingModal({ viewModal, valuesData, width }): void {
    const dialogRef = this.dialog.open(ModalSubDetalleClienteComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width,
        data: { viewModal, valuesData },
        disableClose: false
      })


  }

  public filteredOptions(): any[] {
    const filter = this.formEditClient.controls['barrio'].value?.toLowerCase() || '';
    return this.barrios.filter(item => item.barrio?.toLowerCase().includes(filter))
  }

  public onSaveEdit(): void {

    const callback = () => {
      this._sweetAlerService.startLoading({});

      this.formEditClient.enable();
      const form = this.formEditClient.getRawValue();
      const data = {
        ...form,
        negocio: this.Alldata.negocio,
        empresa: 'FINT'
      }

      this._seguimientoCarteraService.guardarInformacionCliente(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (res) => {
          // this._seguimientoCarteraService.reloadData$.next();
          setTimeout(() => {
            this._sweetAlerService.alertSuccess();
          }, 500);

          const disable = ['codigoCliente', 'nitCliente', 'nombreCliente']

          disable.forEach(element => {
            this.formEditClient.controls[element]?.disable();
          });


        },
        error: (e) => {

          const disable = ['codigoCliente', 'nitCliente', 'nombreCliente']

          disable.forEach(element => {
            this.formEditClient.controls[element]?.disable();
          });

          this._sweetAlerService.alertError();
        }
      })
    }

    this._sweetAlerService.alertConfirmation(callback);


  }

  public changeSelectsedit(select): void {
    this.formEditClient.controls['ciudad'].setValue(null)
    const departamento = select.value
    this._seguimientoCarteraService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.ciudadeseditar = resp?.data || []
      },
      error: (e) => { this._sweetAlerService.alertError() }
    })

    this.resetBarrio();


  }

  public resetBarrio(): void {
    this.formEditClient.controls['barrio'].setValue(null);
    const codciu = this.formEditClient.value.ciudad

    this._seguimientoCarteraService.listarBarrios(codciu).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.barrios = resp?.data || []
      },
      error: (e) => {
        this._sweetAlerService.alertError();
      }
    })

    this.formEditClient.controls['barrio'].markAsUntouched();
  }

  public loadSelect(): void {


    const dataClient = {
      codigoCliente: this.Alldata.negocio,
      nombreCliente: this.Alldata.nombreCliente,
      nitCliente: this.Alldata.identificacion,
      direccionCliente: this.Alldata.direccion,
      telefonoCliente: this.Alldata.telcontacto,
      celularCliente: this.Alldata.telefono,
      celular2Cliente: '',
      barrio: this.Alldata.barrio,
      ciudad: this.Alldata.codciu,
      departamento: this.Alldata.coddpto,
      observaciones: '',
      correoCliente: '',
      extorsion: false
    }
    this.formEditClient.setValue({ ...dataClient })
    const disable = ['codigoCliente', 'nitCliente', 'nombreCliente']

    disable.forEach(element => {
      this.formEditClient.controls[element]?.disable();
    });

    // codigoCliente: [],
    // nombreCliente: [],
    // nitCliente: [],
    // direccionCliente: [, [Validators.required]],
    // telefonoCliente: [, [Validators.required]],
    // celularCliente: [, [Validators.required]],
    // celular2Cliente: [,],
    // barrio: [, [Validators.required]],
    // ciudad: [, [Validators.required]],
    // departamento: [, [Validators.required]],
    // observaciones: [],
    // correoCliente: [],
    // extorsion: [false, []]

    this._seguimientoCarteraService.listarDepartamentos().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.dapartamentosEdit = resp?.data || []
        const { coddpto } = this.Alldata
        this.formEditClient.controls['departamento'].setValue(coddpto)
      },
      error: (e) => {
        this._sweetAlerService.alertError();
      }
    })


    const { coddpto } = this.Alldata
    this._seguimientoCarteraService.listarCiudades(coddpto).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.ciudadeseditar = resp?.data || []
        const { codciu } = this.Alldata
        this.formEditClient.controls['ciudad'].setValue(codciu)
      },
      error: (e) => { this._sweetAlerService.alertError() }
    })

    this._seguimientoCarteraService.listarBarrios(this.Alldata.codciu).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.barrios = resp?.data || []
      },
      error: (e) => {
        this._sweetAlerService.alertError();
      }
    })

  }



  public compromisosPagos(): void {

    this.dataRowvisualizarCompromisosPago = []
    this._sweetAlerService.startLoading({});

    const visualizarCompromisosPago = this.Alldata.negocio
    this._seguimientoCarteraService.verCompromisosPagos(visualizarCompromisosPago).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (res) => {

        setTimeout(() => {
          this._sweetAlerService.stopLoading();
          this.dataRowvisualizarCompromisosPago = res?.data || [];
        }, 400);

      },
      error: (e) => {
        this._sweetAlerService.alertError();
      }
    })

  }

  public onSaveGestiones(): void {
    const callback = () => {
      this._sweetAlerService.startLoading({});

      const resultadoGestion = this.formAgregarGestiones.controls['Resultadogestión'].value
      const form = this.formAgregarGestiones.getRawValue()
      let data = {}


      const motivoNoPago = form.Resultadogestión === '64' ? form.Motivonopago : '0'

      if (resultadoGestion === '62') {
        data = {
          empresa: 'FINT',
          negocio: this.Alldata['negocio'],
          observacion: form.Observaciones,
          valorPagar: Number(form.valorPagar),
          fechaPagar: moment(form.fechaPagar).format('YYYY-MM-DD'),
          dapartamento: form.departamento ?? '',
          ciudad: form.ciudad ?? '',
          barrio: form.barrio ?? '',
          direccion: form.direccion ?? '',
          estadoCliente: form.Estadocliente,
          resultadoGestion,
          proxAccion: form.Proximaacción,
          tipoGestor: form.Tipodegestor,
          tipoGestion: form.Tipodegestion,
          tipoContacto: form.Tipodecontacto,
          motivoNoPago,
          fechaProxGestion: moment(form.Fecha).format('YYYY-MM-DD hh:mm:00')
        }

      } else {
        data = {
          empresa: 'FINT',
          negocio: this.Alldata['negocio'],
          observacion: form.Observaciones,
          valorPagar: 0,
          fechaPagar: '',
          dapartamento: '',
          ciudad: '',
          barrio: '',
          direccion: '',
          estadoCliente: form.Estadocliente,
          resultadoGestion: resultadoGestion,
          proxAccion: form.Proximaacción,
          tipoGestor: form.Tipodegestor,
          tipoGestion: form.Tipodegestion,
          tipoContacto: form.Tipodecontacto,
          motivoNoPago,
          fechaProxGestion: moment(form.Fecha).format('YYYY-MM-DD hh:mm:00')
        }
      }

      this._seguimientoCarteraService.guardarGestionCliente(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (resp) => {
          setTimeout(() => {
            this._sweetAlerService.alertSuccess();
          }, 400);
        },
        error: () => {
          this._sweetAlerService.alertError();
        }
      })
    }



    this._sweetAlerService.alertConfirmation(callback);

  }

  public filteredOptionsGestiones(): any[] {
    const filter = this.formAgregarGestiones.controls['barrio'].value?.toLowerCase() || '';
    return this.barriosGestiones.filter(item => item.barrio?.toLowerCase().includes(filter))
  }

  private listenObservable(): void {
    this.suscription$ = this._seguimientoCarteraService.direccionCliente$.pipe(skip(1), takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.formEditClient.controls['direccionCliente'].setValue(resp)
        this.formAgregarGestiones.controls['direccion'].setValue(resp)
      }
    })
  }

  private initform(): void {
    this.formAgregarGestiones = this.fb.group({
      'Cliente': [],
      'Negocio': [],
      'Tipodegestor': [, [Validators.required]],
      'Tipodegestion': [, [Validators.required]],
      'Tipodecontacto': [, [Validators.required]],
      'Resultadogestión': [, [Validators.required]],
      'Motivonopago': [],
      'Observaciones': [, [Validators.required]],
      'Estadocliente': [, [Validators.required]],
      'Proximaacción': [, [Validators.required]],
      'Fecha': [, [Validators.required]],
      'valorPagar': [],
      'fechaPagar': [],
      'domicilio': [false],
      'departamento': [],
      'ciudad': [],
      'barrio': [],
      'direccion': [],
    })
  }

  private initformEdit(): void {
    this.formEditClient = this.fb.group({
      codigoCliente: [],
      nombreCliente: [],
      nitCliente: [],
      direccionCliente: [, [Validators.required]],
      telefonoCliente: [, [Validators.required]],
      celularCliente: [, [Validators.required]],
      celular2Cliente: [,],
      barrio: [, [Validators.required]],
      ciudad: [, [Validators.required]],
      departamento: [, [Validators.required]],
      observaciones: [],
      correoCliente: [],
      extorsion: [false, []]
    })
  }


}
