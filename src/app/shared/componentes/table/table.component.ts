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
  callback?: Function
}

export type OptionTableArray = IoptionTable[]

/** @description se muestras todos los registros de la lista 
 * @param :  name: string,
      text: string,
      typeField: 'text' | 'function',
      pipeName?: 'date' | 'fullday' | 'currency' | 'number'
      callback? : Function
      iconCallback?: string
*/

export interface IoptionTable {
  /**
   * este es el nombre de la propiedad que viene de la api
   */
  name: string,
  /**
   * Texto que quiero mostrar en el header de la table
   */
  text: string,
  /**
   * se especifica si es de tipo texto o llama una funcion 
   */
  typeField: 'text' | 'function',
  /**
   * se utiliza en caso de querer formatear el texto
   */
  pipeName?: 'date' | 'fullday' | 'currency' | 'number' | 'titleCase'
  /**
   * se llama si se quiere utilizar una funcion y se le envia la datarow
   */
  callback?: Function
  /**
   * se establece un icono especifico de la plantilla
   */
  iconSGV?: string
  /**
   * se establece un icono especifico de angular material
   */
  iconAngularMaterial?: string
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
  @Input() Options: Ioptions = { modeMobil: false, multifunction: false, function: false }
  @Input() Funtions: IFuntions[] = []
  @Output() dataRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataFunctionSelect: EventEmitter<any> = new EventEmitter<any>();

  public dataColumn: string[] = []
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
    this.dataColumn = [...this.dataOptionTable.map(({ name }) => name)]
    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataColumn = [...this.dataOptionTable.map(({ name }) => name)]
    this.listenObservable();
    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  public actionSelectRow(row): void {
    console.log(row);

  }

  public action(row): void {
    this.Funtions[0].callback();
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
