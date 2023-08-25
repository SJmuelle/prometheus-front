import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CobranzaService } from 'app/core/services/cobranza.service';

@Component({
  selector: 'app-form-refinanciamiento',
  templateUrl: './form-refinanciamiento.component.html',
  styleUrls: ['./form-refinanciamiento.component.scss']
})
export class FormRefinanciamientoComponent implements OnInit {
  public tipoEstrategia: string = this.route.snapshot.paramMap.get('tipoEstrategia');
  public tipoID: string = this.route.snapshot.paramMap.get('tipoID');
  public id: string = this.route.snapshot.paramMap.get('id');
  public negocio: string = this.route.snapshot.paramMap.get('negocio');
  public fecha: string = this.route.snapshot.paramMap.get('fecha');
  dataRow: any;
  totales: any=[];

  constructor(
    private route: ActivatedRoute,
    private _cobranzaService: CobranzaService,
  ) { }

  ngOnInit(): void {
    this.getInformacionNegocios();
  }



  getInformacionNegocios() {
    this._cobranzaService.refinanciacionCargarDetalleCartera(this.negocio, this.tipoEstrategia, this.fecha).subscribe((res) => {
      this.dataRow = res.data;
      this.totales.push(
        {
          etiqueta: "Capital",
          valor: this.dataRow.reduce((acumulador, obj) => acumulador + obj.valorSaldoCapital, 0)
        },
        {
          etiqueta: "Interes",
          valor: this.dataRow.reduce((acumulador, obj) => acumulador + obj.valorInteresAval, 0)
        },
        {
          etiqueta: "Mipymes",
          valor: 0
        },
        {
          etiqueta: "Intermediación",
          valor: 0
        },
        {
          etiqueta: "Seguro",
          valor: this.dataRow.reduce((acumulador, obj) => acumulador + obj.valorSeguro, 0)
        },
        {
          etiqueta: "Aval",
          valor: 0
        },
        {
          etiqueta: "Mora",
          valor: 0
        },
        {
          etiqueta: "Gac",
          valor: this.dataRow.reduce((acumulador, obj) => acumulador + obj.gac, 0)
        },
        {
          etiqueta: "Total",
          valor: this.dataRow.reduce((acumulador, obj) => acumulador + obj.sumaSaldos, 0)
        },
      )
    });
  }
}
