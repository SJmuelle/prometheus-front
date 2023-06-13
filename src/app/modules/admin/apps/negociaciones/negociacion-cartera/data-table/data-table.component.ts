import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  public buttonTable: any = {
    icon: 'heroicons_solid:eye',
    text: 'reportDispatch.viewHistory',
    action: (data) => {
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
    },
    {
      name: 'saldo_total',
      text: 'Saldo total',
      typeField: 'text',
    },
    {
      name: 'capital',
      text: 'Capital',
      typeField: 'text',
    },
    {
      name: 'mora_actual',
      text: 'Mora actual',
      typeField: 'text',
    },
    {
      name: 'interes_mora',
      text: 'Mora actual',
      typeField: 'text',
    },
    {
      name: 'Debido',
      text: 'Debido',
      typeField: 'text',
    },

  ];
  public dataSource: MatTableDataSource<any>;

  public dataColumn: string[] = [...this.dataOptionTable.map(({ name }) => name)];
  public whitEspace: boolean = false

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.dataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  public actionSelectRow(row: any): void {
    console.log(row);

  }

}
