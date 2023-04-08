import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-mapa-cobertura',
  templateUrl: './mapa-cobertura.component.html',
  styleUrls: ['./mapa-cobertura.component.scss']
})
export class MapaCoberturaComponent implements AfterViewInit {

  constructor() { }


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
    .setContent("holaaa")
    .openOn(this.map);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }



  ngAfterViewInit(): void {
    this.initMap();
  }
}
