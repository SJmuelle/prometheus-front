import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  datos: { id: number; tipo: any; tiempo: any; legal: string; estado: string; titulo: any; };
  mostrarListado: any;
  router: any;

  constructor() { }

  ngOnInit(): void {
  }
  abrirModal(datos, titulo) {
    if (titulo == 'N') {
      this.datos = {
        id: null,
        tipo: '',
        tiempo: '',
        legal: '',
        estado: 'A',
        titulo: titulo
      }
    }
  }
  }
