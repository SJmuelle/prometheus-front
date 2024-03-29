import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ITableData } from 'app/resources/interfaces/itable-data';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() titulos: Array<string> = [];
    @Input() nombres: Array<string> = [];
    @Input() filas: Array<any> = [];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes);
        this.nombres;
        this.titulos;
        this.filas;
    }

    ngAfterViewInit(): void {
        // this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
        // // If the user changes the sort order, reset back to the first page.
        // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // merge(this.sort.sortChange, this.paginator.page)
        //   .pipe(
        //     startWith({}),
        //     switchMap(() => {
        //       this.isLoadingResults = true;
        //       return this.exampleDatabase!.getRepoIssues(
        //         this.sort.active, this.sort.direction, this.paginator.pageIndex)
        //         .pipe(catchError(() => observableOf(null)));
        //     }),
        //     map(data => {
        //       // Flip flag to show that loading has finished.
        //       this.isLoadingResults = false;
        //       this.isRateLimitReached = data === null;
        //       if (data === null) {
        //         return [];
        //       }
        //       // Only refresh the result length if there is new data. In case of rate
        //       // limit errors, we do not want to reset the paginator to zero, as that
        //       // would prevent users from re-triggering requests.
        //       this.resultsLength = data.total_count;
        //       return data.items;
        //     })
        //   ).subscribe(data => this.data = data);
    }

    ngOnInit(): void {
        // console.log(this.nombres);
        // console.log(this.titulos);
        // console.log(this.filas);
    }
}
