import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid-oferta-libranza',
  templateUrl: './grid-oferta-libranza.component.html',
  styleUrls: ['./grid-oferta-libranza.component.scss']
})
export class GridOfertaLibranzaComponent implements OnInit {
  public numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');

  constructor( private route: ActivatedRoute   ) { }

  ngOnInit() {
    this.getListadoCartera(Number(this.numeroSolicitud));
  }


  private getListadoCartera(numeroSolicitud: number): void {
    // this.ListadoCartera$ = this._listadoCarteraService.getListadoCartera(numeroSolicitud);
  }

}
