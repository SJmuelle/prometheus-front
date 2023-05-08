import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IButtonOptions, IOptionTable } from 'app/core/interfaces';
import { TableFilterService } from 'app/core/services/table-filter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /** informacion que se pintara en la tabla, un array de cualquier valor */
  @Input() dataRow: any[] = [];
  /** columnas que se pintaran en la tabla */
  @Input() dataColumn: string[] = [];
  /** las opciones que necesita la tabla para poder construirse */
  @Input() dataOptionTable: IOptionTable[] = [];
  /** botones que se quieran pintar en la tabla */
  @Input() buttonTable: IButtonOptions<any>;
  /** propiedad que se usa para emiter hacia el padre, el registro seleccionado en la tabla */
  @Output() emitSelectRow = new EventEmitter<any>();
  /** se emite hacia el padre, evento de los switch en la tabla */
  @Output() emitChangeSwitch = new EventEmitter<{ state: boolean; data: any }>();
  @Input() whitEspace: boolean = true;
  public dataSource: MatTableDataSource<any>;
  public dataFilter: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private _tableFilter: TableFilterService) { }

  /** @description ciclo de vida ngOnChanges, para saber si cambio la informacion de la tabla y poder actualizarla. */
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.dataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** @description ciclo de vida ngOnInit, inicializamos las subscripciones que necesitamos para el componente, en este caso los filtros que se apliquen a la tabla. */
  ngOnInit(): void {
    this._tableFilter.filterTable$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dataFilter) => {
        this.dataSource.filter = dataFilter;
        this.dataFilter = dataFilter;
      });

    this._tableFilter.filterTableStatus$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ type, value }) => {
        if (type === 'all') {
          this.dataSource = new MatTableDataSource([...this.dataRow]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          const filterDataStatus = this.dataRow.filter(valueRow => valueRow[type] === value);
          this.dataSource = new MatTableDataSource([...filterDataStatus]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataFilter = value;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** @description se ejecuta y emite el valor del registro seleccionado en la tabla. */
  public actionSelectRow(row: any): void {
    this.emitSelectRow.emit(row);
  }

  /** @description se ejecuta y emite el valor y estado del switch */
  public actionSwitch(slideData: MatSlideToggleChange, data: any): void {
    this.emitChangeSwitch.emit({ state: slideData.checked, data });
    slideData.source.setDisabledState(true);
    setTimeout(() => {
      slideData.source.setDisabledState(false);
    }, 2000);
  }
}
