import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';

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

  tabMostrar = 1;
  datosUsuario:any =JSON.parse(localStorage.getItem("usuario"));
  public fechaActual = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  cambiarTarjeta(number){
    this.tabMostrar = number;
  }

}
