import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalTipoPqrsComponent } from '../modal-tipo-pqrs/modal-tipo-pqrs.component';

@Component({
    selector: 'app-tipo-pqrs',
    templateUrl: './tipo-pqrs.component.html',
    styleUrls: ['./tipo-pqrs.component.scss'],
})
export class TipoPqrsComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
        'tipo_pqrs',
        'legal',
        'tiempo_Solucion',
        'estado',
    ];

    constructor(private dialog: MatDialog) {}

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

    ngOnInit(): void {}

    openDialog(data?): void {
        const dialogRef = this.dialog.open(ModalTipoPqrsComponent, {
            width: '500px',
            maxHeight: '550px',
            data: {
                tipo_pqrs: 'Cualquiera',
                legal: '1',
                tiempo_Solucion: 2,
                estado: '1',
            },
            // data: data
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            console.log(result);
        });
    }
}
