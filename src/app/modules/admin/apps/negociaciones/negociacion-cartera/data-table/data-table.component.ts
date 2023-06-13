import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  public dataReport: any = {}
  public dataFilter: string = ''
  public buttonTable: any = {
    icon: 'heroicons_solid:eye',
    text: 'Editar',
    action: (data) => {
      console.log('accion disparada')
    },
  };
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
      name: 'gastos_cobranza',
      text: 'Gastos cobranza',
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
      name: 'capital',
      text: 'Capital',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'mora_actual',
      text: 'Mora actual',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'interes_mora',
      text: 'Mora actual',
      typeField: 'text',
      pipeName: 'number'
    },
    {
      name: 'Debido',
      text: 'Debido',
      typeField: 'text',
      pipeName: 'number'

    },


  ];
  public dataSource: MatTableDataSource<any>;

  public dataColumn: string[] = [...this.dataOptionTable.map(({ name }) => name).concat('action')];
  public whitEspace: boolean = false
  private unsubscribe$ = new Subject<void>();

  constructor(private _tableFilter: TableDataFilterService) { }


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
    console.log(row);

  }

}
