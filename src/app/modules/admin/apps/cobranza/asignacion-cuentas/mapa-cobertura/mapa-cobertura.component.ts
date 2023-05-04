import { Component, OnInit } from '@angular/core';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';
import * as L from 'leaflet';
import Swal from 'sweetalert2';


@Component({
  selector: 'mapa-cobertura',
  templateUrl: './mapa-cobertura.component.html',
  styleUrls: ['./mapa-cobertura.component.scss']
})
export class MapaCoberturaComponent implements OnInit {
  data: any;
  private map;
  userLocation: any;
  constructor(
    private _cajaVirtualService:
      CajaVirtualService
  ) {
    this.getInformacionNegocios();

  }


  ngOnInit(): void {

  }




  private initMap(): void {
    this.map = L.map('map', {
      center: [Number(this.data[5].lat), Number(this.data[5].lng)],
      zoom: 20
    });
    for (const item of this.data) {

      if (!((Number(item.lat) == 0) && (Number(item.lng) == 0))) {
        let loc = [Number(item.lat), Number(item.lng)];
        let circle = L.circle(loc, {
          color: 'green',
          fillColor: 'green',
          fillOpacity: 0.5,
          radius: 1
        }).addTo(this.map);

        let nombre = item.cliente + '<br />' + item.direccion + ',  ' + item.barrio + '<br />' + '$' + item.saldoCartera.toLocaleString()
        
        let tooltip = L.tooltip(loc, {
          content: nombre,
          permanent: true,
        })
         .addTo(this.map);
      }


    }


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
    tiles.addTo(this.map);
  }



  getInformacionNegocios() {
    Swal.fire({
      title: 'Cargando',
      html: 'Buscando información...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._cajaVirtualService.getInformacionNegocios().subscribe((res) => {
      Swal.close();
      this.data = res.data;
      if (!navigator.geolocation) {
        Swal.fire({
          icon: 'warning',
          text: "Navegador no soporta la navegación",
        }).then((result) => {
        });
      } else {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.userLocation = [coords.latitude, coords.longitude];
          this.initMap();
        }
        )
      }
    });
  }




}
