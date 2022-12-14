import { Component, OnInit } from '@angular/core';
import { TrasladoService } from 'app/core/services/traslado.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {

  listadoEmpresas:any[] = [
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

  tabMostrar = 0;
  datosUsuario:any =JSON.parse(localStorage.getItem("usuario"));
  public fechaActual = new Date();

  valorInicial:number;
  valorNum:any;
  valorConvert:any;

  constructor(public traslado: TrasladoService) { }

  ngOnInit(): void {
  }

  tipoTraslado(value){
    if (value=='IN') {
      this.tabMostrar = 1;
    } else {
      this.tabMostrar = 2;
    }
  }

  solicitar(){
    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      html: 
      '<p class="text-justify">Su solicitud ha sido enviada exitosamente.</p>' +
      '<p class="text-justify">Sera verificada y aprobada por el administrador Gustavo Salas Duran.</p>'
    })
  }

  cambiarTarjeta(number){
    this.tabMostrar = number;
  }

  formatearNumero(value){
    const valor: string = value.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.valorNum = valor
  }

  convText(){
    const valor: string = this.valorNum.replace(/,/g, '')
    this.valorConvert = parseInt(valor)
  }

}
