import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOptionTable } from 'app/core/interfaces';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';

@Component({
  selector: 'app-listados-negocios',
  templateUrl: './listados-negocios.component.html',
  styleUrls: ['./listados-negocios.component.scss']
})
export class ListadosNegociosComponent implements OnInit {
  public tipoEstrategia: string = this.route.snapshot.paramMap.get('tipoEstrategia');
  public tipoID: string = this.route.snapshot.paramMap.get('tipoID');
  public id: string = this.route.snapshot.paramMap.get('id');

  dataRow = [];
  public optionsTable: IOptionTable[] = [
    {
      name: 'indentificacion',
      text: 'Identificación',
      typeField: 'text',
    },
    {
      name: 'nombre',
      text: 'Nombre',
      typeField: 'text',
    },
    {
      name: 'negocio',
      text: 'Negocio',
      typeField: 'text',
    },
    {
      name: 'valoreNegocio',
      text: 'Valor del negocio',
      typeField: 'text',
    },
    {
      name: 'totalCuotas',
      text: 'Cuotas',
      typeField: 'text',
    },
    {
      name: 'agencia',
      text: 'Agencia',
      typeField: 'text',
    },
    {
      name: 'valorCuota',
      text: 'Valor cuota',
      typeField: 'text',
    },
    {
      name: 'diasMora',
      text: 'Dias mora',
      typeField: 'text',
    }
  ];
  public displayedColumns: string[] = [
    ...this.optionsTable.map(({ name }) => name),
  ];
  constructor(private _cajaVirtualService: CajaVirtualService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getInformacionNegocios();
  }
  selecAlarmTable(data) {
    const info=JSON.stringify(data)
    localStorage.setItem("detalle",info)
    this.router.navigate([`/cobranza/negociaciones/${this.tipoEstrategia}/${this.tipoID}/${this.id}/${data.negocio}`]);
  }

  getInformacionNegocios() {
    this._cajaVirtualService.refinanciacionBuscarCliente(this.tipoID,this.tipoEstrategia,this.id).subscribe((res) => {
      this.dataRow = res.data;
    });
  }
}
