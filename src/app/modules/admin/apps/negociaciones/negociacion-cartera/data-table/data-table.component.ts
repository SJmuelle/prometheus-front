import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataOptionTable: any[] = [
    {
      name: 'CC',
      text: 'CC',
      typeField: 'text',
    },
    {
      name: 'Cod negocio',
      text: 'Cod negocio',
      typeField: 'text',
    },
    {
      name: 'Nombre',
      text: 'Nombre',
      typeField: 'text',
    },
    {
      name: 'Saldo total',
      text: 'Saldo total',
      typeField: 'text',
    },
    {
      name: 'Saldo pendiente',
      text: 'Saldo pendiente',
      typeField: 'text',
    },
    {
      name: 'Mora actual',
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

  public dataColumn: string[] = [...this.dataOptionTable.map(({ name }) => name),];
  public dataRow: any[] = []
  public whitEspace: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public actionSelectRow(row: any): void { }

}
