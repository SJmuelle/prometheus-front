import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CobranzaService } from 'app/core/services/cobranza.service';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';

@Component({
  selector: 'listado-asignaciones',
  templateUrl: './listado-asignaciones.component.html',
  styleUrls: ['./listado-asignaciones.component.scss']
})
export class ListadoAsignacionesComponent implements OnInit {

  dataRow = [];
  public optionsTable:any[] = [
    {
      name: 'nro_docs',
      text: 'N°',
      typeField: 'text',

    },
    {
      name: 'numero_solicitud',
      text: 'Número de negocio',
      typeField: 'text',
    },
    {
      name: 'cliente',
      text: 'Nombre del cliente',
      typeField: 'text',
    },
    {
      name: 'identificacion',
      text: 'CC del cliente',
      typeField: 'text',
      pipeName: 'text',
    },
    {
      name: 'saldo_artera',
      text: 'Debito a cobrar',
      typeField: 'text',
      pipeName: 'number',
    },
    {
      name: 'mora_actual',
      text: 'Tramo de mora actual',
      typeField: 'text',
    },
    {
      name: 'dias_mora',
      text: 'Cuotas vencidad',
      typeField: 'text',
    },
    {
      name: 'numero_documentos',
      text: 'Cuotas pendientes',
      typeField: 'text', 
    },
    {
      name: 'lng',
      text: 'Cuotas pagadas',
      typeField: 'text',
    }
  ];
  public displayedColumns: string[] = [
    ...this.optionsTable.map(({ name }) => name),
  ];
  filtrarTabla: string="";

  constructor(private _cobranzaService: CobranzaService,
    private router: Router,
    private _searchTableService: TableDataFilterService
  ) {
  }

  ngOnInit(): void {
    this.getInformacionNegocios();
  }
  selecAlarmTable(e) {
    console.log(e)
    this.router.navigate([`/cobranza/asignacion-cuentas/${e.numeroSolicitud}`]);
  }

  getInformacionNegocios() {

    this._cobranzaService.cuentasAsignadas$.subscribe((res) => {

      this.dataRow = res;
    });
  }

  public search(): void {
    this._searchTableService.sendFilterData(this.filtrarTabla);
  }
}
