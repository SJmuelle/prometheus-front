import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFooterRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

interface Ioptions {
  modeMobil?: boolean,
  multifunction?: boolean,
  function?: boolean
  footer?: boolean

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
  iconAngularMaterial?: string
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
   * propiedad para sumar en el footer
   */
  footerSum?: boolean
  /**
  * propiedad para sumar en el footer
  */
  valueFooter?: number | string
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
  classTailwind?: string
  /**
   * se utiliza en caso de querer formatear el texto
   */
  pipeName?: 'date' | 'fullday' | 'currency' | 'number' | 'titleCase' | 'percentage'
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
export class TableComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatFooterRowDef, { static: true }) footerDef: MatFooterRowDef;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @Input() allDataRows: any[] = []
  @Input() dataOptionTable: IoptionTable[] = []
  @Input() Options: Ioptions = { modeMobil: false, multifunction: false, function: false, footer: false, }
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
  public arregloTotales: any[] = []
  public copyTableOptions: any[] = []
  public footerSpan: any = { arrayFooter: [], span: '0' }
  private susbcripcion$: Subscription = new Subscription();
  private unsuscribre$: Subject<void> = new Subject<void>();



  constructor(private _filterTable: TableDataFilterService, private paginatorIntl: MatPaginatorIntl,) { this.paginatorIntl.itemsPerPageLabel = 'Items por página : '; }

  ngAfterViewInit(): void {
    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnDestroy(): void {
    this.unsuscribre$.next();
    this.unsuscribre$.complete();
    this.susbcripcion$.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {

    const values: string[] = [...this.dataOptionTable.map((item) => {
      if (item.view === undefined) {
        item.view = true
      }

      // console.log(item.view)
      item.disable = false
      item.footerSum = item.footerSum || false
      item.valueFooter = ''
      if (item.typeField !== 'text' || item.footerSum) {
        item.disable = true
      }
      if (item.view) { return item.name }

    })]

    const noUndefined: string[] = []
    values.forEach((item) => {
      if (item !== undefined) { noUndefined.push(item) }
    })

    this.dataColumn = [...noUndefined]
    // console.log(this.dataColumn)





    this.dataCopy = this.allDataRows;
    this.dataSource = new MatTableDataSource(this.allDataRows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.copyTableOptions = this.dataOptionTable
    if (this.Options.footer) {
      this.dataOptionTable[0].valueFooter = 'Totales'

      this.calculateFooterSum()
      this.calculateFooter();

    }



  }

  public calculateFooter(): any {
    const [firstValue] = this.dataColumn
    const arrayFooter = [firstValue]


    this.dataOptionTable.forEach((item, index) => {
      // console.log(item?.footerSum)
      if (item?.footerSum) {
        arrayFooter.push(item.name)
      }
    })

    const [fistvalues, secondValues] = arrayFooter
    const span = this.dataColumn.indexOf(secondValues)

    const data = {
      arrayFooter,
      span: span?.toString()
    }
    this.footerSpan = { ...data }

  }

  ngOnInit(): void {
    // this.dataColumn = [...this.dataOptionTable.map(({ name }) => name)]
    const values: string[] = [...this.dataOptionTable.map((item) => {
      // item.view = item?.view || true

      if (item.view === undefined) {
        item.view = true
      }

      // console.log(item.view)
      item.disable = false
      item.footerSum = item.footerSum || false
      item.valueFooter = ''
      if (item.typeField !== 'text' || item.footerSum) {
        item.disable = true
      }
      if (item.view) { return item.name }

    })]

    const noUndefined: string[] = []
    values.forEach((item) => {
      if (item !== undefined) { noUndefined.push(item) }
    })

    // console.log(values)
    this.dataColumn = [...noUndefined]


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

    if (this.Options.footer) {
      this.dataOptionTable[0].valueFooter = 'Totales'


      this.calculateFooterSum()
      this.calculateFooter();

    }



  }




  public calculateFooterSum(): void {

    this.dataOptionTable.forEach((item) => {

      const key = item.name
      if (item.footerSum === true) {
        item.valueFooter = this.sumValues(this.allDataRows, key)
      }
    })

  }


  public sumValues(arreglo, clave) {
    let suma = 0;
    for (const elemento of arreglo) {
      suma += Number(elemento[clave] | 0);
    }
    return suma;


  }

  public viewmode(): boolean {
    return window.innerWidth <= 600 ? true : false
  }

  public configColumns(name, evento): void {

    // console.log(name, evento)


    const values: string[] = [...this.dataOptionTable.map((item) => {
      if (item.view) {
        return item.name
      }
    })]
    const arregloFiltrado: string[] = values.filter((elemento: string | undefined) => elemento !== undefined);
    this.dataColumn = [...arregloFiltrado]

    const { length } = this.footerSpan.arrayFooter

    this.footerSpan.span = this.dataColumn.length - (length - 1)


  }



  public actionSelectRow(row): void {
    this.dataRowSelect.emit(row);

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
