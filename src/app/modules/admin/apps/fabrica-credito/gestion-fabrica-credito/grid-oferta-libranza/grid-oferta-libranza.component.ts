import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from 'app/core/services/oferta.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid-oferta-libranza',
  templateUrl: './grid-oferta-libranza.component.html',
  styleUrls: ['./grid-oferta-libranza.component.scss']
})
export class GridOfertaLibranzaComponent implements OnInit {
  public numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
  public listadoOferta$: Observable<any>;
  public capacidadPago$: Observable<any>;

  capacidadOferta: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private ofertaService:OfertaService
      ) { }

  ngOnInit() {
    this.getListadoOferta(Number(this.numeroSolicitud));
    this.getCapacidadPago(Number(this.numeroSolicitud));
  }


  private getListadoOferta(numeroSolicitud: number): void {
    this.listadoOferta$ = this.ofertaService.getListadoOferta(numeroSolicitud);
  }
  private getCapacidadPago(numeroSolicitud: number): void {
    this.capacidadPago$ = this.ofertaService.getCapacidadPago(numeroSolicitud);
  }
}
