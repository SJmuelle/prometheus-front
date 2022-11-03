import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from 'app/core/services/oferta.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'grid-oferta-consumo',
  templateUrl: './grid-oferta-consumo.component.html',
  styleUrls: ['./grid-oferta-consumo.component.scss']
})
export class GridOfertaConsumoComponent implements OnInit {
  public listadoOferta$: Observable<any>;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public min = 6;
  public max = 12;
  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService
  ) { }

  ngOnInit(): void {
    this.getListadoOferta(Number(this.numeroSolicitud));
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value) + 'k';
    }
    return value;
  }

  private getListadoOferta(numeroSolicitud: number): void {
    this.listadoOferta$ = this.ofertaService.getListadoOfertaConsumo(numeroSolicitud);
  }
}
