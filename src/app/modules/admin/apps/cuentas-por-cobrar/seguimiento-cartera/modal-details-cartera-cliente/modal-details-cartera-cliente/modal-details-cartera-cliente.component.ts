import { SelectionChange } from '@angular/cdk/collections';
import { Component, Inject, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import { Subject, Subscription } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import moment from 'moment'
import { ModalSubDetalleClienteComponent } from '../../modal-sub-detalle-cliente/modal-sub-detalle-cliente/modal-sub-detalle-cliente.component';
@Component({
  selector: 'app-modal-details-cartera-cliente',
  templateUrl: './modal-details-cartera-cliente.component.html',
  styleUrls: ['./modal-details-cartera-cliente.component.scss']
})
export class ModalDetailsCarteraClienteComponent implements OnInit, AfterViewInit, OnDestroy {

  public dataOptions: IoptionTable[] = [];
  public dataRows: any[] = [];
  public formAgregarGestiones: FormGroup = new FormGroup({});
  private unsuscribe$: Subject<any> = new Subject<any>();
  public tipoGestor: any[] = []
  public tipoGestion: any[] = []
  public tipoContacto: any[] = []
  public motivoNoPago: any[] = []
  public estadoCliente: any[] = []
  public listarProximaAccion: any[] = []
  public listarResultadoGestion: any[] = []
  public departamentos: any[] = []
  public ciudades: any[] = []




  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = true;

  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';


  public detalleCartera: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text', },
    { name: 'cedula', text: 'Cedula', typeField: 'text', view: false },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text', view: false },
    { name: 'cuota', text: 'Cuota', typeField: 'text' },
    { name: 'fechaVencimiento', text: 'Fecha vencimiento', typeField: 'text' },
    { name: 'diasVencidoHoy', text: 'Dias de vencimiento hoy', typeField: 'text' },
    { name: 'vencimientoMayor', text: 'Vencimiento mayor', typeField: 'text' },
    { name: 'diasVencidos', text: 'Dias vencidos', typeField: 'text' },
    { name: 'status', text: 'Estado', typeField: 'text' },
    { name: 'valorAsignado', text: 'Valor asignado', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end' },
    { name: 'debidoCobrar', text: 'Debido cobrar', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end' },
    { name: 'interesMora', text: 'Interes de mora', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end' },
    { name: 'gastoCobranza', text: 'Gasto cobranza', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end' },
    { name: 'totalesParciales', text: 'Total parciales', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end' },
  ]

  public visualizarPagos: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text' },
    { name: 'cedula', text: 'Cédula', typeField: 'text', view: false },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text', view: false },
    { name: 'descripcionIngreso', text: 'Descripción', typeField: 'text' },
    { name: 'ingreso', text: 'Ingreso', typeField: 'text' },
    { name: 'cuota', text: 'Cuota', typeField: 'text' },
    { name: 'fechaIngreso', text: 'Fecha ingreso', typeField: 'text', pipeName: 'date' },
    { name: 'fechaConsignacion', text: 'Fecha consignación', typeField: 'text', pipeName: 'date' },
    { name: 'branchCode', text: 'Código banco', typeField: 'text' },
    { name: 'bankAccountNo', text: 'Cuenta banco', typeField: 'text' },
    { name: 'valorIngreso', text: 'Valor ingreso', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end' },
  ]

  public visualizarGestiones: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text' },
    { name: 'tipoGestion', text: 'Tipo de gestión', typeField: 'text' },
    { name: 'resultadoGestion', text: 'Resultado gestión', typeField: 'text' },
    { name: 'proAccion', text: 'Próxima acción', typeField: 'text' },
    { name: 'fechaProxGestion', text: 'Fecha próxima acción', typeField: 'text', },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text' },
  ]

  public visualizarCompromisosPago: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text' },
    { name: 'fechaaPagar', text: 'Fecha a pagar', typeField: 'text' },
    { name: 'direccion', text: 'Dirección', typeField: 'text' },
    { name: 'barrio', text: 'Barrio', typeField: 'text' },
    { name: 'ciudad', text: 'Ciudad', typeField: 'text' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valoraPagar', text: 'Valor a pagar', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre text-end', footerSum: true },

  ]

  public footer: boolean = false
  public tittleModal: string = 'Visualizar seguimiento cartera clientes'
  public dataClient: any = null
  public suscription$: Subscription;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _sweetAlertService: Sweetalert2Service,
    private _carteraClienteService: CarteraClientesService,
    private _dialogRef: MatDialogRef<ModalDetailsCarteraClienteComponent>,
    private dialogSubDetalle: MatDialog,
  ) { }
  ngOnDestroy(): void {
    this.unsuscribe$.next(null);
    this.unsuscribe$.complete();
    this.suscription$.unsubscribe();

  }


  ngAfterViewInit(): void {


  }

  ngOnInit(): void {

    this.listenObservable()

    const tittle = {
      detalleCartera: 'Detalle de la cartera',
      visualizarPagos: 'Visualizar pagos',
      visualizarGestiones: 'Visualizar gestiones',
      visualizarCompromisosPago: 'Visualizar compromisos de pago',
      estadoCuentaGeotech: 'Estado de cuenta Geotech',
      agregarGestiones: 'Agregar gestiones',
      editarInformacion: 'Editar informacion'
    }
    const dataOptionTable = {
      detalleCartera: this.detalleCartera,
      visualizarPagos: this.visualizarPagos,
      visualizarGestiones: this.visualizarGestiones,
      visualizarCompromisosPago: this.visualizarCompromisosPago,
      estadoCuentaGeotech: '',
      agregarGestiones: '',
      editarInformacion: ''
    }

    this.tittleModal = tittle[this.data.viewModal]
    this.dataOptions = dataOptionTable[this.data.viewModal]
    this.dataRows = this.data.valuesData

    switch (this.tittleModal) {
      case 'Detalle de la cartera':
        this.footer = true
        break;
      default:
        this.footer = false
        break
    }

    if (this.tittleModal === 'Agregar gestiones') {
      this.AgregarGestiones();
      const today = new Date();

      this.formAgregarGestiones.controls['Fecha'].setValue(today)
      this.formAgregarGestiones.controls['Cliente'].setValue(this.data.valuesData['nombreCliente'])
      this.formAgregarGestiones.controls['Negocio'].setValue(this.data.valuesData['negocio'])
      this.formAgregarGestiones.controls['Cliente'].disable()
      this.formAgregarGestiones.controls['Negocio'].disable()
      this.formAgregarGestiones.controls['Cliente'].updateValueAndValidity();
      this.formAgregarGestiones.controls['Negocio'].updateValueAndValidity();
      this.cargarSelects();
    }

  }

  public closeModal(): void {
    this._dialogRef.close()
  }

  public onSave(): void {


    const callback = () => {
      this._sweetAlertService.startLoading({});

      const resultadoGestion = this.formAgregarGestiones.controls['Resultadogestión'].value
      const form = this.formAgregarGestiones.getRawValue()
      let data = {}


      const motivoNoPago = form.Resultadogestión === '64' ? form.Motivonopago : '0'

      if (resultadoGestion === '62') {
        data = {
          empresa: 'FINT',
          negocio: this.data.valuesData['negocio'],
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
          negocio: this.data.valuesData['negocio'],
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

      this._carteraClienteService.guardarGestionCliente(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (resp) => {
          this._sweetAlertService.alertSuccess();
          this._dialogRef.close()
        },
        error: () => {
          this._sweetAlertService.alertError();
        }
      })
    }



    this._sweetAlertService.alertConfirmation(callback);

  }

  public cargarSelects(): void {

    this._carteraClienteService.ListarTipoGestor().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoGestor = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError(); }
    })

    this._carteraClienteService.listarTipoGestion().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoGestion = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError(); }
    })

    this._carteraClienteService.listarTipoContacto().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoContacto = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError(); }
    })

  }

  public changeSelects(eventSelect, select: string): void {

    switch (select) {
      case 'Tipodecontacto':
        const selectTipodecontacto = eventSelect.value
        this.formAgregarGestiones.controls['Resultadogestión'].setValue(null)
        this.formAgregarGestiones.controls['Estadocliente'].setValue(null)
        this.formAgregarGestiones.controls['Resultadogestión'].setValue(null)
        this.formAgregarGestiones.controls['Motivonopago'].setValue(null)
        this.formAgregarGestiones.controls['Proximaacción'].setValue(null)

        const listarResultadoGestion = selectTipodecontacto
        this._carteraClienteService.listarResultadoGestion(listarResultadoGestion).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.listarResultadoGestion = resp?.data || []
          },
          error: (e) => { this._sweetAlertService.alertError(); }
        })

        const estadoCliente = selectTipodecontacto
        this._carteraClienteService.listarEstadoCliente(estadoCliente).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.estadoCliente = resp?.data || []
          },
          error: (e) => { this._sweetAlertService.alertError() }
        })

        const listarProximaAccion = selectTipodecontacto
        this._carteraClienteService.listarProximaAccion(listarProximaAccion).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.listarProximaAccion = resp?.data || []
          },
          error: (e) => { this._sweetAlertService.alertError() }
        })

        break;

      case 'Resultadogestión':
        const selectResultadoGestión = eventSelect.value

        this.formAgregarGestiones.controls['Motivonopago'].setValue(null)
        this.formAgregarGestiones.controls['departamento'].setValue(null)
        this.formAgregarGestiones.controls['ciudad'].setValue(null)

        const Tipodecontacto = this.formAgregarGestiones.controls['Tipodecontacto'].value

        const listarMotivoNoPago = { id: Tipodecontacto, select: selectResultadoGestión }
        this._carteraClienteService.listarMotivoNoPago(listarMotivoNoPago).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            if (!resp?.data?.length) {
              this.motivoNoPago = [{ id: '0', descripcion: 'Sin motivo' }]
              this.formAgregarGestiones.controls['Motivonopago'].setValue('0')

            } else {
              this.motivoNoPago = resp?.data || []
            }
            this.formAgregarGestiones.controls['Motivonopago'].markAsUntouched()

          },
          error: (e) => { this._sweetAlertService.alertError() }
        })

        if (selectResultadoGestión === '62') {
          this.formAgregarGestiones.controls['domicilio'].setValue(false)

          this.formAgregarGestiones.controls['valorPagar'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['fechaPagar'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['valorPagar'].updateValueAndValidity()
          this.formAgregarGestiones.controls['fechaPagar'].updateValueAndValidity()

          this._carteraClienteService.listarDepartamentos().pipe(takeUntil(this.unsuscribe$)).subscribe({
            next: (resp) => {
              this.departamentos = resp?.data || []
              this.formAgregarGestiones.controls['departamento'].setValue(this.data.valuesData['coddpto']);
              this.formAgregarGestiones.controls['barrio'].setValue(this.data.valuesData['barrio']);
              this.formAgregarGestiones.controls['direccion'].setValue(this.data.valuesData['direccion']);
            },
            error: (e) => { this._sweetAlertService.alertError() }
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
        this._carteraClienteService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.ciudades = resp?.data || []

          },
          error: (e) => { this._sweetAlertService.alertError() }
        })
        break;

    }
  }

  public verDetallePago(): void {
    const { negocio, periodo } = this.dataClient
    const detallePagos = {
      negocio,
      periodo
    }
    this._carteraClienteService.verDetallePagoCliente(detallePagos).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        const data = {
          viewModal: 'Detalle de pagos',
          valuesData: resp?.data || [],
          width: '60%'
        }
        this.loadingModal(data)

      }, error: (e) => {
        this._sweetAlertService.alertError()
      }
    })




  }

  private listenObservable(): void {
    this.suscription$ = this._carteraClienteService.dataCliente$.pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (data) => {
        this.dataClient = data;

      },
    })



  }

  public loadingModal({ viewModal, valuesData, width }): void {
    const dialogRef = this.dialogSubDetalle.open(ModalSubDetalleClienteComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width,
        data: { viewModal, valuesData },
        disableClose: false
      })


  }

  public resetDocimiclio(): void {
    this.formAgregarGestiones.controls['departamento'].setValue(null)
    this.formAgregarGestiones.controls['ciudad'].setValue(null)
    this.ciudades = []
    if (this.formAgregarGestiones.controls['domicilio'].value) {
      this.formAgregarGestiones.controls['departamento'].setValue(this.data.valuesData['coddpto']);
      const departamento = this.data.valuesData['coddpto']
      this._carteraClienteService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (resp) => {
          this.ciudades = resp?.data || []
          this.formAgregarGestiones.controls['ciudad'].setValue(this.data.valuesData['codciu']);
        },
        error: (e) => { this._sweetAlertService.alertError() }
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

  private AgregarGestiones(): void {
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

}
