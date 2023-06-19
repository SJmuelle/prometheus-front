import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IOptionTable } from 'app/core/interfaces';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit {


  formPeriodo: FormGroup;

  public form: FormGroup;
  public dataRow = [];
  public optionsTable: IOptionTable[] = [
    {
      name: 'nombreRecibo',
      text: 'Nombre del recibo',
      typeField: 'text',
    },
    {
      name: 'valorRecibo',
      text: 'Valor del recibo',
      typeField: 'text',
    },
    {
      name: 'tipoGestion',
      text: 'Tipo de gestón',
      typeField: 'text',
    },
    {
      name: 'codigoNegocio',
      text: 'Código del negocio',
      typeField: 'text',
    },
    {
      name: 'numeroCedula',
      text: 'Número de cedula',
      typeField: 'text',
    },
    {
      name: 'numeroConsignacion',
      text: 'Número de consignación ',
      typeField: 'text',
    },
    {
      name: 'consignado',
      text: 'Consignado ',
      typeField: 'text',
    },
    {
      name: 'conciliado',
      text: 'Conciliado ',
      typeField: 'text',
    },


  ];
  public displayedColumns: string[] = [
    ...this.optionsTable.map(({ name }) => name),
  ];
  minDate: Date;
  maxDate: Date;
  constructor(private _cajaVirtualService: CajaVirtualService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.form = fb.group({
      fehcaInicial: '',
      fehcaFinal: '',
      id: ''
    });
    this.formPeriodo= this.fb.group({
      fechaInicial: [''],
      fechaFinal: [''],
    })
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
  }

  ngOnInit(): void {
    this.dataRow = []
  }
  selecAlarmTable(data) {
    console.log(data)
    // this.router.navigate([`/cobranza/negodos/detalle/${this.tipoEstrategia}/${data.negocio}`]);
  }

  getInformacionNegocios() {
    this.dataRow = [];
    // this._cajaVirtualService.refinanciacionCargarDetalleCartera(this.negocio,this.tipoEstrategia,moment(this.form.value.fecha).format('YYYY-MM-DD')).subscribe((res) => {
    //   this.dataRow = res.data;
    // });
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


  irFormRefinacionamiento() {
    // this.router.navigate([`/cobranza/negociaciones/${this.tipoEstrategia}/${this.tipoID}/${this.id}/${this.negocio}/${this.formatFecha(this.form.value.fecha._d)}`]);
  }

}
