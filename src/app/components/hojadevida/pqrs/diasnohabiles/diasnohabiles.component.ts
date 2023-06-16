import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModaldiasnohabilesComponent } from '../modaldiasnohabiles/modaldiasnohabiles.component';

@Component({
  selector: 'app-diasnohabiles',
  templateUrl: './diasnohabiles.component.html',
  styleUrls: ['./diasnohabiles.component.scss']
})
export class DiasnohabilesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['descripcion', 'fecha', 'estado'];

  constructor(private dialog: MatDialog) { }

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
  }

  openDialog(data?): void {
    const dialogRef = this.dialog.open(ModaldiasnohabilesComponent, {
      width: '500px',
      maxHeight: '550px',
      data: { descripcion: 'Cualquiera', fecha: '2021-08-10', estado: 2 }
      // data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}
