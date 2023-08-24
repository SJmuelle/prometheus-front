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
  
  constructor(
    private route: ActivatedRoute,
    private _cobranzaService: CobranzaService,
  ) { }

  ngOnInit(): void {
    this.getInformacionNegocios();
  }


  
  getInformacionNegocios() {
    this._cobranzaService.refinanciacionCargarDetalleCartera(this.negocio,this.tipoEstrategia,this.fecha).subscribe((res) => {
      this.dataRow = res.data;

      const valorSaldoCapital =  this.dataRow.reduce((acumulador, obj) => acumulador + obj.valorSaldoCapital, 0);
      const valorInteresAval =  this.dataRow.reduce((acumulador, obj) => acumulador + obj.valorInteresAval, 0);
      const Mipymes =  0;
      const Intermediación =  0;
      const Seguro =  this.dataRow.reduce((acumulador, obj) => acumulador + obj.valorSeguro, 0);
      const Aval =  0;
      const Mora =0;
      const Gac =  this.dataRow.reduce((acumulador, obj) => acumulador + obj.gac, 0);
      const Total =  this.dataRow.reduce((acumulador, obj) => acumulador + obj.sumaSaldos, 0);
      
    });
  }
}
