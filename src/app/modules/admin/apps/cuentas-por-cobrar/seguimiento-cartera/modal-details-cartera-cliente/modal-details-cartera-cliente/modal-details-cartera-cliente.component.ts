import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IoptionTable } from 'app/shared/componentes/table/table.component';

@Component({
  selector: 'app-modal-details-cartera-cliente',
  templateUrl: './modal-details-cartera-cliente.component.html',
  styleUrls: ['./modal-details-cartera-cliente.component.scss']
})
export class ModalDetailsCarteraClienteComponent implements OnInit {

  public dataOptions: IoptionTable[] = []

  public detalleCartera: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text' },
    { name: 'cedula', text: 'Cedula', typeField: 'text' },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text' },
    { name: 'cuota', text: 'Cuota', typeField: 'text' },
    { name: 'fechaVencimiento', text: 'Fecha vencimiento', typeField: 'text' },
    { name: 'diasVencidoHoy', text: 'Dias de vencimiento hoy', typeField: 'text' },
    { name: 'vencimientoMayor', text: 'Vencimiento mayor', typeField: 'text' },
    { name: 'diasVencidos', text: 'Dias vencidos', typeField: 'text' },
    { name: 'status', text: 'Estado', typeField: 'text' },
    { name: 'valorAsignado', text: 'Valor asignado', typeField: 'text' },
    { name: 'debidoCobrar', text: 'Debido cobrar', typeField: 'text' },
    { name: 'interesMora', text: 'Interes de mora', typeField: 'text' },
    { name: 'gastoCobranza', text: 'Gasto cobranza', typeField: 'text' },
    { name: 'totalesParciales', text: 'Total parciales', typeField: 'text' },
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

  public tittleModal: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const tittle = {
      detalleCartera: 'Detalle de la cartera',
      visualizarPagos: 'Visualizar Pagos',
      visualizarGestiones: 'Visualizar Gestiones',
      visualizarCompromisosPago: 'Visualizar Compromisos',
      estadoCuentaGeotech: 'Estado de cuenta Geotech',
      agregarGestiones: 'Agregar gestiones',
      editarInformacion: 'Editar informacion'
    }

    const dataOptionTable = {
      detalleCartera: this.detalleCartera,
      visualizarPagos: this.visualizarPagos,
      visualizarGestiones: '',
      visualizarCompromisosPago: '',
      estadoCuentaGeotech: '',
      agregarGestiones: '',
      editarInformacion: ''
    }


    this.tittleModal = tittle[this.data.viewModal] || []
    this.dataOptions = dataOptionTable[this.data.viewModal] || []
    console.log('modal', this.data)
  }

}
