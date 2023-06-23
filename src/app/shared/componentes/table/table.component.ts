import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

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
export class TableComponent implements OnInit, OnChanges, OnDestroy {
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
  public dataFilter: string = '';
  public dataCopy: any[] = [];
  private susbcripcion$: Subscription = new Subscription();
  private unsuscribre$: Subject<void> = new Subject<void>();



  constructor(private _filterTable: TableDataFilterService, private paginatorIntl: MatPaginatorIntl,) { this.paginatorIntl.itemsPerPageLabel = 'Items por pagina : '; }
  ngOnDestroy(): void {
    this.unsuscribre$.next();
    this.unsuscribre$.complete();
    this.susbcripcion$.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.listenObservable();
    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  public actionSelectRow(row): void {
    console.log(row);

  }

  pageEvent(event): void {
    this.page_size = event.pageSize
    this.page_number = event.pageIndex
  }

  private listenObservable(): void {
    this.susbcripcion$ = this._filterTable.filterTable$.pipe(debounceTime(400), takeUntil(this.unsuscribre$)).subscribe(dataFilter => {
      this.dataSource.filter = dataFilter
      this.dataFilter = dataFilter;
      this.allDataRows = this.dataCopy;
      let keys = []
      if (this.allDataRows[0]) {
        keys = Object.keys(this.allDataRows[0])
      }
      const copyData = [];
      (this.allDataRows || []).forEach((item) => {
        keys.forEach((keyValue) => {
          if (item[keyValue]?.toString()?.trim()?.toUpperCase()?.includes(dataFilter?.toUpperCase()?.trim())) {
            if (!copyData.find(valueoff => valueoff === item)) {
              copyData.push(item);
            }
          }
        })
      });
      if (dataFilter.length === 0) {
        this.allDataRows = this.dataCopy;
      } else {
        this.page_number = 0
        this.allDataRows = copyData
      }
    })
  }
}
