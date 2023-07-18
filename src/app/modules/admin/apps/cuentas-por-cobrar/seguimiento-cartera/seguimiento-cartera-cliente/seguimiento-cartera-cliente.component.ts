import { Component, OnInit } from '@angular/core';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';

@Component({
  selector: 'app-seguimiento-cartera-cliente',
  templateUrl: './seguimiento-cartera-cliente.component.html',
  styleUrls: ['./seguimiento-cartera-cliente.component.scss']
})
export class SeguimientoCarteraClienteComponent implements OnInit {
  public infoTitulo: IinfoTitulo = { titulo: 'Seguimiento cartera clientes', subtitulo: 'Realiza los seguimientos a la cartera de los clientes' }
  public dataRows: any[] = []
  public optionsTable: any[] = [
    {
      name: 'Cedula',
      text: 'Cedula',
      typeField: 'text',
      // pipeName: 'number'
    },
    {
      name: 'Nombre cliente',
      text: 'Nombre cliente',
      typeField: 'text',
    },
    {
      name: 'Direccion',
      text: 'Direccion',
      typeField: 'text',
    },
    {
      name: 'Barrio',
      text: 'Barrio',
      typeField: 'text',
    },
    {
      name: 'Ciudad',
      text: 'Ciudad',
      typeField: 'text',
    },
    {
      name: 'Telefono',
      text: 'Telefono',
      typeField: 'text',
    },
    {
      name: 'Celular',
      text: 'Celular',
      typeField: 'text',
    },
    {
      name: 'Negocio',
      text: 'Negocio',
      typeField: 'text',
    },
    {
      name: 'U. Negocio',
      text: 'U. Negocio',
      typeField: 'text',
    },
    {
      name: 'Vencimiento mayor',
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
    },
    {
      name: 'Debido cobrar',
      text: 'Debido cobrar',
      typeField: 'text',
    },
    {
      name: 'Recaudo',
      text: 'Recaudo',
      typeField: 'text',
    },
    {
      name: '% cumplimiento',
      text: '% cumplimiento',
      typeField: 'text',
    },
    {
      name: 'Valor a pagar',
      text: 'Valor a pagar',
      typeField: 'text',
    },
    {
      name: 'Fecha ultimo compromiso',
      text: 'Fecha ultimo compromiso',
      typeField: 'text',
    },
    {
      name: 'Reest',
      text: 'Reest',
      typeField: 'text',
    },
    {
      name: 'Juridico',
      text: 'Juridico',
      typeField: 'text',
    },
    {
      name: 'Negociacion',
      text: 'Negociacion',
      typeField: 'text',
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
