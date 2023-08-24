import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CobranzaService } from 'app/core/services/cobranza.service';
import moment from 'moment';

@Component({
  selector: 'app-detalle-cartera',
  templateUrl: './detalle-cartera.component.html',
  styleUrls: ['./detalle-cartera.component.scss']
})
export class DetalleCarteraComponent implements OnInit {
  public tipoEstrategia: string = this.route.snapshot.paramMap.get('tipoEstrategia');
  public tipoID: string = this.route.snapshot.paramMap.get('tipoID');
  public id: string = this.route.snapshot.paramMap.get('id');
  public negocio: string = this.route.snapshot.paramMap.get('negocio');

  public form: FormGroup;
  public dataRow = [];
  public optionsTable: any[] = [
    {
      name: 'documento',
      text: 'Documento',
      typeField: 'text',
    },
    {
      name: 'cuota',
      text: 'Cuota',
      typeField: 'text',
    },
    {
      name: 'fechaVecimiento',
      text: 'Vecimiento',
      typeField: 'text',
    },
    {
      name: 'diasMora',
      text: 'Mora',
      typeField: 'text',
    },
    {
      name: 'estado',
      text: 'Estado',
      typeField: 'text',
    },
    {
      name: 'valorSaldoCapital',
      text: 'Valor capital',
      typeField: 'text',
    },
    {
      name: 'valorInteresAval',
      text: 'Valor interes',
      typeField: 'text',
    },
    {
      name: 'valorCa',
      text: 'Valor Cat',
      typeField: 'text',
    },
    {
      name: 'valorAdmin',
      text: 'Valor Admin',
      typeField: 'text',
    },
    {
      name: 'valorSaldoCa',
      text: 'Valor capital',
      typeField: 'text',
    },
    {
      name: 'valorSeguro',
      text: 'Valor seguro',
      typeField: 'text',
    },
    {
      name: 'valorCuotaAval',
      text: 'Valor cuota aval',
      typeField: 'text',
    },
    {
      name: 'valorSaldoCuota',
      text: 'Valor cuota',
      typeField: 'text',
    },
    {
      name: 'ixm',
      text: 'IXM',
      typeField: 'text',
    },
    {
      name: 'gac',
      text: 'GAC',
      typeField: 'text',
    },
    {
      name: 'sumaSaldos',
      text: 'Total saldo',
      typeField: 'text',
    }

  ];
  public displayedColumns: string[] = [
    ...this.optionsTable.map(({ name }) => name),
  ];
  minDate: Date;
  maxDate: Date;
  constructor(private _cobranzaService: CobranzaService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.form = fb.group({
      fecha: [''],
    });
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
  }

  ngOnInit(): void {
    this.dataRow=[]
  }
  selecAlarmTable(data) {
    console.log(data)
    // this.router.navigate([`/cobranza/negociaciones/detalle/${this.tipoEstrategia}/${data.negocio}`]);
  }

  getInformacionNegocios() {
    this._cobranzaService.refinanciacionCargarDetalleCartera(this.negocio,this.tipoEstrategia,moment(this.form.value.fecha).format('YYYY-MM-DD')).subscribe((res) => {
      this.dataRow = res.data;
    });
  }

  formatFecha(fecha: Date): string {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript son zero-based, por lo que se suma 1
    const anio = fecha.getFullYear();
    
    // Agrega un cero inicial si el día o el mes tienen un solo dígito
    const diaFormateado = dia < 10 ? '0' + dia : dia;
    const mesFormateado = mes < 10 ? '0' + mes : mes;
    
    return `${diaFormateado}-${mesFormateado}-${anio}`;
  }


  irFormRefinacionamiento(){
    this.router.navigate([`/cobranza/negociaciones/${this.tipoEstrategia}/${this.tipoID}/${this.id}/${this.negocio}/${moment(this.form.value.fecha).format('YYYY-MM-DD')}`]);

  }

}
