import { SelectionChange } from '@angular/cdk/collections';
import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectConfig } from '@angular/material/select';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal-details-cartera-cliente',
  templateUrl: './modal-details-cartera-cliente.component.html',
  styleUrls: ['./modal-details-cartera-cliente.component.scss']
})
export class ModalDetailsCarteraClienteComponent implements OnInit, AfterViewInit {

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
    { name: 'cedula', text: 'Cedula', typeField: 'text' },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text' },
    { name: 'cuota', text: 'Cuota', typeField: 'text' },
    { name: 'fechaVencimiento', text: 'Fecha vencimiento', typeField: 'text' },
    { name: 'diasVencidoHoy', text: 'Dias de vencimiento hoy', typeField: 'text' },
    { name: 'vencimientoMayor', text: 'Vencimiento mayor', typeField: 'text' },
    { name: 'diasVencidos', text: 'Dias vencidos', typeField: 'text' },
    { name: 'status', text: 'Estado', typeField: 'text' },
    { name: 'valorAsignado', text: 'Valor asignado', typeField: 'text', pipeName: 'number' },
    { name: 'debidoCobrar', text: 'Debido cobrar', typeField: 'text', pipeName: 'number' },
    { name: 'interesMora', text: 'Interes de mora', typeField: 'text', pipeName: 'number' },
    { name: 'gastoCobranza', text: 'Gasto cobranza', typeField: 'text', pipeName: 'number' },
    { name: 'totalesParciales', text: 'Total parciales', typeField: 'text', pipeName: 'number' },
  ]

  public visualizarPagos: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text' },
    { name: 'cedula', text: 'Cedula', typeField: 'text' },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text' },
    { name: 'descripcionIngreso', text: 'Descripción', typeField: 'text' },
    { name: 'valorIngreso', text: 'Valor ingreso', typeField: 'text', pipeName: 'number' },
    { name: 'ingreso', text: 'Ingreso', typeField: 'text' },
    { name: 'cuota', text: 'Cuota', typeField: 'text' },
    { name: 'fechaIngreso', text: 'Fecha ingreso', typeField: 'text', pipeName: 'date' },
    { name: 'fechaConsignacion', text: 'Fecha consignación', typeField: 'text', pipeName: 'date' },
    { name: 'bankAccountNo', text: 'Cuenta banco', typeField: 'text' },
    { name: 'branchCode', text: 'Codigo banco', typeField: 'text' },
  ]

  public visualizarGestiones: IoptionTable[] = [
    { name: 'observacion', text: 'Observacion', typeField: 'text' },
    { name: 'tipoGestion', text: 'Tipo de Gestion', typeField: 'text' },
    { name: 'proAccion', text: 'Proxima Accion', typeField: 'text' },
    { name: 'fechaProxGestion', text: 'Fecha Proxima Accion', typeField: 'text', pipeName: 'date' },
    { name: 'fechaCreacion', text: 'Fecha Creacion', typeField: 'text', pipeName: 'date' },
    { name: 'usuarioCreacion', text: 'Usuario Creador', typeField: 'text' },
  ]

  public visualizarCompromisosPago: IoptionTable[] = [
    { name: 'observacion', text: 'Observacion', typeField: 'text' },
    { name: 'valoraPagar', text: 'Valor a pagar', typeField: 'text', pipeName: 'number' },
    { name: 'fechaaPagar', text: 'Fecha a pagar', typeField: 'text', pipeName: 'date' },
    { name: 'direccion', text: 'Dirección', typeField: 'text' },
    { name: 'barrio', text: 'Barrio', typeField: 'text' },
    { name: 'ciudad', text: 'Ciudad', typeField: 'text' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', pipeName: 'date' },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text' },

  ]

  public prueba: IoptionTable[] = [
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
    { name: '', text: '', typeField: 'text' },
  ]

  public tittleModal: string = 'Visualizar seguimiento cartera clientes'
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _sweetAlertService: Sweetalert2Service, private _carteraClienteService: CarteraClientesService) { }


  ngAfterViewInit(): void {

    console.log(this.data)
  }

  ngOnInit(): void {



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


    if (this.tittleModal === 'Agregar gestiones') {
      this.AgregarGestiones();
      this.formAgregarGestiones.controls['Cliente'].setValue(this.data.valuesData['nombreCliente'])
      this.formAgregarGestiones.controls['Negocio'].setValue(this.data.valuesData['negocio'])
      this.formAgregarGestiones.controls['Cliente'].disable()
      this.formAgregarGestiones.controls['Negocio'].disable()
      this.formAgregarGestiones.controls['Cliente'].updateValueAndValidity();
      this.formAgregarGestiones.controls['Negocio'].updateValueAndValidity();
      this.cargarSelects();

    }

  }

  public onSave(): void {
    console.log('onsave')
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
        const Tipodecontacto = this.formAgregarGestiones.controls['Tipodecontacto'].value

        const listarMotivoNoPago = { id: Tipodecontacto, select: selectResultadoGestión }
        this._carteraClienteService.listarMotivoNoPago(listarMotivoNoPago).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.motivoNoPago = resp?.data || []
          },
          error: (e) => { this._sweetAlertService.alertError() }
        })


        break;

    }
  }

  private AgregarGestiones(): void {
    this.formAgregarGestiones = this.fb.group({
      'Cliente': [],
      'Negocio': [],
      'Tipodegestor': [],
      'Tipodegestion': [],
      'Tipodecontacto': [],
      'Resultadogestión': [],
      'Motivonopago': [],
      'Observaciones': [],
      'Estadocliente': [],
      'Proximaacción': [],
      'Fecha': [new Date(), []],
      'valorPagar': [],
      'fechaPagar': [],


    })

  }

}
