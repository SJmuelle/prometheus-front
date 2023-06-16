import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() dataRow: any[] = []
  @Output() selectRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectListaOpciones: EventEmitter<any> = new EventEmitter<any>();
  public dataReport: any = {}
  public dataFilter: string = ''
  public dataOptionTable: any[] = [
    {
      name: 'identificacion',
      text: 'Identificacion',
      typeField: 'text',

    },
    {
      name: 'cod_neg',
      text: 'Cod negocio',
      typeField: 'text',
    },
    {
      name: 'nombre',
      text: 'Nombre',
      typeField: 'text',
    },
    {
      name: 'capital',
      text: 'Capital',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'interes_mora',
      text: 'Interes mora',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'mora_actual',
      text: 'Mora actual',
      typeField: 'text',
    },
    {
      name: 'gastos_cobranza',
      text: 'Gastos cobranza',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'debido_cobrar',
      text: 'Valor debido',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'saldo_total',
      text: 'Saldo total',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'tiene_negociacion',
      text: 'Estado',
      typeField: 'statusStyle',
      styleCondition: (data): string => {
        const stateName = data?.tiene_negociacion
        if (stateName === 'Negociado') { return 'bg-green-400' } else {
          return 'bg-red-400';
        }
      }
    },

  ];
  public dataSource: MatTableDataSource<any>;

  public dataColumn: string[] = ['action', ...this.dataOptionTable.map(({ name }) => name)];

  public whitEspace: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private _tableFilter: TableDataFilterService, private paginatorIntl: MatPaginatorIntl, private _negociacionCarteraServices: NegociacionCarteraService
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Items por pagina : ';
    // mat-paginator-range-label

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.dataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this._tableFilter.filterTable$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dataFilter) => {
        this.dataSource.filter = dataFilter;
        this.dataFilter = dataFilter;
      });


  }


  public actionSelectRow(row: any): void {



  }

  public createNegociacion(): void {
    this.selectRow.emit(this.dataReport)
    this._negociacionCarteraServices.ObtenerListadoNegociaciones(this.dataReport.mora_actual_dias).subscribe({
      next: (resp) => {
        this.selectListaOpciones.emit(resp.data || []);
      },
      error: (err) => { }
    })
    this.dataReport = null;
  }

  public openNegociacion(): void {
    this._negociacionCarteraServices.ObtenerNegociacionRealizada(this.dataReport.cod_neg).subscribe({
      next: (resp) => {
        const data = {
          negociacion: resp.data || [],
          datosCliente: this.dataRow || []
        }
        this.selectRow.emit(data);
      },
      error: () => { }
    })
    this.dataReport = null;
  }


}
