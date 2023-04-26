import { Component, AfterViewInit } from '@angular/core';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';
import * as L from 'leaflet';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mapa-cobertura',
  templateUrl: './mapa-cobertura.component.html',
  styleUrls: ['./mapa-cobertura.component.scss']
})
export class MapaCoberturaComponent implements AfterViewInit {
  data: any;

  constructor(
   private _cajaVirtualService:
    CajaVirtualService
  ) { 
    this.getInformacionNegocios();
  }


  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [11.016763998741775, -74.83146618188988],
      zoom: 30
    });
    let circle = L.circle([11.016763998741775, -74.83146618188988], {
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.5,
      radius: 10
    }).addTo(this.map);

    let popup = L.popup()
    .setLatLng([11.016763998741775, -74.83146618188988])
    .setContent("Shirley Muelle $1.000.000")
    .openOn(this.map);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  getInformacionNegocios(){
    // getInformacionNegocios
    Swal.fire({
      title: 'Cargando',
      html: 'Buscando información...',
      timer: 500000,
      didOpen: () => {
          Swal.showLoading();
      },
  }).then((result) => {});

  this._cajaVirtualService.getInformacionNegocios().subscribe((res) => {
      this.data = res.data;
      console.log('aqui' + res.data);
      Swal.close();
  });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
