import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CobranzaService } from 'app/core/services/cobranza.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  formPeriodo: FormGroup;

  public form: FormGroup;
  public dataRow = [];
  public optionsTable: any[] = [
    {
      name: 'nombreCliente',
      text: 'Nombre del cliente',
      typeField: 'text',
    },
    {
      name: 'negocio',
      text: 'Código negocio',
      typeField: 'text',
    },
    {
      name: 'clase_gestion',
      text: 'Tipo de gestón',
      typeField: 'text',
    },
    {
      name: 'fechaGestion',
      text: 'Fecha de gestión',
      typeField: 'text',
    },
    {
      name: 'gestion',
      text: 'Resultado',
      typeField: 'text',
    },
    {
      name: 'estado',
      text: 'Estado',
      typeField: 'text',
    },


  ];
  public displayedColumns: string[] = [
    ...this.optionsTable.map(({ name }) => name),
  ];

  minDate: Date;
  maxDate: Date;
  numeroSolicitud: any;
  constructor(private _cobranzaService: CobranzaService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.form = fb.group({
      fehcaInicial: '',
      fehcaFinal: '',
      id: ['',Validators.required],
    }); 

    this.formPeriodo = this.fb.group({
      fechaInicial: ['',Validators.required],
      fechaFinal: ['',Validators.required],
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
    // this.router.navigate([`/cobranza/negociaciones/detalle/${this.tipoEstrategia}/${data.negocio}`]);
  }

  getInformacionNegocios() {
    if (!this.form.valid && !this.formPeriodo.valid) {
      this.form.markAllAsTouched();
      this.formPeriodo.markAllAsTouched();
      return;
    }

    this.dataRow = [];
    const data: any = this.form.getRawValue();
    this._cobranzaService.getHistoricoCartera(data.id).subscribe((res) => {
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


  irFormRefinacionamiento() {
    // this.router.navigate([`/cobranza/negociaciones/${this.tipoEstrategia}/${this.tipoID}/${this.id}/${this.negocio}/${this.formatFecha(this.form.value.fecha._d)}`]);
  }

}
