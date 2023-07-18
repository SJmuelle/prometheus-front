import { Component, OnInit } from '@angular/core';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';

@Component({
  selector: 'app-seguimiento-cartera-cliente',
  templateUrl: './seguimiento-cartera-cliente.component.html',
  styleUrls: ['./seguimiento-cartera-cliente.component.scss']
})
export class SeguimientoCarteraClienteComponent implements OnInit {
  public infoTitulo: IinfoTitulo = { titulo: 'Seguimiento cartera clientes', subtitulo: 'Realiza los seguimientos a la cartera de los clientes' }
  constructor() { }

  ngOnInit(): void {
  }

}
