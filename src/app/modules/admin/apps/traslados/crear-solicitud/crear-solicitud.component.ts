import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {

  listadoEmpresas:any[] = [
    {
      "id":"FI",
      "nombre":"FINTRA"
    },
    {
      "id":"FL",
      "nombre":"FINTRA LOGISTICS"
    },
    {
      "id":"GO",
      "nombre":"GEOTECH"
    },
    {
      "id":"SL",
      "nombre":"SELECTRIK"
    },
    {
      "id":"CB",
      "nombre":"COBRANZA"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
