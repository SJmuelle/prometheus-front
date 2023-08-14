import { Component, OnInit } from '@angular/core';
import { CobranzaService } from 'app/core/services/cobranza.service';
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
    private _cobranzaSerive:
      CobranzaService
  ) {
    this.getInformacionNegocios();

  }


  ngOnInit(): void {

  }




  private initMap(): void {
    this.map = L.map('map', {
      center: [Number(this.data[5].lat), Number(this.data[5].lng)],
      zoom: 40
    });
    for (const item of this.data) {

      if (!((Number(item.lat) == 0) && (Number(item.lng) == 0))) {
        let loc = [Number(item.lat), Number(item.lng)];
        let circle = L.circle(loc, {
          color: 'green',
          fillColor: 'green',
          fillOpacity: 0.5,
          radius: 6,
          id: item.numeroSolicitud
        }).addTo(this.map);
        circle.on('click', function (e) {
          let numeroSolicitud = e.sourceTarget.options.id
          window.location.href = `#/cobranza/asignacion-cuentas/${numeroSolicitud}`;
        });

        let nombre = '<strong>' + item.cliente + '</strong>' + '<br />' + item.direccion + ',  ' + item.barrio + '<br />' + '$' + item.saldoCartera.toLocaleString()

        let tooltip = L.tooltip(loc, {
          content: nombre,
          className: "bg-accent-800 text-white border-none",
          permanent: true,
          id: item.numeroSolicitud
        }).addTo(this.map);
        tooltip.on('click', function (e) {
          let numeroSolicitud = e.sourceTarget.options.id
          window.location.href = `#/cobranza/asignacion-cuentas/${numeroSolicitud}`;
        });
      }
    }

    const OpenStreetMap_CH = L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });
    const OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
    const GoogleMaps = L.tileLayer(
      'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
      {
        maxZoom: 18,
        minZoom: 3,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    const GoogleHybrid = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 18,
        minZoom: 3,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    const OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        minZoom: 3,

      }
    );
    const GoogleSatelital = L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga',
      {
        maxZoom: 20,
        minZoom: 3,
      }
    );

    const baseLayers: L.Control.LayersObject = {
      'Google Maps': GoogleMaps,
      'Google Hybrid': GoogleHybrid,
      'Google Satelital': GoogleSatelital,
      'Open Street Map': OpenStreetMap,
      'OpenStreetMap_HOT': OpenStreetMap_HOT,
      'OpenStreetMap_CH': OpenStreetMap_CH
    };

    // this.map = L.map('map', {
    //   zoomAnimation: true,
    //   layers: [GoogleMaps],
    //   inertia: true,
    //   worldCopyJump: true,
    //   ...optionsMap,
    // });


    const tiles = OpenStreetMap_CH
    tiles.addTo(this.map);
  }



  getInformacionNegocios() {


    this._cobranzaSerive.cuentasAsignadas$.subscribe((res) => {
      this.data = res;
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