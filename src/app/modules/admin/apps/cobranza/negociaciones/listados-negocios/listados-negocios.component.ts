import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CobranzaService } from 'app/core/services/cobranza.service';

@Component({
  selector: 'app-listados-negocios',
  templateUrl: './listados-negocios.component.html',
  styleUrls: ['./listados-negocios.component.scss']
})
export class ListadosNegociosComponent implements OnInit {

  public form: FormGroup;
  public listado = [];

  // public tipoEstrategia: string = this.route.snapshot.paramMap.get('tipoEstrategia');
  // public tipoID: string = this.route.snapshot.paramMap.get('tipoID');
  // public id: string = this.route.snapshot.paramMap.get('id');

  dataRow = [];
  public optionsTable: any[] = [
    {
      name: 'Option',
      text: '',
      typeField: 'function',
      callback: (data) => {
        this.selecAlarmTable(data)
      },
      iconSGV: 'heroicons_outline:pencil-alt',

    },
    {
      name: 'identificacion',
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
      name: 'valorNegocio',
      text: 'Valor del negocio',
      typeField: 'text',
      pipeName: 'number'
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
      pipeName: 'number'
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
  constructor(private _cobranzaService: CobranzaService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      tipoEstrategia: [''],
      tipoID: [''],
      id: [''],
    });
  }

  ngOnInit(): void {
    // this.getInformacionNegocios();
    this._cobranzaService.refinanciacionTipoEstrategia().subscribe((res) => {
      this.listado = res.data;
    });
  }
  selecAlarmTable(data) {
    const info=JSON.stringify(data)
    let form=this.form.value;
    this.router.navigate([`/cobranza/negociaciones/${form.tipoEstrategia}/${form.tipoID}/${form.id}/${data.negocio}`]);
  }

  getInformacionNegocios() {
    let data=this.form.value;
    this._cobranzaService.refinanciacionBuscarCliente(data.tipoID,data.tipoEstrategia,data.id).subscribe((res) => {
      this.dataRow = res.data;
    });
  }

}
