import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Ioptions {
  modeMobil?: boolean,
  multifunction?: boolean,
  function?: boolean

}

interface IFuntions {
  name?: string,
  icon?: string,
  disabled?: boolean,
  function?: Function
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() allDataRows: any[] = []
  @Input() dataOptionTable: any[] = []
  @Input() dataColumn: string[] = []
  @Input() Options: Ioptions = { modeMobil: false, multifunction: false, function: false }
  @Input() Funtions: IFuntions[] = []
  @Output() dataRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataFunctionSelect: EventEmitter<any> = new EventEmitter<any>();

  public dataSource: MatTableDataSource<any>;
  public page_number: number = 0
  public page_size: number = 5
  public dataFilter: string = ''


  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  pageEvent(event): void {
    this.page_size = event.pageSize
    this.page_number = event.pageIndex
  }

}
