import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatCheckboxDefaultOptions } from '@angular/material/checkbox';
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

interface IMenuFunctions {
  nameFunction: string,
  callback?: Function,
  iconFuseTemplate?: string
  iconAngularMateriañ?: string
  children: boolean
  arrayChildren?: Ichildren
}

interface Ichildren {
  nameChildren: 'indexMatMenu1' | 'indexMatMenu2' | 'indexMatMenu3' | 'indexMatMenu4'
  values: IMenuFunctions[]
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
   * propiedad generada automaticamente
   */
  view?: boolean
  /**
   * propiedad generada automaticamente
   */
  disable?: boolean
  /**
   * se especifica si es de tipo texto o llama una funcion 
   */
  typeField: 'text' | 'function' | 'statusStyle' | 'mat-menu',
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

  /**
   * se utiliza para los campos que utilizan estados de colores
   */

  styleCondition?: Function

  /**
   * Se utiliza para llamar varias funciones en un mat menu
   */
  MenuFunctions?: IMenuFunctions[]
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
  @Input() dataOptionTable: IoptionTable[] = []
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
  public dataFunctions: any[] = []
  public openlist: boolean = false
  public optionColumns: any[] = []
  public copyTableOptions: any[] = []
  private susbcripcion$: Subscription = new Subscription();
  private unsuscribre$: Subject<void> = new Subject<void>();



  constructor(private _filterTable: TableDataFilterService, private paginatorIntl: MatPaginatorIntl,) { this.paginatorIntl.itemsPerPageLabel = 'Items por pagina : '; }
  ngOnDestroy(): void {
    this.unsuscribre$.next();
    this.unsuscribre$.complete();
    this.susbcripcion$.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {

    const values: string[] = [...this.dataOptionTable.map((item) => {
      item.view = true
      item.disable = false

      if (item.typeField !== 'text') {
        item.disable = true
      }
      if (item.view) {
        return item.name
      }
    })]
    this.dataColumn = [...values]




    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.copyTableOptions = this.dataOptionTable


  }

  ngOnInit(): void {
    // this.dataColumn = [...this.dataOptionTable.map(({ name }) => name)]
    const values: string[] = [...this.dataOptionTable.map((item) => {
      item.view = true
      item.disable = false

      if (item.typeField !== 'text') {
        item.disable = true
      }
      if (item.view) {
        return item.name
      }
    })]
    this.dataColumn = [...values]
    this.listenObservable();
    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.copyTableOptions = this.dataOptionTable

    const valuesmenus = []

    const x = (this.dataOptionTable || []).map((item) => {
      if (item.typeField === 'mat-menu') {
        (item.MenuFunctions || []).map((menus) => {
          if (menus.children) {
            (menus.arrayChildren.values || []).map((submenu) => {

              valuesmenus.push({ ...submenu })
            })
          }
        })
      }
    })

    this.dataFunctions = [...valuesmenus]







  }

  public configColumns(name, evento): void {


    const values: string[] = [...this.dataOptionTable.map((item) => {
      if (item.view) {
        return item.name
      }
    })]
    const arregloFiltrado: string[] = values.filter((elemento: string | undefined) => elemento !== undefined);
    this.dataColumn = [...arregloFiltrado]


    // console.log(this.dataOptionTable)
  }

  public getMatMenu(value: string): string {
    console.log(value)
    return 'indexMatMenu1'
  }

  public actionSelectRow(row): void {
    // console.log(row);

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
